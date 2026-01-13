interface ErrorOverlayProps {
  message: string;
  onReload?: () => void;
}

export function ErrorOverlay({ message, onReload }: ErrorOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm text-white p-4 z-50">
      <div className="text-center max-w-md">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold mb-2">Error loading video</p>
        <p className="text-sm text-gray-300 mb-4">{message}</p>
        <button
          onClick={onReload}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
