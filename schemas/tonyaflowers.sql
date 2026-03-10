-- =============================================
-- Tonya Flowers Wedding Studio Database Schema
-- =============================================

-- 1. PROFILES TABLE (extends auth.users)
-- =============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text default 'user' check (role in ('user', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- RLS Policies for profiles
create policy "profiles_select_own" on public.profiles 
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles 
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles 
  for update using (auth.uid() = id);

-- Admin can view all profiles
create policy "admin_select_all_profiles" on public.profiles 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- =============================================
-- 2. PACKAGES TABLE (แพ็คเกจบริการ)
-- =============================================
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10,2) not null,
  features jsonb default '[]'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.packages enable row level security;

-- Everyone can view active packages
create policy "packages_select_all" on public.packages 
  for select using (is_active = true);

-- Admin can manage packages
create policy "admin_manage_packages" on public.packages 
  for all using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- =============================================
-- 3. BLOCKED_DATES TABLE (วันที่จองไม่ได้)
-- =============================================
create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null unique,
  reason text,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

alter table public.blocked_dates enable row level security;

-- Everyone can view blocked dates
create policy "blocked_dates_select_all" on public.blocked_dates 
  for select using (true);

-- Admin can manage blocked dates
create policy "admin_manage_blocked_dates" on public.blocked_dates 
  for all using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- =============================================
-- 4. BOOKINGS TABLE (รายการจอง)
-- =============================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  package_id uuid references public.packages(id),
  
  -- Customer info
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  
  -- Event details
  event_date date not null,
  event_location text,
  event_type text, -- งานแต่งงาน, งานหมั้น, etc.
  special_requests text,
  
  -- Pricing
  package_price decimal(10,2),
  additional_cost decimal(10,2) default 0,
  total_price decimal(10,2),
  
  -- Status
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  
  -- Payment
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'deposit_paid', 'fully_paid')),
  payment_amount decimal(10,2) default 0,
  payment_date timestamp with time zone,
  payment_note text,
  
  -- Admin notes
  admin_notes text,
  confirmed_by uuid references auth.users(id),
  confirmed_at timestamp with time zone,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.bookings enable row level security;

-- Users can view their own bookings
create policy "bookings_select_own" on public.bookings 
  for select using (auth.uid() = user_id);

-- Users can create bookings
create policy "bookings_insert_own" on public.bookings 
  for insert with check (auth.uid() = user_id);

-- Users can update their pending bookings
create policy "bookings_update_own" on public.bookings 
  for update using (auth.uid() = user_id and status = 'pending');

-- Admin can view all bookings
create policy "admin_select_all_bookings" on public.bookings 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can update all bookings
create policy "admin_update_all_bookings" on public.bookings 
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can delete bookings
create policy "admin_delete_bookings" on public.bookings 
  for delete using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- =============================================
-- 5. NOTIFICATIONS TABLE (แจ้งเตือน)
-- =============================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  
  title text not null,
  message text not null,
  type text default 'info' check (type in ('info', 'success', 'warning', 'booking', 'payment')),
  
  -- Reference to related booking
  booking_id uuid references public.bookings(id) on delete cascade,
  
  is_read boolean default false,
  read_at timestamp with time zone,
  
  created_at timestamp with time zone default now()
);

alter table public.notifications enable row level security;

