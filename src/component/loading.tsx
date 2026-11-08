"use client"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-slate-950 bg-slate-200">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-blue-green-500 border-blue-green-400" />

          <div className="absolute inset-3 rounded-full bg-slate-950" />

          <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg shadow-cyan-500/30" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">
            Loading
            <span className="ml-1 inline-flex">
              <span className="animate-bounce [animation-delay:0ms]">.</span>
              <span className="animate-bounce [animation-delay:150ms]">.</span>
              <span className="animate-bounce [animation-delay:300ms]">.</span>
            </span>
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Please wait a moment
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
