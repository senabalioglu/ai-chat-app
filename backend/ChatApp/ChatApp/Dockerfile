# ---------- build aşaması ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyalarını kopyala
COPY backend/ChatApp/ChatApp/*.csproj ./
RUN dotnet restore

# Tüm kaynakları kopyala
COPY backend/ChatApp/ChatApp/. ./
WORKDIR /src
RUN dotnet publish -c Release -o /app/out

# ---------- runtime aşaması ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ChatApp.dll"]