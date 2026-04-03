@echo off
echo Starting Investor Zone Application...
echo.

echo Killing existing processes...
taskkill /f /im "InvestorZone.API.exe" 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :44349') do (
    taskkill /f /pid %%a 2>nul
)

echo Starting Backend API on port 44349...
start "Backend API" cmd /k "cd /d "d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend" && dotnet run --urls https://localhost:44349"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend" && npm run dev"

echo.
echo Both services are starting in separate windows:
echo - Backend API: https://localhost:44349
echo - Frontend: http://localhost:5173 (or check console for actual port)
echo.
echo Press any key to exit this window...
pause >nul
