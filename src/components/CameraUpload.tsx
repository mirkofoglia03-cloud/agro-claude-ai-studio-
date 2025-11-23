import React, { useRef, useState } from 'react';

interface CameraUploadProps {
  onImageCapture?: (imageData: string) => void;
  title?: string;
  description?: string;
}

const CameraUpload: React.FC<CameraUploadProps> = ({
  onImageCapture,
  title = 'Carica o Scatta Foto',
  description = 'Aggiungi foto per monitorare le tue colture',
}): JSX.Element => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          setCapturedImages((prev) => [...prev, imageData]);
          if (onImageCapture) {
            onImageCapture(imageData);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImages((prev) => [...prev, imageData]);
        if (onImageCapture) {
          onImageCapture(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-agro-green/10 p-3 rounded-xl">
          <svg className="w-8 h-8 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-agro-green-dark text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* Upload Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Gallery Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-agro-green text-agro-green rounded-xl hover:bg-agro-green/5 transition font-semibold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Scegli dalla Galleria
        </button>

        {/* Camera Button */}
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-agro-green to-agro-lime text-white rounded-xl hover:shadow-lg transition font-semibold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Scatta Foto
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
      />

      {/* Image Gallery */}
      {capturedImages.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">
            Immagini Caricate ({capturedImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {capturedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Captured ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Message */}
      {capturedImages.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600">Nessuna immagine caricata</p>
          <p className="text-sm text-gray-500 mt-1">Scatta una foto o caricane una dalla galleria</p>
        </div>
      )}
    </div>
  );
};

export default CameraUpload;
