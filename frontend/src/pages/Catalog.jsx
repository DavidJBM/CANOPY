import { Link, useParams } from 'react-router-dom';
import { plantas } from '../data/plantas';

export default function Catalog() {
  const { id } = useParams();

  // If a specific ID is present, we show the detail view
  if (id) {
    const planta = plantas.find((p) => p.id === id);
    if (!planta) return <div className="text-center py-20">Planta no encontrada</div>;

    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <Link to="/plantas" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          &larr; Volver al catálogo
        </Link>
        
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden mb-8">
          <div className="h-64 sm:h-80 relative bg-surface-100">
            <img src={planta.imagen} alt={planta.nombre} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8 border-b border-surface-100 pb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 mb-2">{planta.nombre}</h1>
              <p className="text-lg text-gray-500 font-medium">{planta.nombreCientifico} · Familia: {planta.familia}</p>
              <p className="mt-6 text-gray-600 leading-relaxed">{planta.descripcion}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {/* Clima y Suelo */}
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                  Condiciones Óptimas
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Temperatura ideal</span>
                    <span className="font-medium text-surface-900">{planta.clima.temperaturaIdeal}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Tipo de suelo</span>
                    <span className="font-medium text-surface-900">{planta.suelo.tipo}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">pH requerido</span>
                    <span className="font-medium text-surface-900">{planta.suelo.ph}</span>
                  </li>
                </ul>
              </div>

              {/* Cultivo */}
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                  Datos de Cultivo
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Ciclo</span>
                    <span className="font-medium text-surface-900">{planta.cultivo.cicloDias}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Época de siembra</span>
                    <span className="font-medium text-surface-900">{planta.cultivo.epocaSiembra}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-100 pb-2">
                    <span className="text-gray-500">Riego</span>
                    <span className="font-medium text-surface-900">{planta.riego.frecuencia}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
          Catálogo de Cultivos
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Explora nuestra base de datos con información agronómica detallada sobre los principales cultivos de la región.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantas.map((p) => (
          <Link
            key={p.id}
            to={`/plantas/${p.id}`}
            className="group flex flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-md hover:border-surface-300 transition-all"
          >
            <div className="h-48 bg-surface-100 relative overflow-hidden">
              <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-surface-900 mb-1 group-hover:text-primary-600 transition-colors">{p.nombre}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">{p.nombreCientifico}</p>
              
              <div className="mt-auto grid grid-cols-2 gap-2 text-xs text-surface-700 bg-surface-50 p-3 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-gray-400 font-medium">Ciclo</span>
                  <span className="font-semibold">{p.cultivo.cicloDias.split(' ')[0]} días</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 font-medium">pH Ideal</span>
                  <span className="font-semibold">{p.suelo.ph}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
