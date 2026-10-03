from fastapi import APIRouter
from models.schemas import ImageRequest
from services.roboflow_service import detectar_planta_service

router = APIRouter(prefix="/plantas", tags=["Plantas"])

@router.post("/identificar")
async def identificar_planta(request: ImageRequest):
    """
    Endpoint para identificar una planta usando la imagen en base64.
    """
    resultado = await detectar_planta_service(request.image_base64)
    return resultado
