from services.roboflow_service import detect_plaga
from models.schemas import PlagaDetectionResult

async def get_weather(lat: float, lon: float) -> dict:
    # Dummy implementation since rapidapi_service no longer has it
    return {"current": {"humidity": 75, "temp_c": 22}}

def calcular_riesgo_y_recomendacion(plaga: str, clima: dict) -> tuple[str, str]:
    """
    Lógica de negocio principal para cruzar datos de plaga y clima.
    Devuelve (Nivel de riesgo, Recomendación)
    """
    humedad = clima.get("current", {}).get("humidity", 0)
    temp = clima.get("current", {}).get("temp_c", 0)
    
    if plaga == "roya_del_cafe" and humedad > 80:
        return "ALTO", f"Alerta crítica. La humedad del {humedad}% es óptima para la propagación rápida de la roya. Aplicar fungicida."
    elif plaga == "roya_del_cafe":
        return "MEDIO", f"Monitorear. La roya está presente pero la humedad actual ({humedad}%) reduce la propagación inmediata."
    
    return "BAJO", "Monitoreo preventivo rutinario recomendado."

async def analizar_plaga_y_clima(image_base64: str, lat: float, lon: float) -> PlagaDetectionResult:
    # 1. Llamar al servicio de visión computacional
    roboflow_result = await detect_plaga(image_base64)
    predicciones = roboflow_result.get("predictions", [])
    
    plaga_detectada = "desconocida"
    confianza = 0.0
    
    if predicciones:
        mejor_prediccion = max(predicciones, key=lambda x: x["confidence"])
        plaga_detectada = mejor_prediccion["class"]
        confianza = mejor_prediccion["confidence"]
        
    # 2. Consultar clima (si se proporcionó ubicación)
    clima = {}
    if lat is not None and lon is not None:
        clima = await get_weather(lat, lon)
        
    # 3. Cruzar información
    riesgo, recomendacion = calcular_riesgo_y_recomendacion(plaga_detectada, clima)
    
    return PlagaDetectionResult(
        nombre_plaga=plaga_detectada,
        confianza=confianza,
        clima_actual=clima,
        nivel_riesgo=riesgo,
        recomendacion=recomendacion
    )
