from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ImageRequest(BaseModel):
    image_base64: str
    lat: Optional[float] = None
    lon: Optional[float] = None

class PlagaDetectionResult(BaseModel):
    nombre_plaga: str
    confianza: float
    clima_actual: Optional[Dict[str, Any]] = None
    nivel_riesgo: str # e.g., "BAJO", "MEDIO", "ALTO"
    recomendacion: str
