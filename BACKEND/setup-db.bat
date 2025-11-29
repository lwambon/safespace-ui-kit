@echo off
REM Database Setup Script for Windows

setlocal enabledelayedexpansion

REM Find PostgreSQL installation
set "PG_PATH=C:\Program Files\PostgreSQL\17\bin"

if not exist "%PG_PATH%" (
    echo Error: PostgreSQL not found at %PG_PATH%
    echo Please install PostgreSQL or update the path in this script
    pause
    exit /b 1
)

echo.
echo ========================================
echo SafeSpace Database Setup
echo ========================================
echo.

REM Check if database already exists
echo Checking if database exists...
"%PG_PATH%\psql.exe" -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'safespace';" > nul 2>&1

if %errorlevel% equ 0 (
    echo Database 'safespace' already exists
    set /p drop="Drop and recreate? (y/n): "
    if /i "!drop!"=="y" (
        echo Dropping database...
        "%PG_PATH%\psql.exe" -U postgres -d postgres -c "DROP DATABASE IF EXISTS safespace;"
    )
)

REM Create database
echo Creating database 'safespace'...
"%PG_PATH%\psql.exe" -U postgres -d postgres -c "CREATE DATABASE safespace;"

if %errorlevel% neq 0 (
    echo Error creating database
    pause
    exit /b 1
)

echo Database created successfully!

REM Load schema
echo Loading schema...
"%PG_PATH%\psql.exe" -U postgres -d safespace -f "db\schema.sql"

if %errorlevel% neq 0 (
    echo Error loading schema
    pause
    exit /b 1
)

echo Schema loaded successfully!

REM Optional: Load seeds
echo.
set /p seeds="Load sample data? (y/n): "
if /i "!seeds!"=="y" (
    echo Loading sample data...
    "%PG_PATH%\psql.exe" -U postgres -d safespace -f "db\seeds.sql"
    echo Sample data loaded!
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo You can now:
echo - Connect to database: psql -U postgres -d safespace
echo - Or use pgAdmin GUI
echo - Or start the backend: npm run dev
echo.
pause
