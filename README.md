# GifApp

Este proyecto fue generado con Angular CLI versión 18.1.1.

## Prerequisitons

Asegúrate de tener instalado [Node.js](https://nodejs.org/). Luego, instala Angular CLI de forma global ejecutando:

```bash
npm install -g @angular/cli
```

## Pasos para ejecutar el frontend localmente

### 1. Instalar las librerías.

```bash
npm install
```

### 2. Correr el frontend con ng serve

```bash
ng serve --open
```

Nota: Es importante tener en cuenta que el frontend no cargará los datos si el servidor de .NET no está corriendo.

También se puede ver que el acceso a la api está público, ya que en un ambiente de producción es mejor dejarlo oculto.