-- Users can view their own notifications
create policy "notifications_select_own" on public.notifications 
  for select using (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
create policy "notifications_update_own" on public.notifications 
  for update using (auth.uid() = user_id);

-- System/Admin can insert notifications for anyone
create policy "admin_insert_notifications" on public.notifications 
  for insert with check (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
    or auth.uid() = user_id
  );

-- =============================================
-- 6. TRIGGER: Auto-create profile on signup
-- =============================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'phone', null),
    coalesce(new.raw_user_meta_data ->> 'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================
-- 7. TRIGGER: Block date when booking confirmed
-- =============================================
create or replace function public.block_date_on_booking_confirm()
returns trigger
language plpgsql
security definer
as $$
begin
  -- When booking is confirmed, block the date
  if new.status = 'confirmed' and (old.status is null or old.status != 'confirmed') then
    insert into public.blocked_dates (blocked_date, reason, created_by)
    values (new.event_date, 'มีการจองงาน: ' || new.customer_name, new.confirmed_by)
    on conflict (blocked_date) do nothing;
  end if;
  
  -- When booking is cancelled/deleted, unblock the date
  if new.status = 'cancelled' and old.status = 'confirmed' then
    delete from public.blocked_dates where blocked_date = old.event_date;
  end if;
  
  return new;
end;
$$;

drop trigger if exists on_booking_status_change on public.bookings;

create trigger on_booking_status_change
  after update on public.bookings
  for each row
  execute function public.block_date_on_booking_confirm();

-- =============================================
-- 8. TRIGGER: Create notification on booking status change
-- =============================================
create or replace function public.notify_booking_status_change()
returns trigger
language plpgsql
security definer
as $$
declare
  notification_title text;
  notification_message text;
begin
  -- Only create notification if status changed
  if old.status is distinct from new.status then
    case new.status
      when 'confirmed' then
        notification_title := 'การจองได้รับการยืนยัน';
        notification_message := 'การจองของคุณสำหรับวันที่ ' || to_char(new.event_date, 'DD/MM/YYYY') || ' ได้รับการยืนยันแล้ว';
      when 'cancelled' then
        notification_title := 'การจองถูกยกเลิก';
        notification_message := 'การจองของคุณสำหรับวันที่ ' || to_char(new.event_date, 'DD/MM/YYYY') || ' ถูกยกเลิก';
      when 'completed' then
        notification_title := 'งานเสร็จสมบูรณ์';
        notification_message := 'ขอบคุณที่ใช้บริการ Tonya Flowers Wedding Studio';
      else
        return new;
    end case;
    
    -- Create notification for user
    if new.user_id is not null then
      insert into public.notifications (user_id, title, message, type, booking_id)
      values (new.user_id, notification_title, notification_message, 'booking', new.id);
    end if;
  end if;
  
  -- Notify on payment status change
  if old.payment_status is distinct from new.payment_status and new.payment_status != 'unpaid' then
    if new.user_id is not null then
      insert into public.notifications (user_id, title, message, type, booking_id)
      values (
        new.user_id,
        'อัพเดทการชำระเงิน',
        case new.payment_status
          when 'deposit_paid' then 'ได้รับการชำระเงินมัดจำแล้ว จำนวน ' || new.payment_amount || ' บาท'
          when 'fully_paid' then 'ได้รับการชำระเงินครบถ้วนแล้ว'
        end,
        'payment',
        new.id
      );
    end if;
  end if;
  
  return new;
end;
$$;

drop trigger if exists on_booking_notify on public.bookings;

create trigger on_booking_notify
  after update on public.bookings
  for each row
  execute function public.notify_booking_status_change();

-- =============================================
-- 9. TRIGGER: Notify admin on new booking
-- =============================================
create or replace function public.notify_admin_new_booking()
returns trigger
language plpgsql
security definer
as $$
declare
  admin_user record;
begin
  -- Notify all admins about new booking
  for admin_user in (select id from public.profiles where role = 'admin')
  loop
    insert into public.notifications (user_id, title, message, type, booking_id)
    values (
      admin_user.id,
      'มีการจองใหม่',
      'คุณ ' || new.customer_name || ' ได้จองงานวันที่ ' || to_char(new.event_date, 'DD/MM/YYYY'),
      'booking',
      new.id
    );
  end loop;
  
  return new;
end;
$$;

drop trigger if exists on_new_booking_notify_admin on public.bookings;

create trigger on_new_booking_notify_admin
  after insert on public.bookings
  for each row
  execute function public.notify_admin_new_booking();

-- =============================================
-- 10. INDEXES for performance
-- =============================================
create index if not exists idx_bookings_event_date on public.bookings(event_date);
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_notifications_is_read on public.notifications(is_read);
create index if not exists idx_blocked_dates_date on public.blocked_dates(blocked_date);

-- =============================================
-- 11. INSERT DEFAULT PACKAGES
-- =============================================
insert into public.packages (name, description, price, features) values
  ('Basic', 'แพ็คเกจพื้นฐาน', 15000, '["ช่อดอกไม้เจ้าสาว 1 ช่อ", "ดอกไม้ติดอกเจ้าบ่าว", "ดอกไม้ตกแต่งโต๊ะลงทะเบียน"]'),
  ('Standard', 'แพ็คเกจมาตรฐาน', 35000, '["ช่อดอกไม้เจ้าสาว 1 ช่อ", "ดอกไม้ติดอกเจ้าบ่าว", "ดอกไม้ตกแต่งโต๊ะลงทะเบียน", "ซุ้มดอกไม้พิธีการ", "ดอกไม้ตกแต่งเวที"]'),
  ('Premium', 'แพ็คเกจพรีเมี่ยม', 65000, '["ช่อดอกไม้เจ้าสาว 2 ช่อ", "ดอกไม้ติดอกเจ้าบ่าว", "ดอกไม้เพื่อนเจ้าสาว", "ดอกไม้ตกแต่งโต๊ะลงทะเบียน", "ซุ้มดอกไม้พิธีการขนาดใหญ่", "ดอกไม้ตกแต่งเวที", "ดอกไม้ประดับโต๊ะแขก"]'),
  ('Luxury', 'แพ็คเกจหรูหรา', 120000, '["ช่อดอกไม้เจ้าสาว 3 ช่อ (พิธีเช้า/เย็น/สำรอง)", "ดอกไม้ติดอกเจ้าบ่าว", "ดอกไม้เพื่อนเจ้าสาว", "ดอกไม้ตกแต่งโต๊ะลงทะเบียน", "ซุ้มดอกไม้พิธีการขนาดใหญ่พิเศษ", "ดอกไม้ตกแต่งเวทีแบบเต็มรูปแบบ", "ดอกไม้ประดับโต๊ะแขกทุกโต๊ะ", "ทางเดินดอกไม้", "บริการพิเศษตลอดงาน"]')
on conflict do nothing;

-- =============================================
-- HELPER FUNCTION: Check if date is available
-- =============================================
create or replace function public.is_date_available(check_date date)
returns boolean
language plpgsql
as $$
begin
  return not exists (
    select 1 from public.blocked_dates where blocked_date = check_date
  )
  and not exists (
    select 1 from public.bookings 
    where event_date = check_date 
    and status in ('pending', 'confirmed')
  );
end;
$$;

-- =============================================
-- VIEW: Booking calendar (for admin)
-- =============================================
create or replace view public.booking_calendar as
select 
  b.id,
  b.event_date,
  b.customer_name,
  b.status,
  b.payment_status,
  p.name as package_name
from public.bookings b
left join public.packages p on b.package_id = p.id
where b.status != 'cancelled'
order by b.event_date;
