## [![Time period](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_badge.svg)](https://repography.com)
[![Timeline graph](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_timeline.svg)](https://github.com/gifuitvnluan/homepage/commits)
[![Issue status graph](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_issues.svg)](https://github.com/gifuitvnluan/homepage/issues)
[![Pull request status graph](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_prs.svg)](https://github.com/gifuitvnluan/homepage/pulls)
[![Trending topics](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_words.svg)](https://github.com/gifuitvnluan/homepage/commits)
[![Top contributors](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_users.svg)](https://github.com/gifuitvnluan/homepage/graphs/contributors)
[![Activity map](https://images.repography.com/38184122/gifuitvnluan/homepage/recent-activity/z1HudbUbUI-mFyMK1WBYKX-ftdHOcBUGcMNyj0rHYUc/JI1NrjRxYbzdEIkzmSVJABxOBM1W8J8YIZiwn-TsDX4_map.svg)](https://github.com/gifuitvnluan/homepage/commits)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Cấu trúc thư mục dự án Next.js (App Router)

Dưới đây là cấu trúc thư mục chuẩn cho dự án Next.js sử dụng **App Router**, với thư mục `src/` để tổ chức mã nguồn gọn gàng. Cấu trúc này phù hợp cho các dự án từ nhỏ đến lớn, đảm bảo dễ bảo trì và mở rộng.

## Cây thư mục

```bash
my-nextjs-app/
├── src/                    # Thư mục chứa mã nguồn
│   ├── app/                # Thư mục App Router
│   │   ├── layout.tsx      # Layout chung cho ứng dụng
│   │   ├── page.tsx        # Trang chính (home page)
│   │   ├── favicon.ico     # Icon của website
│   │   ├── globals.css     # File CSS toàn cục
│   │   ├── (auth)/         # Nhóm route cho xác thực
│   │   │   ├── login/      # Route cho trang đăng nhập
│   │   │   │   └── page.tsx
│   │   │   └── register/   # Route cho trang đăng ký
│   │   │       └── page.tsx
│   │   ├── dashboard/      # Route cho trang dashboard
│   │   │   ├── layout.tsx  # Layout riêng cho dashboard
│   │   │   └── page.tsx
│   │   ├── api/            # Thư mục cho API routes
│   │   │   └── hello/      # Ví dụ API route
│   │   │       └── route.ts
│   │   ├── components/     # Component giao diện (UI)
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── lib/            # Hàm tiện ích, logic tái sử dụng
│   │   │   └── utils.ts
│   │   └── styles/         # CSS module hoặc style
│   │       └── components/
│   │           └── Header.module.css
│   ├── tests/              # File kiểm thử
│   │   └── page.test.tsx
├── public/                 # Tài nguyên tĩnh
│   ├── images/             # Hình ảnh
│   │   └── logo.png
│   ├── fonts/              # Font chữ
│   │   └── custom-font.ttf
│   └── robots.txt          # Cấu hình SEO
├── .eslintrc.json          # Cấu hình ESLint
├── .gitignore              # File/thư mục bỏ qua trong git
├── next.config.mjs         # Cấu hình Next.js
├── package.json            # Cấu hình dự án và dependencies
├── tsconfig.json           # Cấu hình TypeScript (nếu dùng)
├── tailwind.config.js      # Cấu hình Tailwind CSS (nếu dùng)
├── postcss.config.js       # Cấu hình PostCSS (nếu dùng Tailwind)
└── README.md               # Tài liệu dự án
