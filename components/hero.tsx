import Image from "next/image"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg"
        alt="Elegant wedding ceremony setup by Tonya Flowers Wedding Studio"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* <Image
          src="/images/logo.jpg"
          alt="Tonya Flowers Wedding Studio"
          width={120}
          height={120}
          className="mx-auto mb-8 rounded-full border-2 border-accent/50"
        /> */}
        <div className="mx-auto size-[120px]"/>

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
          Wedding Organizer & Floral Design
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl text-balance">
          Tonya Flowers Wedding Studio
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          ร้านต้นหญ้าฟลาวเวอร์เวดดิ้งลพบุรี ออแกไนซ์งานแต่งครบวงจร
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-sm bg-accent px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent/90"
          >
            ติดต่อเรา
          </a>
          <a
            href="#services"
            className="rounded-sm border border-primary-foreground/30 px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            บริการของเรา
          </a>
        </div>
      </div>
    </section>
  )
}
