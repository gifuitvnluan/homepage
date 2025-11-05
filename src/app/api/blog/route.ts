import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

interface CustomFeedItem {
  title?: string;
  link?: string;
  contentSnippet?: string;
  ['content:encoded']?: string;
  pubDate?: string;
  author?: string;
}

export async function GET(request: Request) {
  const parser = new Parser<CustomFeedItem>();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);

  try {
    // ✅ URL RSS cần lấy
    const rssUrl = `https://1tomy.com/feed/?paged=${page}`;
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

            const date = item.pubDate ? new Date(item.pubDate) : new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');

            // Lấy tác giả từ <dc:creator><![CDATA[Tô Mỳ Tôm]]></dc:creator>
            const author = item['dc:creator'] ? item['dc:creator'] : 'Unknown';

        return {
            title: item.title,
            link: item.link,
            date: `${year}/${month}/${date.getDate()}`,
            description: item.contentSnippet,
            image: image,
            author: author,
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
