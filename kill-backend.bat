@echo off
echo Killing all InvestorZone.API processes...
taskkill /f /im "InvestorZone.API.exe" 2>nul
echo Killing all dotnet processes on port 44349...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :44349') do (
    taskkill /f /pid %%a 2>nul
)
echo All processes killed successfully!

echo Starting backend on port 44349...
cd /d "D:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend"
start "Backend Server" cmd /k "dotnet run --urls https://localhost:44349"

echo Backend started!
pause
