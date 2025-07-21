Clínica Veterinaria - React App
Este proyecto corresponde a la evaluación N3 del módulo de React. Se trata de una aplicación CRUD de gestión para una clínica veterinaria, que incluye gestión de Dueños, Mascotas, Veterinarios y Reservas de procedimientos.

Tecnologías utilizadas
Frontend: React 18, React Router DOM, Axios, Bootstrap 5

Backend: Node.js + Express + MySQL (opcional, ver más abajo)

Base de datos: MySQL 8.x

Instrucciones de uso
Clonar el repositorio
git clone https://github.com/c0hete/clinica-veterinariaReact.git
cd clinica-veterinaria
Configurar las variables de entorno
En la raíz encontrarás un archivo llamado .env.example. Debes duplicarlo y renombrarlo a .env:
cp .env.example .env
En ese archivo encontrarás dos rutas API. Solo debes mantener una activa (sin #) y comentar la otra. Por ejemplo:


# VITE_API_BASE_URL=http://67.205.142.104:3000/api
VITE_API_BASE_URL=http://localhost:3001/api
Si deseas usar la API remota (ya funcional), comenta la local.
Si deseas usar la API local, debes levantar el backend (ver instrucciones más abajo).

Instalar dependencias

npm install
Ejecutar la aplicación
npm run dev
Esto abrirá la aplicación en tu navegador, generalmente en http://localhost:5173.

API local (opcional)
La prueba original solo solicitaba el frontend, pero para poder probar la funcionalidad, se creó una API REST sencilla en Express. Puedes optar por usarla o conectarte a la API pública mencionada antes.

1. Clonar y configurar la API
cd API
cp .env.example .env
Agrega tu contraseña MySQL al archivo .env.

2. Crear la base de datos
Abre tu cliente MySQL (como phpMyAdmin o Workbench), copia el contenido del archivo scriptBD-veterinaria.txt y ejecútalo para crear la base de datos veterinaria y sus tablas.

3. Instalar dependencias y levantar API
npm install
node index.js
Esto levantará la API en http://localhost:3001/api.

Estructura de carpetas
/src
  /views
    /Dueno
    /Mascota
    /Veterinario
    /ReservaProcedimiento
  /services
  /components
Consideraciones finales
La API fue creada únicamente con fines de prueba, ya que no se logró acceder a la API original entregada.

El archivo .env se deja accesible porque el proyecto es educativo, y no maneja información sensible.

Puedes elegir con qué API trabajar modificando el .env de la raíz como se explicó arriba.
