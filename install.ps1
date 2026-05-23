#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Install Window Possum Codex Pet on Windows.
.DESCRIPTION
    Copies the Window Possum pet package to the Codex local pets directory.
#>

param()

$ErrorActionPreference = "Stop"

$PetId = "window-possum"
$SourceDir = Join-Path $PSScriptRoot $PetId
$TargetRoot = if ($env:CODEX_HOME) { Join-Path $env:CODEX_HOME "pets" } else { Join-Path $HOME ".codex" "pets" }
$TargetDir = Join-Path $TargetRoot $PetId

$PetJson = Join-Path $SourceDir "pet.json"
$Spritesheet = Join-Path $SourceDir "spritesheet.webp"

if (-not (Test-Path $PetJson) -or -not (Test-Path $Spritesheet)) {
    Write-Error "Could not find $PetId/pet.json and $PetId/spritesheet.webp next to install.ps1."
    exit 1
}

New-Item -ItemType Directory -Force -Path $TargetRoot | Out-Null

if (Test-Path $TargetDir) {
    Remove-Item -Recurse -Force $TargetDir
}

Copy-Item -Recurse $SourceDir $TargetDir

# Verify installation
$InstalledPetJson = Join-Path $TargetDir "pet.json"
$InstalledSpritesheet = Join-Path $TargetDir "spritesheet.webp"

if (-not (Test-Path $InstalledPetJson)) {
    Write-Error "Installation verification failed: pet.json not found at $InstalledPetJson"
    exit 1
}

if (-not (Test-Path $InstalledSpritesheet)) {
    Write-Error "Installation verification failed: spritesheet.webp not found at $InstalledSpritesheet"
    exit 1
}

Write-Host "Installed Window Possum to $TargetDir"
Write-Host "Open Codex > Settings > Appearance > Pets > Refresh local pets, then select Window Possum."
