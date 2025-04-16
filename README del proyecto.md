# ForIT Tareas App

Esta es una aplicación web de gestión de tareas construida 
con un frontend en React y un backend en Node.js. 
Permite a los usuarios crear, leer, actualizar y eliminar tareas. Los datos de las tareas se almacenan 
localmente en el navegador utilizando Local Storage.

## Requisitos Previos

Antes de poder ejecutar la aplicación, asegúrate de tener instaladas 
las siguientes herramientas en tu sistema:

1.  **Node.js y npm (o yarn):** Necesitarás Node.js para ejecutar tanto el frontend como el backend. 
npm (Node Package Manager) viene instalado con Node.js y lo utilizaremos para gestionar las dependencias
de nuestros proyectos. También puedes usar yarn si lo prefieres. Puedes descargar Node.js desde 
[https://nodejs.org/](https://nodejs.org/). Asegúrate de que npm (o yarn) también esté instalado y 
accesible desde tu línea de comandos.

2.  **Un editor de código:** Recomiendo un editor de código como Visual Studio Code 
([https://code.visualstudio.com/](https://code.visualstudio.com/)), Sublime Text 
([https://www.sublimetext.com/](https://www.sublimetext.com/)) o Atom 
([https://atom.io/](https://atom.io/)) para editar y leer los archivos de código.

## Instrucciones de Ejecución

Sigue estos pasos para poner en marcha la aplicación en tu entorno local:

**1. Clonar el repositorio (si aún no lo has hecho):**

   Si tienes el código en un repositorio (por ejemplo, en GitHub), clónalo a tu máquina local 
   utilizando Git:

# abre una carpeta cualquiera y escribe en la terminal de Git bash
git clone [https://github.com/Juamp-1/FotIT_tareas_app.git]
cd [FotIT_tareas_app]
# escribiendo f + TAB, la terminal ingresa directamente en la carpeta, 
# lo mismo con las primeras letras de cualquier carpeta o archivo al que quieras entrar

   Si no tienes el código en un repositorio, puedes descargar el código directamente desde GitHub.
   Si no tienes Git instalado, puedes descargarlo desde 
   [https://git-scm.com/downloads](https://git-scm.com/downloads).

**2. Iniciar el Backend:**
cd backend
npm install  # o yarn install
# Editar backend/.env (si es necesario), por ejemplo:
# PORT=3000
npm run dev  # o yarn start:dev o nodemon app.js
# Espera el mensaje de confirmación del servidor backend 
# ("Servidor backend corriendo en http://localhost:3000").



**3. Iniciar el Frontend:**

# Abre una nueva terminal y navega a la carpeta del frontend:
cd frontend
npm install  # o yarn install
# Editar frontend/.env (si es necesario), por ejemplo:
# VITE_API_BASE_URL=http://localhost:3000/api
npm run dev  # o yarn dev
# Espera el mensaje de confirmación del servidor de desarrollo ("http://localhost:5173").

**4. Abrir en el Navegador:**

Abre tu navegador web y ve a la dirección proporcionada por el frontend 
(normalmente http://localhost:5173).

¡Listo! La aplicación de gestión de tareas estará funcionando en tu navegador. 
Los datos se guardarán localmente en tu navegador.






