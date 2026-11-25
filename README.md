# Sistema de Administración de Catálogo de Productos Tecnológicos

Sistema web que administra un catálogo de productos tecnológicos utilizando un **Árbol Binario de Búsqueda (BST)**.

## Problema que resuelve

La empresa usaba una estructura secuencial (lista/arreglo) para almacenar productos. Esto dificultaba las búsquedas, inserciones y eliminaciones conforme aumentaba el número de productos.

Este sistema organiza cada producto en un nodo de un árbol binario de búsqueda, permitiendo operaciones eficientes.

## Objetivo

Desarrollar un sistema de administración de productos tecnológicos usando un árbol binario de búsqueda, aplicando:
- Abstracción
- Encapsulamiento
- Modularidad

Operaciones fundamentales:
- Inserción
- Búsqueda
- Eliminación
- Recorridos del árbol (Inorden, Preorden, Postorden)

## Estructura de un Producto

Cada producto se almacena en un nodo y contiene:
- Código (clave del BST)
- Nombre
- Categoría
- Precio
- Stock
- Descripción

## Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla) — Clases para Producto, Nodo y Árbol Binario de Búsqueda
- Persistencia con `localStorage`

## Cómo ejecutar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alex-RiP7/sistema-catalogo-productos-tecnologicos-bst.git
   ```
2. Abre `index.html` en tu navegador.

## Funcionalidades

- Agregar productos (inserción en el BST)
- Buscar producto por código
- Eliminar producto por código
- Mostrar catálogo ordenado (recorrido Inorden)
- Visualizar los tres tipos de recorrido
- Estadísticas del árbol (número de productos, altura, etc.)
- Datos de ejemplo precargados (productos tecnológicos)

## Autor

Proyecto académico de estructuras de datos — Árbol Binario de Búsqueda.
