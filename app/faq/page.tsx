"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ChevronDown, MessageCircle } from "lucide-react"

const faqs = [
  {
    category: "การจองและขั้นตอน",
    questions: [
      {
        q: "ต้องจองล่วงหน้ากี่วัน?",
        a: "แนะนำให้จองล่วงหน้าอย่างน้อย 1-2 เดือน โดยเฉพาะในช่วงฤดูแต่งงาน (พฤศจิกายน-กุมภาพันธ์) ควรจองล่วงหน้า 3-6 เดือน เพื่อให้เราเตรียมงานได้อย่างเต็มที่"
      },
      {
        q: "ขั้นตอนการจองเป็นอย่างไร?",
        a: "1. ติดต่อสอบถามผ่าน LINE หรือโทรศัพท์ 2. นัดพูดคุยรายละเอียดงาน 3. เลือกแพ็คเกจและดอกไม้ 4. ชำระมัดจำ 50% 5. ชำระส่วนที่เหลือก่อนวันงาน 7 วัน"
      },
      {
        q: "รับงานนอกพื้นที่ลพบุรีไหม?",
        a: "รับครับ เรารับงานทั่วประเทศไทย โดยมีค่าเดินทางเพิ่มเติมตามระยะทาง สามารถสอบถามราคาได้โดยตรง"
      },
    ]
  },
  {
    category: "ราคาและการชำระเงิน",
    questions: [
      {
        q: "ราคาเริ่มต้นเท่าไหร่?",
        a: "ราคาเริ่มต้นตั้งแต่ 15,000 บาท ขึ้นอยู่กับขนาดงานและรูปแบบการตกแต่ง สามารถดูรายละเอียดแพ็คเกจได้ในหน้าบริการ หรือติดต่อสอบถามเพื่อขอใบเสนอราคาที่เหมาะกับงานของคุณ"
      },
      {
        q: "ชำระเงินได้ช่องทางไหนบ้าง?",
        a: "รับชำระผ่านการโอนเงินธนาคาร (กสิกร, กรุงไทย, ไทยพาณิชย์) และ PromptPay"
      },
      {
        q: "ต้องมัดจำเท่าไหร่?",
        a: "มัดจำ 50% ของยอดรวม หลังจากตกลงรายละเอียดงานเรียบร้อยแล้ว ส่วนที่เหลือชำระก่อนวันงาน 7 วัน"
      },
    ]
  },
  {
    category: "ดอกไม้และการออกแบบ",
    questions: [
      {
        q: "ใช้ดอกไม้สดหรือดอกไม้ประดิษฐ์?",
        a: "เราใช้ดอกไม้สดคุณภาพสูงเป็นหลัก แต่สามารถผสมดอกไม้ประดิษฐ์ได้ตามความต้องการของลูกค้า ดอกไม้สดจะถูกจัดส่งในวันงานเพื่อความสดใหม่"
      },
      {
        q: "สามารถเลือกสีและชนิดดอกไม้ได้ไหม?",
        a: "ได้เลยครับ เราจะพูดคุยกับลูกค้าเรื่องธีมสี ชนิดดอกไม้ที่ต้องการ และจะเสนอตัวเลือกที่เหมาะสมกับฤดูกาลและงบประมาณ"
      },
      {
        q: "มีบริการออกแบบตามธีมไหม?",
        a: "มีครับ เรามีทีมออกแบบที่พร้อมสร้างสรรค์ตามธีมที่ลูกค้าต้องการ ไม่ว่าจะเป็น Rustic, Classic, Modern หรือธีมไทยประยุกต์"
      },
    ]
  },
  {
    category: "วันงานและบริการ",
    questions: [
      {
        q: "ทีมงานจะมาติดตั้งกี่โมง?",
        a: "ทีมงานจะเข้าติดตั้งล่วงหน้า 3-5 ชั่วโมงก่อนเริ่มงาน ขึ้นอยู่กับขนาดและความซับซ้อนของงาน"
      },
      {
        q: "หลังงานเสร็จต้องเก็บของเองไหม?",
        a: "ไม่ต้องครับ ทีมงานจะรับผิดชอบเก็บอุปกรณ์และตกแต่งทั้งหมดหลังจบงาน"
      },
      {
        q: "ถ้ามีการเปลี่ยนแปลงรายละเอียดงานทำได้ไหม?",
        a: "สามารถเปลี่ยนแปลงได้ก่อนวันงาน 14 วัน โดยไม่มีค่าใช้จ่ายเพิ่มเติม (ยกเว้นมีการเปลี่ยนแปลงที่มีผลต่อต้นทุน)"
      },
    ]
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">กลับหน้าหลัก</span>
          </Link>
          <h1 className="font-serif text-xl font-semibold text-foreground">FAQ</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            คำถามที่พบบ่อย
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            รวมคำถามที่ลูกค้าสอบถามบ่อย หากไม่พบคำตอบที่ต้องการ สามารถติดต่อเราได้โดยตรง
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqs.map((section, sectionIndex) => (
            <div key={section.category} className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="bg-secondary px-6 py-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {section.category}
                </h3>
              </div>
              <div className="divide-y divide-border">
                {section.questions.map((item, itemIndex) => {
                  const id = `${sectionIndex}-${itemIndex}`
                  const isOpen = openItems.includes(id)
                  return (
                    <div key={id}>
                      <button
                        onClick={() => toggleItem(id)}
                        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
                      >
                        <span className="pr-4 font-medium text-foreground">{item.q}</span>
                        <ChevronDown 
                          size={20} 
                          className={`flex-shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="bg-muted/30 px-6 py-4">
                          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-lg bg-primary p-8 text-center">
          <MessageCircle size={40} className="mx-auto mb-4 text-accent" />
          <h3 className="font-serif text-xl font-semibold text-primary-foreground">
            ยังมีคำถามอีกไหม?
          </h3>
          <p className="mt-2 text-primary-foreground/70">
            ติดต่อเราได้เลย เรายินดีตอบทุกคำถาม
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://line.me/ti/p/~tonyaflowers"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#06C755] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#05a847]"
            >
              LINE
            </a>
            <a
              href="tel:0928278061"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              โทร 092-827-8061
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
