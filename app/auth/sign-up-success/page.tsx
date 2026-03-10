import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center bg-secondary p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">ตรวจสอบอีเมลของคุณ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                เราได้ส่งลิงก์ยืนยันตัวตนไปที่อีเมลของคุณแล้ว 
                กรุณาคลิกลิงก์ในอีเมลเพื่อยืนยันบัญชีของคุณ
              </p>
              <p className="text-sm text-muted-foreground">
                หากไม่พบอีเมล กรุณาตรวจสอบในโฟลเดอร์ Spam หรือ Junk Mail
              </p>
              <div className="pt-4">
                <Link
                  href="/auth/login"
                  className="text-primary underline underline-offset-4"
                >
                  กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
