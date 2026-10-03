from fastapi import APIRouter

router = APIRouter(prefix="/plantas", tags=["Plantas"])

@router.post("/identificar")
async def identificar_planta():
    """
    Endpoint asignado al Dev 2.
    """
    return {"status": "en_desarrollo", "message": "Identificación de plantas (Dev 2)"}
