# ==========================================
# Archivo: iniciar.ps1
# Descripción: Se mueve a una ruta relativa, activa un entorno virtual y ejecuta otro script
# ==========================================

# Obtener la ruta del directorio donde se encuentra este script
$BASE_DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
$VENV_PATH = Join-Path $BASE_DIR "venv\Scripts\activate.ps1"
# $TARGET_DIR = Join-Path $BASE_DIR "scripts"

# Verificar si el entorno virtual existe
if (-Not (Test-Path $VENV_PATH)) {
    Write-Output "Error: No se encontró el entorno virtual."
    exit 1
}

# # Verificar si el directorio de destino existe
# if (-Not (Test-Path $TARGET_DIR)) {
#     Write-Output "Error: No se encontró el directorio de entorno: $TARGET_DIR"
#     exit 1
# }

# Activar el entorno virtual
Write-Output "Activando el entorno virtual..."
. $VENV_PATH

# Validar si se activó correctamente
if ($env:VIRTUAL_ENV) {
    Write-Output "Entorno virtual activado en $env:VIRTUAL_ENV"
    $BASE_DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
    $env:PYTHONPATH = "$BASE_DIR;$env:PYTHONPATH"
    Write-Output "Variables de entorno establecidas:"
    Write-Output "PYTHONPATH = $env:PYTHONPATH"
} else {
    Write-Output "Error: No se pudo activar el entorno virtual."
    exit 1
}

# Procesar argumentos para el flag de instalación
$FORCE_INSTALL = $false
if ($args -contains "-force-install") {
    $FORCE_INSTALL = $true
}

# # Ejecutar el script activate.bat
# $ACTIVATE_SCRIPT = Join-Path $TARGET_DIR "activate.bat"
# if (-Not (Test-Path $ACTIVATE_SCRIPT)) {
#     Write-Output "Error: No se encontró activate.bat en $TARGET_DIR"
#     exit 1
# }

# Write-Output "Ejecutando activate.bat..."
# Start-Process "cmd.exe" -ArgumentList "/c `"$ACTIVATE_SCRIPT`"" -NoNewWindow -Wait

# Si el flag está presente, instalar los paquetes
if ($FORCE_INSTALL) {
    Write-Output "Instalando paquetes..."
    $BASE_DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
    pip install -r (Join-Path $BASE_DIR "requirements.txt")
} 

