# Investor Zone - Backend API

.NET 9.0 Web API dla aplikacji Investor Zone

## Wymagania

- .NET 9.0 SDK
- SQL Server (lub SQL Server Express)

## Uruchomienie

1. Przywróć pakiety:
```bash
dotnet restore
```

2. Zaktualizuj connection string w `appsettings.json` jeśli potrzebne

3. Uruchom migracje:
```bash
dotnet ef database update
```

4. Uruchom aplikację:
```bash
dotnet run
```

API będzie dostępne pod: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

## Endpointy API

### Account
- POST `/api/account/register` - Rejestracja użytkownika
- POST `/api/account/login` - Logowanie
- POST `/api/account/logout` - Wylogowanie
- GET `/api/account/users` - Lista użytkowników
- GET `/api/account/{email}` - Szczegóły użytkownika
- PUT `/api/account/{email}` - Aktualizacja użytkownika
- DELETE `/api/account/{email}` - Usunięcie użytkownika
- PUT `/api/account/topup/{email}` - Doładowanie konta
- PUT `/api/account/exchange/{email}` - Wymiana walut
- PUT `/api/account/exchangePLN/{email}` - Wymiana na PLN

### Forum
- GET `/api/forum/forum` - Lista postów
- GET `/api/forum/{id}` - Szczegóły posta
- PUT `/api/forum/{id}` - Aktualizacja posta
- DELETE `/api/forum/{id}` - Usunięcie posta

## Konfiguracja CORS

Backend jest skonfigurowany do akceptowania requestów z:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
