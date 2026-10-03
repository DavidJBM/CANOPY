import os
from inference_sdk import InferenceHTTPClient, InferenceConfiguration

# ==========================================
# CONFIGURACIÓN DE ROBOFLOW (WORKFLOWS)
# ==========================================
# ¡Ojo! Había una letra distinta en tu API Key original. Ahora usamos la correcta: WgUGBjxzVMS2lSPpijaR
ROBOFLOW_API_KEY = os.environ.get("ROBOFLOW_API_KEY", "WgUGBjxzVMS2lSPpijaR")
WORKSPACE_NAME = "elias-hernandez"
WORKFLOW_ID = "plant-identification-1790985245248"

def detectar_planta(ruta_imagen):
    """
    Realiza una petición al Workflow de Roboflow para identificar una planta.
    """
    if not os.path.exists(ruta_imagen):
        print(f"Error: No se encontró la imagen en la ruta: {ruta_imagen}")
        return

    print(f"Analizando la imagen: {ruta_imagen} ...")
    
    try:
        # 1. Conectar al Workflow
        client = InferenceHTTPClient(
            api_url="https://serverless.roboflow.com",
            api_key=ROBOFLOW_API_KEY
        ).configure(InferenceConfiguration(
            api_key_transport="header"  # header-based auth
        ))

        # 2. Ejecutar el Workflow en la imagen local
        resultado = client.run_workflow(
            workspace_name=WORKSPACE_NAME,
            workflow_id=WORKFLOW_ID,
            images={
                "image": ruta_imagen
            },
            use_cache=True
        )

        # 3. Procesar e imprimir los resultados
        # Imprimimos el resultado completo primero por si la estructura del Workflow varía
        # print("Estructura devuelta:", resultado)
        
        # En los workflows, los resultados suelen venir dentro de una lista, 
        # necesitamos extraer las predicciones dependiendo de cómo hayas nombrado el paso de salida.
        # Generalmente vienen en la clave del modelo o un diccionario general.
        print("\n--- Resultados de la Detección ---")
        
        # Como los Workflows pueden devolver estructuras complejas, 
        # vamos a buscar si hay un array de predicciones en algún lugar de la respuesta.
        encontro_predicciones = False
        
        if isinstance(resultado, list) and len(resultado) > 0:
            salidas = resultado[0]
            # Iterar sobre las claves del resultado del workflow buscando "predictions" o la salida de la red
            for clave, valor in salidas.items():
                if isinstance(valor, dict) and "predictions" in valor:
                    predicciones = valor["predictions"]
                    for prediccion in predicciones:
                        clase = prediccion.get("class", "Desconocida")
                        confianza = prediccion.get("confidence", 0.0)
                        confianza_porcentaje = confianza * 100
                        print(f"Planta detectada: {clase} | Confianza: {confianza_porcentaje:.2f}%")
                        encontro_predicciones = True

        if not encontro_predicciones:
            print("Resultado crudo del Workflow (Ajusta la extracción según esto):")
            import json
            print(json.dumps(resultado, indent=2))
            
        print("----------------------------------\n")

    except Exception as e:
        print(f"\n[!] Ocurrió un error inesperado durante la inferencia: {e}")


if __name__ == "__main__":
    # ==========================================
    # PRUEBA LOCAL
    # ==========================================
    print("Iniciando script de prueba de detección de plantas...")
    
    IMAGEN_DE_PRUEBA = r"C:\Users\herna\OneDrive\Desktop\CODE\minikakaton\plants\images.jpg" 
    detectar_planta(IMAGEN_DE_PRUEBA)
