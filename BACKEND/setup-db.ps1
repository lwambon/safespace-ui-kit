#!/usr/bin/env pwsh
# Database Setup Script for Windows PowerShell
# Run from BACKEND directory

param(
    [switch]$DropExisting,
    [switch]$LoadSeeds
)

$ErrorActionPreference = "Stop"

# Find PostgreSQL installation
$pgPaths = @(
    "C:\Program Files\PostgreSQL\17\bin",
    "C:\Program Files\PostgreSQL\16\bin",
    "C:\Program Files\PostgreSQL\15\bin",
    "C:\Program Files\PostgreSQL\14\bin",
    "C:\Program Files (x86)\PostgreSQL\17\bin",
    "C:\Program Files (x86)\PostgreSQL\16\bin",
    "C:\Program Files (x86)\PostgreSQL\15\bin"
)

$pgBin = $null
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        $pgBin = $path
        break
    }
}

if (-not $pgBin) {
    Write-Host "Error: PostgreSQL not found" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or add it to your system PATH"
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SafeSpace Database Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$psqlPath = Join-Path $pgBin "psql.exe"
$createdbPath = Join-Path $pgBin "createdb.exe"
$schemaPath = Join-Path $PSScriptRoot "db" "schema.sql"
$seedsPath = Join-Path $PSScriptRoot "db" "seeds.sql"

# Check if database exists
try {
    & $psqlPath -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'safespace';" 2>$null | Out-Null
    $dbExists = $?
}
catch {
    $dbExists = $false
}

if ($dbExists -and -not $DropExisting) {
    Write-Host "Database 'safespace' already exists" -ForegroundColor Yellow
    $response = Read-Host "Drop and recreate? (y/n)"
    if ($response -eq 'y') {
        $DropExisting = $true
    }
}

if ($DropExisting -and $dbExists) {
    Write-Host "Dropping existing database..." -ForegroundColor Yellow
    & $psqlPath -U postgres -d postgres -c "DROP DATABASE IF EXISTS safespace;" 2>$null
    if (-not $?) {
        Write-Host "Warning: Could not drop database" -ForegroundColor Yellow
    }
}

# Create database
Write-Host "Creating database 'safespace'..." -ForegroundColor Yellow
& $createdbPath safespace 2>$null
if (-not $?) {
    Write-Host "Database may already exist (this is OK)" -ForegroundColor Yellow
}

# Load schema
Write-Host "Loading schema..." -ForegroundColor Yellow
if (-not (Test-Path $schemaPath)) {
    Write-Host "Error: Schema file not found at $schemaPath" -ForegroundColor Red
    exit 1
}

& $psqlPath -U postgres -d safespace -f $schemaPath
if ($?) {
    Write-Host "✓ Schema loaded successfully" -ForegroundColor Green
}
else {
    Write-Host "Error loading schema" -ForegroundColor Red
    exit 1
}

# Optional: Load seeds
if ($LoadSeeds -or (Read-Host "`nLoad sample data? (y/n)" ) -eq 'y') {
    if (Test-Path $seedsPath) {
        Write-Host "Loading sample data..." -ForegroundColor Yellow
        & $psqlPath -U postgres -d safespace -f $seedsPath
        if ($?) {
            Write-Host "✓ Sample data loaded successfully" -ForegroundColor Green
        }
        else {
            Write-Host "Warning: Could not load sample data" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "You can now:" -ForegroundColor Cyan
Write-Host "1. Start the backend:  npm run dev"
Write-Host "2. Connect via psql:   psql -U postgres -d safespace"
Write-Host "3. Open pgAdmin GUI"
Write-Host ""
