# API Catálogo de Productos — Integración Continua

Proyecto del módulo **Énfasis Profesional I (Integración Continua)** — Politécnico Grancolombiano, Grupo B04, Subgrupo 06.
Tutor: Ing. Edward Reyes Corredor.

**Primera entrega (Semana 3):** API en Node.js + Express y base de datos MySQL en dos contenedores Docker comunicados entre sí.

## Integrantes

- Alice Valeria Montoya
- John Alexander Prieto Leiva
- Cristian Camilo Gutiérrez
- Francheska Valentina Miranda Cordero
- Diana Marcela Gil Tapasco

## ¿Qué hace el proyecto?

API REST para gestionar un catálogo de productos: permite consultar los productos registrados y registrar productos nuevos. La API corre en un contenedor y MySQL en otro; los dos se comunican por una red interna de Docker, así que cualquiera puede levantar el sistema completo con un solo comando, sin instalar Node.js ni MySQL.

| Contenedor | Imagen | Puerto |
|---|---|---|
| `api_productos` | construida desde el `Dockerfile` (node:20-alpine) | 3000 |
| `mysql_db` | mysql:8.0 | 3306 (solo red interna `app-network`) |

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/productos` | Lista los productos |
| POST | `/productos` | Registra un producto: `{"nombre": "...", "precio": 0}` |

## Ramas

- `main`: versiones estables de cada entrega.
- `dev`: desarrollo del día a día.

## Cómo clonarlo y ejecutarlo

Requisito: Docker Desktop abierto.

```bash
git clone https://github.com/SapiensAVM/Entrega_IntegracionContinua.git
cd Entrega_IntegracionContinua
docker compose up -d --build
docker ps
docker logs api_productos
```

Opcional: copiar `.env.example` como `.env` para cambiar usuario, contraseña o nombre de la base de datos.

## Pruebas (Windows PowerShell)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/productos" -Method Post -ContentType "application/json" -Body '{"nombre":"Mouse","precio":50000}'
curl.exe http://localhost:3000/productos
docker exec api_productos ping -c 2 db
docker exec -it mysql_db mysql -u root -p tienda_db -e "SELECT * FROM productos;"
```

## Detener

```bash
docker compose down      # conserva los datos
docker compose down -v   # borra también el volumen
```
