# ==========================================
# Archivo: simple-activate.ps1
# Descripción: Script para gestionar el entorno virtual y ejecutar el servidor
# ==========================================

# Obtener la ruta del directorio donde se encuentra este script
$BASE_DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
$VENV_PATH = Join-Path $BASE_DIR "venv"
$VENV_ACTIVATE = Join-Path $VENV_PATH "Scripts\activate.ps1"
$REQUIREMENTS = Join-Path $BASE_DIR "requirements.txt"
$SERVER_PATH = Join-Path $BASE_DIR "backend\edens-garden"

# Verificar si el entorno virtual existe
if (-Not (Test-Path $VENV_PATH)) {
    Write-Output "Creando entorno virtual..."
    python -m venv $VENV_PATH
    
    if (-Not (Test-Path $VENV_PATH)) {
        Write-Output "Error: No se pudo crear el entorno virtual."
        exit 1
    }
    
    # Activar el entorno virtual recién creado
    . $VENV_ACTIVATE
    
    # Instalar requerimientos
    Write-Output "Instalando dependencias..."
    pip install -r $REQUIREMENTS
} else {
    # Activar el entorno virtual existente
    Write-Output "Activando el entorno virtual existente..."
    . $VENV_ACTIVATE
}

# Procesar argumentos para el flag de instalación
$FORCE_INSTALL = $false
if ($args -contains "-force") {
    $FORCE_INSTALL = $true
    Write-Output "Instalando/actualizando dependencias..."
    pip install -r $REQUIREMENTS
}

# Validar si se activó correctamente
if ($env:VIRTUAL_ENV) {
    Write-Output "Entorno virtual activado en $env:VIRTUAL_ENV"
    $env:PYTHONPATH = "$BASE_DIR;$env:PYTHONPATH"
    Write-Output "Variables de entorno establecidas:"
    Write-Output "PYTHONPATH = $env:PYTHONPATH"
} else {
    Write-Output "Error: No se pudo activar el entorno virtual."
    exit 1
}

# Ejecutar el servidor con uvicorn
Write-Output "Iniciando el servidor..."
uvicorn main:app --reload --host 127.0.0.1 --port 8000

