"use client"

import { useState } from "react"
import { MessageCircle, X, Phone } from "lucide-react"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact options */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* LINE */}
        <a
          href="https://line.me/ti/p/~tonyaflowers"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
            LINE
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00B900] text-white shadow-lg transition-transform hover:scale-110">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
          </div>
        </a>

        {/* Facebook Messenger */}
        <a
          href="https://m.me/TonyaFlowersWeddingStudio"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
            Messenger
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] text-white shadow-lg transition-transform hover:scale-110">
            <MessageCircle className="h-6 w-6" />
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:0928278061"
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
            โทร
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
            <Phone className="h-6 w-6" />
          </div>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-foreground text-background rotate-0"
            : "bg-accent text-primary animate-pulse"
        }`}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
