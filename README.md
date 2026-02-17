# Tonya Flowers Wedding Studio

เว็บไซต์ Landing Page สำหรับ Tonya Flowers Wedding Studio - รับจัดงานแต่งงานครบวงจร ลพบุรี ประเทศไทย

## เทคโนโลยีที่ใช้

- **Next.js 16** - React Framework
- **Tailwind CSS v4** - Styling
- **Vercel** - Hosting & Deployment
- **TypeScript** - Type Safety

---

## คู่มือ SEO (Search Engine Optimization)

### SEO คืออะไร?

SEO คือการปรับแต่งเว็บไซต์ให้ติดอันดับบน Google เมื่อคนค้นหาคำที่เกี่ยวข้องกับธุรกิจของคุณ เช่น "รับจัดงานแต่งงาน ลพบุรี"

### สิ่งที่เตรียมไว้ให้แล้ว

- Meta tags (title, description, keywords) ภาษาไทย
- Open Graph tags สำหรับแชร์บน Facebook / Line
- JSON-LD Structured Data บอก Google ว่าธุรกิจคุณคืออะไร
- Sitemap อัตโนมัติที่ `/sitemap.xml`
- Robots.txt อัตโนมัติที่ `/robots.txt`
- หน้า SEO Guide ภายในเว็บที่ `/seo-guide`

---

### ขั้นตอนที่ 1: แก้ไขคีย์เวิร์ด

เปิดไฟล์ `app/layout.tsx` หา `keywords` array แล้วแก้ไขคีย์เวิร์ดตามต้องการ:

```typescript
keywords: [
  'รับจัดงานแต่งงาน ลพบุรี',      // คีย์เวิร์ดตามสถานที่
  'จัดดอกไม้งานแต่ง',             // คีย์เวิร์ดตามบริการ
  'Tonya Flowers Wedding Studio',  // ชื่อแบรนด์
  'wedding planner Thailand',      // คีย์เวิร์ดภาษาอังกฤษ
  // เพิ่มคีย์เวิร์ดของคุณที่นี่...
],
```

**เทคนิคเลือกคีย์เวิร์ดที่ดี:**

1. ใช้คำที่ลูกค้าจะพิมพ์ค้นหาจริงๆ
2. ผสมภาษาไทยและอังกฤษ
3. ใส่ชื่อจังหวัด/พื้นที่
4. ใช้คำที่เฉพาะเจาะจง เช่น "จัดดอกไม้สดงานแต่ง ลพบุรี" แทน "ดอกไม้"

---

### ขั้นตอนที่ 2: แก้ไข Title และ Description

ในไฟล์ `app/layout.tsx` เดียวกัน:

```typescript
title: 'Tonya Flowers Wedding Studio | รับจัดงานแต่งงาน ลพบุรี',
description: 'รับจัดงานแต่งงานครบวงจร จัดดอกไม้ ตกแต่งสถานที่...',
```

- **Title**: ไม่เกิน 60 ตัวอักษร ใส่คำสำคัญไว้ข้างหน้า
- **Description**: ไม่เกิน 160 ตัวอักษร เขียนให้น่าคลิก

---

### ขั้นตอนที่ 3: อัปเดตโดเมน

หลังจาก deploy แล้วมีโดเมนจริง ให้แก้ไขไฟล์เหล่านี้:

1. `app/layout.tsx` - แก้ `url` ใน openGraph
2. `app/sitemap.ts` - แก้ URL ฐาน
3. `app/robots.ts` - แก้ URL ของ sitemap
4. `app/page.tsx` - แก้ `url` ใน jsonLd

ตัวอย่าง: เปลี่ยน `https://tonyaflowers.com` เป็นโดเมนจริงของคุณ

---

### ขั้นตอนที่ 4: ส่งเว็บไปยัง Google Search Console

1. เข้า [Google Search Console](https://search.google.com/search-console)
2. คลิก "Add property" แล้วใส่ URL เว็บไซต์
3. ยืนยันความเป็นเจ้าของผ่าน DNS (เพิ่ม TXT record ใน Vercel)
4. ไปที่ "Sitemaps" แล้วส่ง URL: `https://yourdomain.com/sitemap.xml`
5. รอ Google เริ่ม index (ประมาณ 2-7 วัน)

---

### ขั้นตอนที่ 5: สร้าง Google Business Profile (สำคัญมาก!)

1. เข้า [Google Business Profile](https://business.google.com)
2. สร้างโปรไฟล์ธุรกิจ (ฟรี!)
3. กรอกข้อมูล:
   - ชื่อ: Tonya Flowers Wedding Studio
   - ที่อยู่: รามเดโช, ลพบุรี, ประเทศไทย 15000
   - เบอร์โทร: 092 827 8061
   - เวลาทำการ: 10:00 - 19:00 ทุกวัน
   - หมวดหมู่: Wedding Planner / Florist
4. อัปโหลดรูปผลงาน
5. ขอให้ลูกค้าเขียนรีวิว

ผลลัพธ์: ร้านจะแสดงบน Google Maps เมื่อคนค้นหา "จัดงานแต่ง ลพบุรี"

---

### ขั้นตอนที่ 6: เพิ่มเนื้อหาสม่ำเสมอ

Google ชอบเว็บที่มีเนื้อหาใหม่ๆ ลองเพิ่ม:

- บล็อกเกี่ยวกับเคล็ดลับงานแต่ง
- รูปผลงานใหม่ในแกลเลอรี
- รีวิวจากลูกค้า
- เนื้อหาตามฤดูกาล

---

### ขั้นตอนที่ 7: สร้าง Backlinks

Backlinks = เว็บอื่นลิงก์มาหาเว็บคุณ ยิ่งมีมากยิ่งดี:

- ลงทะเบียนในเว็บไดเรกทอรีงานแต่งงาน
- แลกลิงก์กับผู้ให้บริการงานแต่งรายอื่น
- แชร์ผลงานบน Facebook พร้อมลิงก์เว็บ
- ติดต่อบล็อก/นิตยสารงานแต่งให้ feature ผลงาน

---

### สรุปไฟล์ที่ต้องแก้ไข

| ไฟล์ | แก้ไขอะไร |
|------|-----------|
| `app/layout.tsx` | คีย์เวิร์ด, title, description, Open Graph |
| `app/page.tsx` | JSON-LD structured data |
| `app/sitemap.ts` | URL ของเว็บไซต์ |
| `app/robots.ts` | URL ของ sitemap |

---

### เครื่องมือ SEO ที่แนะนำ (ฟรี)

- [Google Search Console](https://search.google.com/search-console) - ดูว่า Google เห็นเว็บคุณอย่างไร
- [Google Business Profile](https://business.google.com) - ให้ร้านแสดงบน Google Maps
- [Google PageSpeed Insights](https://pagespeed.web.dev) - ตรวจสอบความเร็วเว็บ
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) - หาคีย์เวิร์ดที่คนค้นหา

---

## การพัฒนาต่อ

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ดูเว็บไซต์

หน้า SEO Guide ภายในเว็บ: [http://localhost:3000/seo-guide](http://localhost:3000/seo-guide)
