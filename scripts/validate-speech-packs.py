#!/usr/bin/env python3
"""
Validate speech pack JSON files against schema and check for common issues.

Usage:
    python scripts/validate-speech-packs.py [--strict] [speech/*.json]
"""

import json
import sys
import os
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Try to import jsonschema for full validation
try:
    import jsonschema
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False
    print("Warning: jsonschema not installed. Schema validation will be skipped.")
    print("Install with: pip install jsonschema")

# Required keys at top level
REQUIRED_TOP_KEYS = ['schema', 'language', 'petId', 'displayName', 'description', 'compatibility', 'tone', 'memeContext', 'sayings']

# Required state keys in sayings
REQUIRED_SAYING_STATES = ['idle', 'running', 'waiting', 'review', 'failed', 'waving', 'jumping', 'running-right', 'running-left', 'generic', 'codexEvents']

# Required codex events
REQUIRED_CODEX_EVENTS = ['thinking', 'shell', 'editing', 'testing', 'git', 'done']

# Optional codex events (zh-CN has these)
OPTIONAL_CODEX_EVENTS = ['deploying', 'debugging', 'refactoring', 'merge-conflict', 'installing']


def load_json(filepath: str) -> Tuple[dict, str]:
    """Load JSON file and return (data, error)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f), None
    except json.JSONDecodeError as e:
        return None, f"JSON parse error: {e}"
    except Exception as e:
        return None, f"Error reading file: {e}"


def validate_structure(data: dict, filepath: str) -> List[str]:
    """Validate the structure of a speech pack."""
    errors = []
    
    # Check top-level keys
    missing_top = [k for k in REQUIRED_TOP_KEYS if k not in data]
    if missing_top:
        errors.append(f"Missing top-level keys: {missing_top}")
    
    # Check sayings structure
    sayings = data.get('sayings', {})
    missing_sayings = [k for k in REQUIRED_SAYING_STATES if k not in sayings]
    if missing_sayings:
        errors.append(f"Missing saying states: {missing_sayings}")
    
    # Check codexEvents
    events = sayings.get('codexEvents', {})
    missing_events = [k for k in REQUIRED_CODEX_EVENTS if k not in events]
    if missing_events:
        errors.append(f"Missing required codexEvents: {missing_events}")
    
    return errors


def validate_content(data: dict, filepath: str, strict: bool = False) -> List[str]:
    """Validate the content of a speech pack."""
    errors = []
    warnings = []
    
    sayings = data.get('sayings', {})
    max_chars = data.get('compatibility', {}).get('suggestedBubbleMaxChars', 28)
    
    # Check each state
    for state in REQUIRED_SAYING_STATES:
        if state == 'codexEvents':
            continue
        
        lines = sayings.get(state, [])
        
        # Check minimum lines
        if len(lines) < 3:
            warnings.append(f"{state}: only {len(lines)} lines (minimum 3 required)")
        
        # Check for empty lines
        for i, line in enumerate(lines):
            if not line or not line.strip():
                errors.append(f"{state}[{i}]: empty line")
        
        # Check line length
        if strict:
            for i, line in enumerate(lines):
                if len(line) > max_chars * 1.5:
                    warnings.append(f"{state}[{i}]: line exceeds suggested max ({len(line)} > {max_chars})")
    
    # Check codexEvents
    events = sayings.get('codexEvents', {})
    all_events = REQUIRED_CODEX_EVENTS + OPTIONAL_CODEX_EVENTS
    
    for event_name, lines in events.items():
        if event_name not in all_events:
            warnings.append(f"Unknown codexEvent: {event_name}")
        
        if len(lines) < 2:
            warnings.append(f"codexEvents.{event_name}: only {len(lines)} lines")
        
        for i, line in enumerate(lines):
            if not line or not line.strip():
                errors.append(f"codexEvents.{event_name}[{i}]: empty line")
    
    return errors, warnings


def check_duplicates(data: dict, filepath: str) -> List[str]:
    """Check for duplicate lines within the same speech pack."""
    warnings = []
    sayings = data.get('sayings', {})
    
    # Collect all lines by state
    all_lines: Dict[str, List[Tuple[str, int]]] = {}
    
    for state in REQUIRED_SAYING_STATES:
        if state == 'codexEvents':
            continue
        
        lines = sayings.get(state, [])
        for i, line in enumerate(lines):
            normalized = line.strip().lower()
            if normalized not in all_lines:
                all_lines[normalized] = []
            all_lines[normalized].append(f"{state}[{i}]")
    
    # Check codexEvents
    events = sayings.get('codexEvents', {})
    for event_name, lines in events.items():
        for i, line in enumerate(lines):
            normalized = line.strip().lower()
            key = f"codexEvents.{event_name}[{i}]"
            if normalized not in all_lines:
                all_lines[normalized] = []
            all_lines[normalized].append(key)
    
    # Find duplicates
    for line, locations in all_lines.items():
        if len(locations) > 1:
            warnings.append(f"Duplicate line '{line[:30]}...' in: {', '.join(locations)}")
    
    return warnings


def main():
    parser = argparse.ArgumentParser(description='Validate speech pack JSON files')
    parser.add_argument('files', nargs='*', help='JSON files to validate (default: speech/*.json)')
    parser.add_argument('--strict', action='store_true', help='Enable strict mode (check line lengths)')
    parser.add_argument('--schema', default='schemas/speech-pack.schema.json', help='Path to JSON schema')
    args = parser.parse_args()
    
    # Find files to validate
    if args.files:
        files = args.files
    else:
        files = list(Path('speech').glob('*.json'))
    
    if not files:
        print("No JSON files found to validate.")
        return 1
    
    all_passed = True
    total_errors = 0
    total_warnings = 0
    
    for filepath in files:
        filepath = str(filepath)
        print(f"\n{'='*50}")
        print(f"Validating: {filepath}")
        print('='*50)
        
        # Load JSON
        data, error = load_json(filepath)
        if error:
            print(f"  ❌ {error}")
            all_passed = False
            total_errors += 1
            continue
        
        print("  ✅ JSON parse OK")
        
        # Structure validation
        errors = validate_structure(data, filepath)
        if errors:
            for e in errors:
                print(f"  ❌ {e}")
            all_passed = False
            total_errors += len(errors)
        else:
            print("  ✅ Structure OK")
        
        # Content validation
        errors, warnings = validate_content(data, filepath, args.strict)
        for e in errors:
            print(f"  ❌ {e}")
            total_errors += 1
        for w in warnings:
            print(f"  ⚠️  {w}")
            total_warnings += 1
        
        if not errors:
            print("  ✅ Content OK")
        
        # Duplicate check
        dup_warnings = check_duplicates(data, filepath)
        for w in dup_warnings:
            print(f"  ⚠️  {w}")
            total_warnings += 1
    
    # Summary
    print(f"\n{'='*50}")
    print("SUMMARY")
    print('='*50)
    print(f"Files validated: {len(files)}")
    print(f"Errors: {total_errors}")
    print(f"Warnings: {total_warnings}")
    
    if all_passed and total_errors == 0:
        print("\n✅ All validations passed!")
        return 0
    else:
        print("\n❌ Some validations failed.")
        return 1


if __name__ == '__main__':
    sys.exit(main())
