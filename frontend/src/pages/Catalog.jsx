import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1598511727409-eb5b796d8339?q=80&w=800&auto=format&fit=crop";

export default function Catalog() {
  const { id } = useParams();
  const [plantas, setPlantas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const response = await fetch('/api/plantas/catalogo');
        if (!response.ok) throw new Error('Error al cargar el catálogo');
        const data = await response.json();
        setPlantas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlantas();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  // Si hay ID, mostramos la vista detallada
  if (id) {
    const planta = plantas.find((p) => p.id.toString() === id);
    if (!planta) return <div className="text-center py-20">Planta no encontrada</div>;

    const nombreComun = planta.common && planta.common.length > 0 ? planta.common[0] : planta.latin;

    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <Link to="/plantas" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          &larr; Volver al catálogo
        </Link>
        
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden mb-8">
          <div className="h-64 sm:h-80 relative bg-surface-100">
            <img src={PLACEHOLDER_IMAGE} alt={nombreComun} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent"></div>
            <div className="absolute bottom-6 left-8 text-white">
              <span className="bg-primary-500 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block">
                {planta.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold shadow-sm">{nombreComun}</h1>
              <p className="text-lg font-medium opacity-90">{planta.latin} · {planta.family}</p>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {/* Clima y Luz */}
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                  Condiciones Óptimas
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Clima</span>
                    <span className="font-medium text-surface-900">{planta.climate}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Temp. Ideal</span>
                    <span className="font-medium text-surface-900">
                      {planta.tempmin?.celsius}°C - {planta.tempmax?.celsius}°C
                    </span>
                  </li>
                  <li className="flex flex-col border-b border-surface-100 pb-2 gap-1">
                    <span className="text-gray-500">Luz ideal</span>
                    <span className="font-medium text-surface-900">{planta.ideallight}</span>
                  </li>
                  <li className="flex flex-col border-b border-surface-100 pb-2 gap-1">
                    <span className="text-gray-500">Luz tolerada</span>
                    <span className="font-medium text-surface-900">{planta.toleratedlight}</span>
                  </li>
                </ul>
              </div>

              {/* Riego y Plagas */}
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                  Cuidados y Amenazas
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-col border-b border-surface-100 pb-2 gap-1">
                    <span className="text-gray-500">Riego</span>
                    <span className="font-medium text-surface-900 leading-relaxed">{planta.watering}</span>
                  </li>
                  <li className="flex flex-col border-b border-surface-100 pb-2 gap-1">
                    <span className="text-gray-500">Plagas Comunes</span>
                    <span className="font-medium text-surface-900">
                      {Array.isArray(planta.insects) ? planta.insects.join(', ') : planta.insects || 'N/A'}
                    </span>
                  </li>
                  <li className="flex flex-col border-b border-surface-100 pb-2 gap-1">
                    <span className="text-gray-500">Enfermedades</span>
                    <span className="font-medium text-surface-900">
                      {Array.isArray(planta.diseases) ? planta.diseases.join(', ') : planta.diseases || 'N/A'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Cuadrícula (Catálogo)
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
          Catálogo Global
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Explora más de {plantas.length} especies vegetales obtenidas en tiempo real.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantas.map((p) => {
          const nombreComun = p.common && p.common.length > 0 ? p.common[0] : p.latin;
          return (
            <Link
              key={p.id}
              to={`/plantas/${p.id}`}
              className="group flex flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-md hover:border-primary-300 transition-all"
            >
              <div className="h-40 bg-surface-100 relative overflow-hidden">
                <img src={PLACEHOLDER_IMAGE} alt={nombreComun} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-surface-800">
                  {p.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-surface-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{nombreComun}</h3>
                <p className="text-sm text-gray-500 font-medium mb-4 italic line-clamp-1">{p.latin}</p>
                
                <div className="mt-auto grid grid-cols-2 gap-2 text-xs text-surface-700 bg-surface-50 p-3 rounded-lg border border-surface-100">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-medium">Clima</span>
                    <span className="font-semibold truncate">{p.climate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-medium">Temp Max</span>
                    <span className="font-semibold">{p.tempmax?.celsius}°C</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
