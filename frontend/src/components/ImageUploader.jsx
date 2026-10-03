import { useState, useRef } from 'react';

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      plaga: 'Tizón Temprano (Alternaria solani)',
      confianza: 0.94,
      severidad: 'Alta',
      recomendacion: 'Retirar hojas afectadas inmediatamente. Aplicar fungicida a base de cobre o clorotalonil según indicaciones del fabricante.',
    });
    setIsAnalyzing(false);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {!preview ? (
        <div 
          className={`relative flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed transition-colors bg-white ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-surface-200 hover:border-surface-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4 rounded-full bg-surface-100 p-4">
            <svg className="h-8 w-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-surface-900 mb-1">Selecciona una imagen de tu cultivo</h3>
          <p className="text-sm text-gray-500 mb-6">PNG, JPG hasta 10MB</p>
          
          <button 
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-9 items-center justify-center rounded-md bg-white border border-surface-200 px-4 text-sm font-medium text-surface-900 hover:bg-surface-50 shadow-sm"
          >
            Explorar archivos
          </button>
          <input ref={fileRef} type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
          <div className="relative bg-surface-100">
            <img src={preview} alt="Preview" className="w-full max-h-[400px] object-contain" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-surface-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-medium">Analizando muestra...</p>
              </div>
            )}
          </div>
          
          <div className="p-6">
            {!result && !isAnalyzing && (
              <div className="flex gap-4">
                <button 
                  onClick={reset}
                  className="flex-1 inline-flex h-10 items-center justify-center rounded-md bg-white border border-surface-200 px-4 text-sm font-medium text-surface-900 hover:bg-surface-50"
                >
                  Cambiar
                </button>
                <button 
                  onClick={analyzeImage}
                  className="flex-1 inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white hover:bg-primary-700 shadow-sm"
                >
                  Analizar
                </button>
              </div>
            )}

            {result && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-surface-900 mb-4">Resultados del Análisis</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-surface-50 rounded-lg p-4 border border-surface-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Plaga Detectada</p>
                      <p className="font-semibold text-surface-900">{result.plaga}</p>
                    </div>
                    <div className="bg-surface-50 rounded-lg p-4 border border-surface-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nivel de Confianza</p>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-primary-600">{Math.round(result.confianza * 100)}%</span>
                        <div className="flex-1 h-2 bg-surface-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500" style={{ width: `${result.confianza * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold">!</span>
                    <h4 className="font-bold text-red-900">Acción Recomendada ({result.severidad} Severidad)</h4>
                  </div>
                  <p className="text-red-800 text-sm leading-relaxed ml-8">{result.recomendacion}</p>
                </div>

                <button 
                  onClick={reset}
                  className="w-full inline-flex h-10 items-center justify-center rounded-md bg-white border border-surface-200 px-4 text-sm font-medium text-surface-900 hover:bg-surface-50"
                >
                  Nuevo Análisis
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
