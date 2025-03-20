param(
    [switch]$fi
)


# Nombre del entorno virtual
$venvName = "app_venv"

# Ruta del entorno virtual
$venvPath = ".\$venvName"

$exists = Test-Path $venvPath


# Verificar si el entorno ya existe
if ($exists) {
    Write-Host "$fi"
    # Activar el entorno virtual
    Write-Host "Activando el entorno virtual '$venvName'..."
    & "$venvPath\Scripts\Activate"

    if ($fi){
        pip install -r requirements.txt
    }
    
} else {
    Write-Host "Creando el entorno virtual '$venvName'..."
    python -m venv $venvName
    Write-Host "Entorno virtual creado."

    # Activar el entorno virtual
    Write-Host "Activando el entorno virtual '$venvName'..."
    & "$venvPath\Scripts\Activate"

    # Instalar FastAPI y Uvicorn
    Write-Host "Instalando FastAPI y Uvicorn..."
    pip install -r requirements.txt
    

    Write-Host "Entorno virtual activado y dependencias instaladas."
}



