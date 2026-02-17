import Image from "next/image"
import { Facebook, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/images/logo.jpg"
            alt="Tonya Flowers Wedding Studio"
            width={56}
            height={56}
            className="rounded-full"
          />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Tonya Flowers Wedding Studio
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Professional wedding organizer and floral design studio in Lop Buri,
            Thailand. Creating beautiful memories, one wedding at a time.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/TonyaFlowersWeddingStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="mailto:tanuponlali@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:0928278061"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
          </div>

          <div className="h-px w-full max-w-xs bg-border" />

          <p className="text-xs text-muted-foreground">
            {`© ${currentYear} Tonya Flowers Wedding Studio. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
