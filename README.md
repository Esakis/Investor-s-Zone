# Investor-s-Zone

Internetowy kantor wymiany walut (Online Currency Exchange)

## Technologie
- **Backend**: .NET 9.0, Entity Framework Core, SQL Server
- **Frontend**: React 18, TypeScript, Vite, Redux, Bootstrap

## Struktura Projektu

```
Investor-s-Zone/
├── Investor-s-Zone-Backend/          # .NET 9.0 Web API
├── Investor-s-Zone-Frontend/         # React 18 + Vite
└── README.md                          # Ta dokumentacja
```

Projekt został rozdzielony na dwa niezależne foldery wewnątrz głównego katalogu.

## Uruchomienie Projektu

### Backend (.NET 9.0 API)

1. Przejdź do folderu backend:
```bash
cd d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend
```

2. Przywróć pakiety NuGet:
```bash
dotnet restore
```

3. Uruchom migracje bazy danych (jeśli potrzebne):
```bash
dotnet ef database update
```

4. Uruchom aplikację:
```bash
dotnet run
```

Backend będzie dostępny pod adresem: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### Frontend (React 18 + Vite)

1. Przejdź do folderu frontend:
```bash
cd d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom aplikację w trybie deweloperskim:
```bash
npm run dev
```

Frontend będzie dostępny pod adresem: `http://localhost:3000`

## Konfiguracja

### Backend
- Połączenie z bazą danych: `d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend\appsettings.json`
- Domyślny connection string: `Server=DESKTOP-ANMM7DC\\SQLEXPRESS;Database=StrefaInwestora123;Trusted_Connection=True;TrustServerCertificate=True;`

### Frontend
- URL API: `d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend\.env`
- Domyślny URL: `http://localhost:5000`

## Build dla Produkcji

### Backend
```bash
cd d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Backend
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend
npm run build
```

Pliki produkcyjne będą w folderze `d:\Programowanie\Investor-s-Zone\Investor-s-Zone-Frontend\build`

## Instrukcje dla oddzielnego frontendu i backendu

Aby uruchomić aplikację z oddzielnym frontendem i backendem, wykonaj następujące kroki:

1. Uruchom backend:
```bash
cd backend
dotnet run
```

2. Uruchom frontend:
```bash
cd frontend
npm run dev
```

3. Dostęp do aplikacji:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger`
