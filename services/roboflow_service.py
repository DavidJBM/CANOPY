import aiohttp
from core.config import settings

async def detect_plaga(image_base64: str) -> dict:
    """
    Simulación de la llamada a Roboflow.
    En el entorno real, enviaríamos la imagen base64 a la URL de inferencia.
    """
    workspace = settings.ROBOFLOW_WORKSPACE
    model = settings.ROBOFLOW_MODEL
    version = settings.ROBOFLOW_VERSION
    api_key = settings.ROBOFLOW_API_KEY
    
    url = f"https://detect.roboflow.com/{workspace}/{model}/{version}?api_key={api_key}"
    
    # Placeholder: En producción, se usaría aiohttp para hacer un POST a Roboflow
    # async with aiohttp.ClientSession() as session:
    #     async with session.post(url, data=image_base64, headers={"Content-Type": "application/x-www-form-urlencoded"}) as response:
    #         return await response.json()
    
    return {
        "predictions": [
            {"class": "roya_del_cafe", "confidence": 0.89}
        ]
    }
