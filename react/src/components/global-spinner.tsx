export default function GlobalSpinner() {
    return (
        <div
            aria-live="polite"
            aria-busy="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
            <div className="flex flex-col items-center gap-3">
                <div
                    className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
                    role="status"
                    aria-label="loading"
                />
                <span className="text-sm text-white sr-only">Loading...</span>
            </div>
        </div>
    );
}