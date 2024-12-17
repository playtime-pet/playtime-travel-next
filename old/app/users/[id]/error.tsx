"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-red-500">出错了！</h2>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                重试
            </button>
        </div>
    );
}
