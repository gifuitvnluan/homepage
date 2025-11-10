"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLink, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import Skeleton from './loading';
import Image from 'next/image';

interface BlogItem {
  id: number;
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
  author?: string;
}

// add data static blog items here if needed
const staticBlogItems: BlogItem[] = [
  {
      "id": 13,
      "title": "Hướng dẫn cài Xdebug để debug lỗi",
      "link": "https://1tomy.com/2024/12/17/huong-dan-cai-xdebug-de-debug-loi/",
      "date": "2024/12/17",
      "description": "Xdebug là gì Xdebug là một tiện ích mở rộng (extension) của PHP được sử dụng để hỗ trợ debugging (gỡ lỗi), phân tích hiệu suất và tối ưu hóa code trong quá trình phát triển ứng dụng PHP. Nó cung cấp các công cụ mạnh mẽ giúp lập trình viên dễ dàng xác định […]",
      "image": "xdebugdebugerrors.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 12,
      "title": "Hướng dẫn cài đặt và cấu hình Redis Cache trên aaPanel",
      "link": "https://1tomy.com/2024/12/14/huong-dan-cai-dat-va-cau-hinh-redis-cache-tren-aapanel/",
      "date": "2024/12/14",
      "description": "Các bước thực hiện Bước 1: Cài đặt cấu hình Redis trên aaPanel Sau khi bạn đã cài đặt control aaPanel, bạn đăng nhập vào sau đó chọn App Store =\u003E Nhập tên Redis sau đó click Install Bạn click chọn confirm để xác nhận cài đặt. Tiếp đến bạn mở Cấu hình Redis đã cài hoàn tất lên và cấu hình […]",
      "image": "rediscacheaapanel.jpg",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 11,
      "title": "Hướng dẫn sử dụng Filezilla Server để tạo FTP",
      "link": "https://1tomy.com/2024/11/07/huong-dan-su-dung-filezilla-server-de-tao-ftp/",
      "date": "2024/11/7",
      "description": "FileZilla Server là một phần mềm miễn phí, dễ sử dụng, giúp bạn thiết lập một máy chủ FTP (File Transfer Protocol) cá nhân một cách nhanh chóng. FTP cho phép bạn truyền tải các tập tin giữa máy tính của bạn và một máy tính khác thông qua mạng. Bài viết này sẽ hướng […]",
      "image": "filezillaftp.jpg",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 10,
      "title": "Một số link hay dùng cho front end và back end",
      "link": "https://1tomy.com/2024/10/25/mot-so-link-hay-dung-cho-front-end-va-back-end/",
      "date": "2024/10/25",
      "description": "Bài viết tổng hợp các link hay dùng để code web dễ hơn. Thao tác với hình ảnh Thao tác với CSS Thao tác với WordPress Thao tác với Javascript Thao tác với HTML Thao tác với giao diện Trang download Thao tác với mail Giả lập Thao tác với SQL Web cá nhân",
      "image": "linkhay.jpg",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 9,
      "title": "Hướng dẫn tạo kết nối PHP với MySQL",
      "link": "https://1tomy.com/2024/10/24/huong-dan-tao-ket-noi-php-voi-mysql/",
      "date": "2024/10/24",
      "description": "Tạo file databaseconnect.php Khai báo các biến để cần để kết nối Check thử có kết nối thành công hay không Set để có thể sử dụng utf8 cho SQL Tạo bảng dữ liệu SQL Đóng kết nối với SQL khi đã thao tác xong",
      "image": "phpmysql.jpg",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 8,
      "title": "Giới thiệu tool sử dụng AI để chuyển ngôn ngữ của người thành ngôn ngữ SQL",
      "link": "https://1tomy.com/2024/10/23/gioi-thieu-tool-su-dung-ai-de-chuyen-ngon-ngu-cua-nguoi-thanh-ngon-ngu-sql/",
      "date": "2024/10/23",
      "description": "Giới thiệu Tool sử dụng AI để chuyển ngôn ngữ của người thành ngôn ngữ SQL (Có thể nhập Tiếng Việt). Thông tin tham khảo Github.com Sqltranslate",
      "image": "aitosql.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 7,
      "title": "Hướng dẫn tạo chức năng so sánh hình bằng Jquery",
      "link": "https://1tomy.com/2024/10/23/huong-dan-tao-chuc-nang-so-sanh-hinh-bang-jquery/",
      "date": "2024/10/23",
      "description": "Hướng dẫn Tạo chức năng so sánh hình ảnh Ví dụ",
      "image": "sosanhanhjquery.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 6,
      "title": "Tạo Hình 360° bằng JS",
      "link": "https://1tomy.com/2024/10/23/tao-hinh-360-bang-js/",
      "date": "2024/10/23",
      "description": "Hướng dẫn Hướng dẫn làm hình 360° bằng js Tài liệu tham khảo Andrepolischuk Github.com Ví dụ",
      "image": "hinh360.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 5,
      "title": "Jquery Tự Động Canh Nút Backtop Với Footer Khi Sử Dụng Position Fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-tu-dong-canh-nut-backtop-voi-footer-khi-su-dung-position-fixed/",
      "date": "2024/10/23",
      "description": "Code Jquery Trong đó $(‘.div_backtop’) là nút backtop $(‘footer’) là footer mà mình muốn nút backtop đi theo Ví dụ",
      "image": "backtopjquery.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 4,
      "title": "Hướng dẫn nén và giải nén trên FTP",
      "link": "https://1tomy.com/2024/10/23/huong-dan-nen-va-giai-nen-tren-filezila/",
      "date": "2024/10/23",
      "description": "Hướng dẫn",
      "image": "giainenftp.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 3,
      "title": "Jquery tự động cho chiều cao header khi sử dụng position fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-tu-dong-cho-chieu-cao-header-khi-su-dung-position-fixed/",
      "date": "2024/10/23",
      "description": "Code Jquery $(“header”).height($(“.header_class”).outerHeight() + 1); Trong đó header là div cần dùng để tự canh chiều cao Class “.header_class” chứa header fixed Ví dụ",
      "image": "heighheaderjquery.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 2,
      "title": "Scroll content popup bootstrap với jquery",
      "link": "https://1tomy.com/2024/10/23/scroll-content-popup-bootstrap-voi-jquery/",
      "date": "2024/10/23",
      "description": "Các bước thao tác Thêm Link CSS và jquery Bootstrap popup Thêm html Link khi nhấn sẽ scroll với nội dung Thêm html tạo popup bootstrap Thêm Jquery để nhấn vào chạy nội dung Ví dụ",
      "image": "scrollcontenpopup.webp",
      "author": "Tô Mỳ Tôm"
    },
    {
      "id": 1,
      "title": "Thay hình bằng Jquery khi vào Smartphone",
      "link": "https://1tomy.com/2024/10/22/thay-hinh-bang-jquery-khi-vao-smartphone/",
      "date": "2024/10/22",
      "description": "Code html Ví dụ với code html như bên dưới, chúng ta thêm class “sp_img” để có thể xác định hình nào cần thao tác. Code jquery Thêm code jquery như bên dưới, khi màn hình hiển thị nhỏ hơn 767px thì tự động tìm các tab html có class “sp_img” và thay attr src […]",
      "image": "imagespjquery.webp",
      "author": "Tô Mỳ Tôm"
    },
];

