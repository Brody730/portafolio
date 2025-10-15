#!/bin/bash

# Este script busca y elimina archivos llamados "Icon" o "Icon?" (ej. "IconA")
# en el directorio actual y sus subdirectorios.

echo "Buscando archivos 'Icon' o 'Icon?' para eliminar..."

# Buscar y eliminar archivos 'Icon' sin extensión
find . -type f -name "Icon" -print -exec rm {} \;

# Buscar y eliminar archivos 'Icon?' (ej. Icon1, Icond, etc.)
find . -type f -name "Icon?" -print -exec rm {} \;

echo "Búsqueda y eliminación completada."
echo "Verifica los directorios para confirmar que los archivos han sido eliminados."
