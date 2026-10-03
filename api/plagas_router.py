from fastapi import APIRouter, HTTPException
from models.schemas import ImageRequest, PlagaDetectionResult
from services.plagas_service import analizar_plaga_y_clima

router = APIRouter(prefix="/plagas", tags=["Plagas"])

@router.post("/diagnostico", response_model=PlagaDetectionResult)
async def diagnostico_plagas(request: ImageRequest):
    """
    Recibe una imagen (en base64) y opcionalmente coordenadas.
    Detecta la plaga usando Roboflow, consulta el clima local y devuelve un diagnóstico.
    """
    try:
        resultado = await analizar_plaga_y_clima(
            image_base64=request.image_base64,
            lat=request.lat,
            lon=request.lon
        )
        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