export default function Blogs() {

  // Fetch RSS feed and set state here
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Chỉ lấy data static 
  const fetchRSS = async (pageNum: number) => {
    try {
      // delay giả lập tải dữ liệu
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Giả lập phân trang với dữ liệu tĩnh
      const itemsPerPage = 4;
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = staticBlogItems.slice(startIndex, endIndex);
      setPosts((prev) => [...prev, ...newItems]);

      // Kiểm tra nếu đã load hết dữ liệu

      if (endIndex >= staticBlogItems.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu Blog:", error);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  // Lần đầu load trang
  useEffect(() => {
    fetchRSS(1);
  }, []);

  // Khi scroll tới cuối (IntersectionObserver)
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasMore, loading]);

  // Khi `page` tăng thì load thêm dữ liệu
  useEffect(() => {
    if (page > 1) {
      console.log('Loading more blog items, page:', page);
      setLoadingMore(true);
      fetchRSS(page);
    }
  }, [page]);

  return (
    <div  id="swup" className="transition-fade">
        <section className="blogs">

        <h1 className="heading"> <span>my</span> blogs </h1>

        <div className="box-container">
            {/* RSS Feed Items */}
            {loading ? (
                <><Skeleton /><Skeleton /></>
            ) : (
                posts.map((item) => (
                  <div className="box" key={item.id} >
                    <div className="image">
                      <Image 
                          width={380} 
                          height={300} 
                          className="lazy" 
                          src={item.image ? `./images/blogs/${item.image}` : './images/blogs/default-blog.png'} 
                          alt={item.title}
                          onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = './images/blogs/default-blog.png';
                          }}
                      />
                    </div>
                    <div className="content">
                      <div className="icons">
                        <a href="#"> <FontAwesomeIcon icon={faCalendar} /> {item.date} </a>
                        <a href="#"> <FontAwesomeIcon icon={faUser} /> by {item.author} </a>
                      </div>
                      <h3>{item.title}</h3>
                      <p style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{item.description}</p>
                      <a href={item.link} target='_blank' className="btn" style={{margin: '0 auto'}}> read more <i><FontAwesomeIcon icon={faLink} /></i></a>
                    </div>
                  </div>
                ))
            )}

            {hasMore && (
              <>
              {loadingMore ? <Skeleton /> : ''}
              <div ref={loaderRef} style={{ opacity: 0 }}></div>
              </>
            )}
        </div>

        {!hasMore && <p style={{ textAlign: 'center', color: 'white', marginTop: '1rem' }}>Đã load hết dữ liệu.</p>}
    </section>
    </div>
  );
}
