#!/usr/bin/env bash
# Test script for install.sh and uninstall.sh
# Run this to verify the installation scripts work correctly

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass_count=0
fail_count=0

pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((pass_count++))
}

fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((fail_count++))
}

warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
}

# Test 1: Check scripts exist and are executable
echo ""
echo "=== Test 1: Script existence ==="

if [[ -f "$REPO_DIR/install.sh" ]]; then
    pass "install.sh exists"
else
    fail "install.sh not found"
fi

if [[ -f "$REPO_DIR/uninstall.sh" ]]; then
    pass "uninstall.sh exists"
else
    fail "uninstall.sh not found"
fi

# Test 2: Bash syntax check
echo ""
echo "=== Test 2: Bash syntax check ==="

if bash -n "$REPO_DIR/install.sh" 2>/dev/null; then
    pass "install.sh syntax OK"
else
    fail "install.sh has syntax errors"
fi

if bash -n "$REPO_DIR/uninstall.sh" 2>/dev/null; then
    pass "uninstall.sh syntax OK"
else
    fail "uninstall.sh has syntax errors"
fi

# Test 3: ShellCheck (if available)
echo ""
echo "=== Test 3: ShellCheck analysis ==="

if command -v shellcheck &>/dev/null; then
    if shellcheck "$REPO_DIR/install.sh" 2>/dev/null; then
        pass "install.sh passes shellcheck"
    else
        warn "install.sh has shellcheck warnings (non-blocking)"
    fi
    
    if shellcheck "$REPO_DIR/uninstall.sh" 2>/dev/null; then
        pass "uninstall.sh passes shellcheck"
    else
        warn "uninstall.sh has shellcheck warnings (non-blocking)"
    fi
else
    warn "shellcheck not installed, skipping"
fi

# Test 4: Simulated installation
echo ""
echo "=== Test 4: Simulated installation ==="

TEST_HOME=$(mktemp -d)
export CODEX_HOME="$TEST_HOME/.codex"

cd "$REPO_DIR"

# Run install
if bash install.sh 2>&1; then
    pass "install.sh executed successfully"
else
    fail "install.sh failed to execute"
fi

# Verify installation
if [[ -d "$CODEX_HOME/pets/window-possum" ]]; then
    pass "Pet directory created"
else
    fail "Pet directory not created"
fi

if [[ -f "$CODEX_HOME/pets/window-possum/pet.json" ]]; then
    pass "pet.json installed"
else
    fail "pet.json not installed"
fi

# Test 5: Simulated uninstallation
echo ""
echo "=== Test 5: Simulated uninstallation ==="

if bash uninstall.sh 2>&1; then
    pass "uninstall.sh executed successfully"
else
    fail "uninstall.sh failed to execute"
fi

if [[ ! -d "$CODEX_HOME/pets/window-possum" ]]; then
    pass "Pet directory removed"
else
    fail "Pet directory still exists after uninstall"
fi

# Cleanup
rm -rf "$TEST_HOME"

# Summary
echo ""
echo "==================================="
echo "SUMMARY"
echo "==================================="
echo -e "Passed: ${GREEN}$pass_count${NC}"
echo -e "Failed: ${RED}$fail_count${NC}"

if [[ $fail_count -eq 0 ]]; then
    echo -e "\n${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "\n${RED}Some tests failed.${NC}"
    exit 1
fi
