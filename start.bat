@echo off
echo Starting Investor Zone Application...
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd /d "d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend" && dotnet run"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend" && npm run dev"

echo.
echo Both services are starting in separate windows:
echo - Backend API: http://localhost:5000 (or check console for actual port)
echo - Frontend: http://localhost:5173 (or check console for actual port)
echo.
echo Press any key to exit this window...
pause >nul
