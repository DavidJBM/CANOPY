import ImageUploader from '../components/ImageUploader';

export default function Detection() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
          Analiza tu cultivo
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Sube una fotografía detallada de la zona afectada de tu planta. Nuestro modelo procesará la imagen y te entregará un diagnóstico con recomendaciones de tratamiento.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-surface-200 shadow-sm">
        <ImageUploader />
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div className="bg-surface-50 p-6 rounded-xl border border-surface-200">
          <h4 className="font-semibold text-surface-900 mb-2">1. Iluminación</h4>
          <p className="text-sm text-gray-600">Asegúrate de que la foto tenga buena luz natural, evitando sombras fuertes sobre la hoja.</p>
        </div>
        <div className="bg-surface-50 p-6 rounded-xl border border-surface-200">
          <h4 className="font-semibold text-surface-900 mb-2">2. Enfoque</h4>
          <p className="text-sm text-gray-600">Enfoca directamente la anomalía, plaga o zona enferma para mejorar la precisión.</p>
        </div>
        <div className="bg-surface-50 p-6 rounded-xl border border-surface-200">
          <h4 className="font-semibold text-surface-900 mb-2">3. Distancia</h4>
          <p className="text-sm text-gray-600">Mantén una distancia aproximada de 20 a 30 centímetros del objetivo.</p>
        </div>
      </div>
    </div>
  );
}
