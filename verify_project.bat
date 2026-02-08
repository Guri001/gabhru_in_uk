@echo off
echo ==========================================
echo Gabhru in UK - Project Verification
echo ==========================================

echo [1/2] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed.
    pause
    exit /b %errorlevel%
)

echo [2/2] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed.
    pause
    exit /b %errorlevel%
)

echo ==========================================
echo SUCCESS! Project is ready.
echo Run 'npm run dev' to start the server.
echo ==========================================
pause
