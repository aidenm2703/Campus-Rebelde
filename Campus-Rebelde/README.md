# Campus Rebeldes

Plataforma de aprendizaje accesible creada para compartir conocimiento con la
comunidad LGBT+. La primera etapa es un prototipo de frontend con React y Vite.

## Empezar

Requiere Node.js instalado.

```sh
npm install
npm run dev
```

Para validar el proyecto:

```sh
npm run lint
npm run build
```

## Estructura

```text
src/
  assets/       Recursos visuales
  components/   Componentes compartidos (tarjetas, diálogos)
  data/         Datos de ejemplo del catálogo, glosario y directorio
  html/         Reservado para plantillas HTML auxiliares
  pages/        Inicio, quiénes somos, contactos y glosario
  routes/       Enrutamiento de la aplicación mediante hash
  styles/       Estilos globales, aplicación y páginas informativas
  App.jsx       Entrada de la aplicación
  main.jsx      Montaje de React
index.html      Documento de entrada de Vite
```

## Estado de esta etapa

La página principal ya incluye catálogo con búsqueda y filtros, presentación de
la misión, una propuesta de inicio de sesión, y formularios de demostración para
proponer cursos y solicitar apoyo. La voz de bienvenida se activa después de la
acción de inicio de sesión, cuando el navegador ya permite reproducir audio.

Las páginas de Quiénes somos, Contactos y Glosario LGBT+ están disponibles
desde la navegación y el pie de página. El directorio de contactos está preparado
para incorporar organizaciones cuando se proporcionen sus datos; por ahora no
muestra organizaciones ficticias.

Los formularios y el acceso todavía son solo de frontend: no crean cuentas ni
envían solicitudes al administrador. El siguiente paso es definir el backend y
la base de datos; después se conectarán autenticación segura, revisión de cursos,
solicitudes de ayuda, Stripe y almacenamiento de contenido.
