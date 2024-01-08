# React + Vite: Buscador de Películas

## Descripción

Este es un proyecto basado en una prueba técnica que tiene una serie de requerimientos, los cuales son cumplidos.

## Tecnologías

- Custom hooks.
- Hooks integrados de React **useRef**, **useMemo**, **useCallback**.
- Manejo de errores y validaciones en **tiempo real.**
- La herramienta [**just-debounce-it**](https://github.com/angus-c/just#just-debounce-it) de angus-c para realizar el debounce.

## Enunciado

Crear una aplicación para buscar películas.

- API: <https://www.omdbapi.com/>
- API_KEY: Solicitar una en el sitio luego de registrarse con el email

Requerimientos:

- Necesita mostrar un input para buscar la película y un botón para buscar.
- Lista las películas y muestra el título, año y poster.
- Que el formulario funcione
- Haz que las películas se muestren en un grid responsive.
- Hacer el fetching de datos a la API

Primera iteración:

- Evitar que se haga la misma búsqueda dos veces seguidas.
- Haz que la búsqueda se haga automáticamente al escribir.
- Evita que se haga la búsqueda continuamente al escribir (debounce)
