# Tổng quan dự án
Dự án sử dụng **Next.js (App Router)** với TypeScript.  

## Quy tắc trả lời của Copilot
- Chỉ được trả lời bằng **tiếng Việt**.  
- Hãy trả lời để người chưa biết gì về reactjs hoặc nextjs cũng có thể hiểu được.
- Giữ câu trả lời ngắn gọn, rõ ràng, dễ hiểu.  
- Khi có ví dụ code, phải kèm theo giải thích chi tiết để tránh lỗi. 

## Cấu trúc thư mục chính
- `/app`: chứa tất cả route, layout, page và API
  - `app/layout.tsx`: layout gốc
  - `app/page.tsx`: trang chủ
  - `app/(group)/...`: route group
  - `app/api/.../route.ts`: Next.js API Route (REST endpoints)
- `/components`: chứa các UI components tái sử dụng
- `/lib`: helper functions, database client, services
- `/public`: static assets
- `/styles`: file CSS/SCSS global hoặc module
- `prisma/`: Prisma schema và migrations (nếu dùng database)

## Công nghệ & phiên bản
- Node.js >= 18
- Next.js 15.4.4 (App Router)
- TypeScript
- ESLint + Prettier (format code)
- Tailwind CSS (UI)

## Build & chạy
- `pnpm install` → cài dependencies
- `pnpm dev` → chạy dev server (http://localhost:3000)
- `pnpm build` → build production
- `pnpm start` → chạy production build
- `pnpm lint` → check code style

## API Routes
- Tạo trong `app/api/[endpoint]/route.ts`
- Hỗ trợ các HTTP method: `GET`, `POST`, `PUT`, `DELETE`
- Export function tương ứng:  
  ```ts
  export async function GET(req: Request) { ... }
  export async function POST(req: Request) { ... }
