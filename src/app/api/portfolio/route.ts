import Parser from 'rss-parser';
import { NextResponse } from 'next/server';
import { request } from 'http';

interface CustomFeedItem {
  title?: string;
  link?: string;
  contentSnippet?: string;
  ['content:encoded']?: string;
  pubDate?: string;
}

export async function GET(request: Request) {
  const parser = new Parser<CustomFeedItem>();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);

  try {
    // ✅ URL RSS cần lấy
    const rssUrl = `https://1tomy.com/portfolio/feed/?paged=${page}`;
    const feed = await parser.parseURL(rssUrl);

    // Hàm lấy URL ảnh từ thẻ <img>
    function extractImage(html?: string): string | null {
      if (!html) return null;
      const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
      return match ? match[1] : null;
    }

    // ✅ Chỉ lấy một số thông tin cần thiết
    const items = feed.items.map((item) => {
        const image =
            extractImage(item['content:encoded']) || extractImage(item.content);

        return {
            title: item.title,
            link: item.contentSnippet,
            date: item.pubDate,
            description: item.contentSnippet,
            image: image,
        };
    });

    // Cắt dữ liệu theo trang
    const hasMore = items.length >= 10;
    return NextResponse.json({
      page,
      hasMore,
      items,
    });
  } catch (error) {
    console.error('Lỗi khi đọc RSS:', error);
    return NextResponse.json({ error: 'Không thể đọc RSS feed' }, { status: 500 });
  }
}
