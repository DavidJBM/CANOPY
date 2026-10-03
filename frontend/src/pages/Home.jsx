import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 sm:text-6xl mb-8">
            Inteligencia Artificial para el{' '}
            <span className="text-primary-600">diagnóstico de cultivos</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10 leading-relaxed">
            Identifica plagas y enfermedades en tus plantas al instante con solo subir una fotografía. CANOPY es la herramienta definitiva para maximizar el rendimiento de tu cosecha.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/detectar"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-primary-600 px-8 text-base font-semibold text-white transition-colors hover:bg-primary-700 shadow-sm"
            >
              Comenzar Diagnóstico
            </Link>
            <Link
              to="/plantas"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-white border border-surface-200 px-8 text-base font-semibold text-surface-900 transition-colors hover:bg-surface-50 shadow-sm"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="grid md:grid-cols-3 gap-8 pb-20 border-b border-surface-200">
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-surface-900 mb-2">Diagnóstico Rápido</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Resultados en segundos respaldados por modelos de visión por computadora entrenados con miles de imágenes.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-surface-900 mb-2">Alta Precisión</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Nuestros modelos cuentan con un 92% de precisión en la detección de las plagas más comunes de la región.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-surface-200 shadow-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-surface-900 mb-2">Base de Conocimiento</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Accede a una extensa base de datos agronómicos sobre clima, suelo y prácticas de cultivo óptimas.</p>
        </div>
      </section>
    </div>
  );
}
