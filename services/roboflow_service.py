import aiohttp
import asyncio
import tempfile
import os
import base64
from core.config import settings
from inference_sdk import InferenceHTTPClient, InferenceConfiguration

# ==========================================
# CLIENTE ROBOFLOW (Compartido)
# ==========================================
ROBOFLOW_API_KEY = os.environ.get("ROBOFLOW_API_KEY", settings.ROBOFLOW_API_KEY)
ROBOFLOW_API_URL = os.environ.get("ROBOFLOW_API_URL", settings.ROBOFLOW_API_URL)
ROBOFLOW_WORKSPACE = os.environ.get("ROBOFLOW_WORKSPACE", settings.ROBOFLOW_WORKSPACE)
ROBOFLOW_WORKFLOW_ID = os.environ.get("ROBOFLOW_WORKFLOW_ID", settings.ROBOFLOW_WORKFLOW_ID)

roboflow_client = InferenceHTTPClient(
    api_url=ROBOFLOW_API_URL,
    api_key=ROBOFLOW_API_KEY
).configure(InferenceConfiguration(
    api_key_transport="header"
))


async def detect_plaga(image_base64: str) -> dict:
    """
    Simulación de la llamada a Roboflow.
    En el entorno real, enviaríamos la imagen base64 a la URL de inferencia.
    """
    # ... placeholder existente ...
    return {
        "predictions": [
            {"class": "roya_del_cafe", "confidence": 0.89}
        ]
    }


def _run_planta_workflow_sync(ruta_imagen: str) -> dict:
    """Ejecuta el workflow de manera síncrona usando la SDK."""
    return roboflow_client.run_workflow(
        workspace_name=ROBOFLOW_WORKSPACE,
        workflow_id=ROBOFLOW_WORKFLOW_ID,
        images={"image": ruta_imagen},
        use_cache=True
    )


async def detectar_planta_service(image_base64: str) -> dict:
    """
    Identifica una planta llamando al Workflow de Roboflow de forma asíncrona.
    Extrae la clase y confianza del resultado.
    """
    # 1. Limpiar el string base64 si trae la cabecera "data:image/jpeg;base64,"
    if "," in image_base64:
        image_base64 = image_base64.split(",")[1]

    # 2. Guardar en un archivo temporal para que la SDK lo procese de forma segura
    try:
        img_data = base64.b64decode(image_base64)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(img_data)
            temp_path = temp_file.name
    except Exception as e:
        return {"status": "error", "message": f"Error decodificando imagen: {e}"}

    try:
        # 3. Correr el workflow en un hilo separado para no bloquear FastAPI
        resultado = await asyncio.to_thread(_run_planta_workflow_sync, temp_path)
        
        # 4. Extraer predicciones
        clase_detectada = "Desconocida"
        confianza = 0.0

        if isinstance(resultado, list) and len(resultado) > 0:
            salidas = resultado[0]
            for clave, valor in salidas.items():
                if isinstance(valor, dict) and "predictions" in valor:
                    predicciones = valor["predictions"]
                    if predicciones:
                        # Tomar la primera predicción (la más probable)
                        clase_detectada = predicciones[0].get("class", "Desconocida")
                        confianza = predicciones[0].get("confidence", 0.0)
                        break

        return {
            "status": "success",
            "planta": clase_detectada,
            "confianza": round(confianza * 100, 2),
            "raw_result": resultado # Incluimos el crudo por si se necesita
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        # 5. Limpiar archivo temporal
        if os.path.exists(temp_path):
            os.remove(temp_path)
