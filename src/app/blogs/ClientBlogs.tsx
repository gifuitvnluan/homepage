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
  blurImage?: string;
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
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/Ai5RYf9GY2//VHmG/1B5iP9Reor/SnB//0xsev87XWz/AhwVEAA5MSoAXlFNAO7e2wD47OYAEQ8QADo0MQBEPDcAAgIGBgDy/wYA7PL0ABEZGQATFRkAHB4YAAcHBwDW298AAv4FCQD0AQcA4uPUACQZCAAZDfoAEwXpAOH19wASGBMAAhsYGgAiEAsA8/EDAPwCFAAFDR8A4+UEAB4NCgD39vkAAAAA//+YCiTEAAAABklEQVQDACCuNSklNe7gAAAAAElFTkSuQmCC"
    },
    {
      "id": 12,
      "title": "Hướng dẫn cài đặt và cấu hình Redis Cache trên aaPanel",
      "link": "https://1tomy.com/2024/12/14/huong-dan-cai-dat-va-cau-hinh-redis-cache-tren-aapanel/",
      "date": "2024/12/14",
      "description": "Các bước thực hiện Bước 1: Cài đặt cấu hình Redis trên aaPanel Sau khi bạn đã cài đặt control aaPanel, bạn đăng nhập vào sau đó chọn App Store =\u003E Nhập tên Redis sau đó click Install Bạn click chọn confirm để xác nhận cài đặt. Tiếp đến bạn mở Cấu hình Redis đã cài hoàn tất lên và cấu hình […]",
      "image": "rediscacheaapanel.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/AkVAM/8/Nyr/UVkw/0hhVf86YF//XWRL/0E5Jv9DNiL/AgEZ8wAqPxkACw8JADInGgAnNUgADRUJAC44JgAzRTQAAvbtEgD2/AwAJTMdABwUDAAIDAcAMDIwAPv8DwDTxdwAAgP38AAS4ecAIcrxAAAB/gAhJREA0O8nABchIgAQDwMAAjD+BwAE+wIA2RAEAMjqFADVxuIABtucAN/n9gD/MmsAAAAA//9n3FFyAAAABklEQVQDAChVMv2X79o0AAAAAElFTkSuQmCC"
    },
    {
      "id": 11,
      "title": "Hướng dẫn sử dụng Filezilla Server để tạo FTP",
      "link": "https://1tomy.com/2024/11/07/huong-dan-su-dung-filezilla-server-de-tao-ftp/",
      "date": "2024/11/7",
      "description": "FileZilla Server là một phần mềm miễn phí, dễ sử dụng, giúp bạn thiết lập một máy chủ FTP (File Transfer Protocol) cá nhân một cách nhanh chóng. FTP cho phép bạn truyền tải các tập tin giữa máy tính của bạn và một máy tính khác thông qua mạng. Bài viết này sẽ hướng […]",
      "image": "filezillaftp.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+AmBvcf9ET07/OEM//32Kjv+apqz/XW1w/3N+gP+dp6//Avv/AAACGyoAFxYfAMrN0QCztLUAzsbFAMLBwAAjJioAAv39/gDy7OoA9gYPAPgbKgD5KT0ARmh6ADVFUAD1+fgAAuXa1gAC//8ACiApAPsbJAD6HSEAx+n1ANXh5ACxvLcAAgcMDQABAgIAB/fwABbu4wDqw7wA88OxAAbm2gDo2ccAAgoIBgAO/OwABfHgACsN+gBxRTIAjnt1AHt8ggD47vEAAiAjJgAqKigAEgsHAA8ODwD1AAcA3+TiAOPp5wAuLDAAAuPZ0gDu5eMA2dbVANLNygDZ1c0A0NrcAMnY2wDk/wsAAAAA///4tJlYAAAABklEQVQDAFS4cLIzEPdlAAAAAElFTkSuQmCC"
    },
    {
      "id": 10,
      "title": "Một số link hay dùng cho front end và back end",
      "link": "https://1tomy.com/2024/10/25/mot-so-link-hay-dung-cho-front-end-va-back-end/",
      "date": "2024/10/25",
      "description": "Bài viết tổng hợp các link hay dùng để code web dễ hơn. Thao tác với hình ảnh Thao tác với CSS Thao tác với WordPress Thao tác với Javascript Thao tác với HTML Thao tác với giao diện Trang download Thao tác với mail Giả lập Thao tác với SQL Web cá nhân",
      "image": "linkhay.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": ""
    },
    {
      "id": 9,
      "title": "Hướng dẫn tạo kết nối PHP với MySQL",
      "link": "https://1tomy.com/2024/10/24/huong-dan-tao-ket-noi-php-voi-mysql/",
      "date": "2024/10/24",
      "description": "Tạo file databaseconnect.php Khai báo các biến để cần để kết nối Check thử có kết nối thành công hay không Set để có thể sử dụng utf8 cho SQL Tạo bảng dữ liệu SQL Đóng kết nối với SQL khi đã thao tác xong",
      "image": "phpmysql.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+Am+Ijv/Azsr/1t7X/9ri2v/c4Nf/1t3U/8TRzP90m6T/AkMyJgCinqkAk6CxAI2iuACEm7IAi5WoAJaSnQAlFg8AAvMECwDY3+YA2ebvAOHw+ADi8PcA5vD4AOjt9AAB/v4AAurt8AD/BAYACAoLAAoJCQADBAUAAP8AAAEBAADz+PoAAtTV3gD99fIA697aAOnY1ADt3NgA8ejjAPTu6wD9+foAAvHp5wB1eGsAdnFjAE5IOwBOTEAAU2FZADhUVgDM0dkAAgcPEQD59/kAIBQNAP4BAgAJBwgARCsfACMTDgAnIBkAAgH//wDZ5eoAqL3LANfi6QDW4+gAprrIAM7c4QDY4ecAAAAA//8HDAmpAAAABklEQVQDANSMe9MkaoQXAAAAAElFTkSuQmCC"
    },
    {
      "id": 8,
      "title": "Giới thiệu tool sử dụng AI để chuyển ngôn ngữ của người thành ngôn ngữ SQL",
      "link": "https://1tomy.com/2024/10/23/gioi-thieu-tool-su-dung-ai-de-chuyen-ngon-ngu-cua-nguoi-thanh-ngon-ngu-sql/",
      "date": "2024/10/23",
      "description": "Giới thiệu Tool sử dụng AI để chuyển ngôn ngữ của người thành ngôn ngữ SQL (Có thể nhập Tiếng Việt). Thông tin tham khảo Github.com Sqltranslate",
      "image": "aitosql.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABBklEQVR4AQzOP0sCYQDA4V8vcmdZ3WmeCVryql3Q3+HsAzREYh+gpa0lKAqipamgvkEfpKnBNrfAihSCKHKxJRvPTrrz7s39GR7h7B6qrYNzVT2+VDun16p6cqW2jy7U5v6ZWqrtKVEqSWTZxi7kyKdNKovzODJLQRaxy0XEdGKc9+YTctZio5BhLZ9hfUGip9LEEgYipsfRJhKszlmYKQvDSDLwfSaTMwhNRwxCReC5BP4fbtxgLAqIwpBgOCRSIH5dDy8SNNqftJ5b1JuvPL518L466GIEer0fpKHovjToPtyR9ns4ORMna1KrLI8OUyaaXaGfKuFbNuRXaPc16h/f3Nze8w8AAP//CWEfMwAAAAZJREFUAwA9j1cl4LQIewAAAABJRU5ErkJggg=="
    },
    {
      "id": 7,
      "title": "Hướng dẫn tạo chức năng so sánh hình bằng Jquery",
      "link": "https://1tomy.com/2024/10/23/huong-dan-tao-chuc-nang-so-sanh-hinh-bang-jquery/",
      "date": "2024/10/23",
      "description": "Hướng dẫn Tạo chức năng so sánh hình ảnh Ví dụ",
      "image": "sosanhanhjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDUlEQVR4AQzOXStDYQDA8X/P1mJybA5rnYmhplHaBYkLyXLLnS/iE/gErkVebnBDVlbKLpbSNlsTW7ZcaEdsprXszclZnYdv8BNbewdy+/BY7pyeyN3Lc3l0FZH7kQsZT8XlQz4pReNNp/BU4D6dI5V5ptXsYLQNcq8Vzq7vEDa7Ha/Px9Con9W1FSyngnNQZUTzsBCaQXw3DapfNUr6O9FYgh6ri+iaDLsU6q02oldRaJsmls2GYUkCYz7GvSr5UoVyrYyY1FS0fgdBTx+O5ifRmzix9CN6See3YyGmvC42wovMT08Q9GtoqsL60iyb4TmWQwFEo/VDNvfCR7XOgNvNP5vbTJ5ktkgiW+QPAAD//0E/CRUAAAAGSURBVAMAp5hvG/3eHR4AAAAASUVORK5CYII="
    },
    {
      "id": 6,
      "title": "Tạo Hình 360° bằng JS",
      "link": "https://1tomy.com/2024/10/23/tao-hinh-360-bang-js/",
      "date": "2024/10/23",
      "description": "Hướng dẫn Hướng dẫn làm hình 360° bằng js Tài liệu tham khảo Andrepolischuk Github.com Ví dụ",
      "image": "hinh360.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+Al1jX/9VWlj/gYJ8/5aXkP+3t67/q62n/52kn/9bamn/AiEfHgDw9fgAssbSAKvP5ACcvtMArLzGANbU1QAeFBEAAh4aGAALEBEAJyoqADExMAA9Mi0AUExMAPD2+wAYFRMAAu/x8QD18vEA//z9AB4SDgC2xs4A6fL1APr59wAqLC4AAgQFBQD5+foA19fXAKaqrQAxIRoA6ejpAOzx8wDZ2toAAuvt8AA5MSwAW0o/AHFVRQAuGxAALx4QAGtgVwDGysIAAubk4gD+DxcA4+TlAPHx8ADd3NsA2tjYANPQ0QAfFxsAAgAQGQDz6eMA4+fpALnBxAATFBMAJSUlABUWFwD1+wAAAAAA//90bi++AAAABklEQVQDAGUAcIR/cFKQAAAAAElFTkSuQmCC"
    },
    {
      "id": 5,
      "title": "Jquery Tự Động Canh Nút Backtop Với Footer Khi Sử Dụng Position Fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-tu-dong-canh-nut-backtop-voi-footer-khi-su-dung-position-fixed/",
      "date": "2024/10/23",
      "description": "Code Jquery Trong đó $(‘.div_backtop’) là nút backtop $(‘footer’) là footer mà mình muốn nút backtop đi theo Ví dụ",
      "image": "backtopjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDElEQVR4AQzDPUsCYQDA8b/PIWaDVihFEgQhDaFEEDS6VFu09QmCROwTNBUEDS1NDuEYJZINtbW0CAmBFKUG5Rtn0J15dt1VqPfU8BO1+2uZTR/K3PG+vEgfyExqV54c7cjT1J7c3FiTIp+/4+zqhsviO9nbOueFJrl/mYLKSDCI6LsE05EFlrfirCS3icUTrCaSKJqG3WsjmrUGpq7h9vvQR8cpfjlItwcpHfrCQrgVBeP7h2Gzy8RbnXnHwucaIIWLSX8YERjz8mEPKD9W6L6+QEen9FDm07CZDYcQniEvPtuk01CpVVuUnqo0K3UM65dK8RnRVlssRkLMBRyiAYgGYWlKYT02g1fp8QcAAP//NUND0wAAAAZJREFUAwASmXTT6jlImQAAAABJRU5ErkJggg=="
    },
    {
      "id": 4,
      "title": "Hướng dẫn nén và giải nén trên FTP",
      "link": "https://1tomy.com/2024/10/23/huong-dan-nen-va-giai-nen-tren-filezila/",
      "date": "2024/10/23",
      "description": "Hướng dẫn",
      "image": "giainenftp.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA+ElEQVR4AQzKu0rDUACA4f+cQ3pJi6EtIk4OPoa7roqjg26+g6NPIU4iiA6pIlWpiHTUzUUIFOsliBGCeGlMTkKa00w//Hxy78g1B27PnJz3Tffq1pz1B8a9vDGH3Quzf3xqZK1apeU4PGobIQRRnDD0Qxp2k3qthqyXwFKSRduQpDlKKhbmOzTtCvVqCYSqEEQ5d08h1w+v9O6HDEZjvI8/hLKQQsAkSwGBpIBiQlLGEgVSGMqX01AF7/4bzy8+QfDJyPNoWoI8z5CxTmm3HNZWltjcWGVne53drWVm2zPotARJmhJ+/9IhZk5laK2J/hO+fsbEOmMKAAD//9swez4AAAAGSURBVAMAh1tsplD4BssAAAAASUVORK5CYII="
    },
    {
      "id": 3,
      "title": "Jquery tự động cho chiều cao header khi sử dụng position fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-tu-dong-cho-chieu-cao-header-khi-su-dung-position-fixed/",
      "date": "2024/10/23",
      "description": "Code Jquery $(“header”).height($(“.header_class”).outerHeight() + 1); Trong đó header là div cần dùng để tự canh chiều cao Class “.header_class” chứa header fixed Ví dụ",
      "image": "heighheaderjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCElEQVR4AQzNu0rDYABA4cPfBFLRSoraJKbWS2spKggdhIqLj+HqooiLeAMFQaSLDgrdHHwWFUVwdXBTtKh4oUmJTRPa/M18OHziYG1F1k725NVFVV6eHsna8bY8P9yUZ/vrsrq1KoU1ZjNRLJErzVEoV5itLDM1v4A5OU3GthCGYaIlNbphiPv7jd8O+GmGOK6Hnh5CZCybKJL8xdF1G3zU37DSfaT6kwyk0ohh0yaRACkjwrCDpioEQRtFVclYMaElFV6eH7EMg2Ihj64P0ulGeE2H0HcQn/VXRsw8TqNBq/XPV/09Hp64u77h/vYBoWo6ucIM2fEcSkz5vsdoNsvGzi7lxSV6AAAA//9BCQFYAAAABklEQVQDAAXkYQK9v9jqAAAAAElFTkSuQmCC"
    },
    {
      "id": 2,
      "title": "Scroll content popup bootstrap với jquery",
      "link": "https://1tomy.com/2024/10/23/scroll-content-popup-bootstrap-voi-jquery/",
      "date": "2024/10/23",
      "description": "Các bước thao tác Thêm Link CSS và jquery Bootstrap popup Thêm html Link khi nhấn sẽ scroll với nội dung Thêm html tạo popup bootstrap Thêm Jquery để nhấn vào chạy nội dung Ví dụ",
      "image": "scrollcontenpopup.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDUlEQVR4AQzFO0tCYQCA4devk5mSKEURmCUtXRwMCUqjTAgDI5qUVueW9mjpTxTdRKTJMWgSBKMs8UDgkBBdUAvKiBRLPeCn8MAjsncJmU6eyPvcUfdjeXiwI3e3/TK86pSbK24p6rJMqfJJ5rbATSbP88cPv5pg2DHN6KABUXp/pK6MkVMroB9icT2ILxRhZjmA1tNAaGUjFqWX1n8V44CZvJrFPjGO3W5jZEqHeEimqFdrBIIbmK0WnPNLKAK6sLUnEY7ZOZrNBiaLlaboo61TeHp5o1gs4vV6EAu+NfStP9R0iuurS6Kn58TO4sRjF0TjCYRaeEUx9OP3uIkEXOyHnOxtOQi7THx/1egAAAD//0S/GQgAAAAGSURBVAMASmFjauhpwgIAAAAASUVORK5CYII="
    },
    {
      "id": 1,
      "title": "Thay hình bằng Jquery khi vào Smartphone",
      "link": "https://1tomy.com/2024/10/22/thay-hinh-bang-jquery-khi-vao-smartphone/",
      "date": "2024/10/22",
      "description": "Code html Ví dụ với code html như bên dưới, chúng ta thêm class “sp_img” để có thể xác định hình nào cần thao tác. Code jquery Thêm code jquery như bên dưới, khi màn hình hiển thị nhỏ hơn 767px thì tự động tìm các tab html có class “sp_img” và thay attr src […]",
      "image": "imagespjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+AklZWf/TvI//m4xw/3FpWP9vbGH/opZ+/9TGpP/Lw6b/At3h6AB9ocsAwdHjABYVDwA8MBwA8PoBAMve8ACjuM4AAk/18wAO1t4A6+73ANTn+gDG6QYA0+XzALHD1AC8xtUAAgj8+wBQDP8AXgDwAIRELQBgQCYAD/z5ABbj5QBgBwIAAs4AAACq7PkA3RIbAL7t+gCzrLYA8ezeADD29QD23+MAAhcFBQBFLCIA4OviANzXtQDm8ckAAQP5ABEhFwAZBgUAAvP/+gDHAPoA6/74AMTZ6QDU5f4A//sDAPwnHgCYDP8AAtwPAgDq+PEA8vQDABwDHAAD6gcAKBkiAP78+QD/Bf4AAAAA//+72qDOAAAABklEQVQDAAsQeUtithW4AAAAAElFTkSuQmCC"
    },
];

export default function Blogs() {

  // Fetch RSS feed and set state here
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Chỉ lấy data static 
  const fetchRSS = async (pageNum: number) => {
    try {
      // delay giả lập tải dữ liệu
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Giả lập phân trang với dữ liệu tĩnh
      const itemsPerPage = 10;
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
      fetchRSS(page);
    }
  }, [page]);

  return (
      <section className="blogs">
        <h1 className="heading"> <span>my</span> blogs </h1>
        <div className="box-container">
            {/* RSS Feed Items */}
            {loading ? (
                <><Skeleton /><Skeleton /><Skeleton /></>
            ) : (
                posts.map((item) => (
                  <div className="box" key={item.id} >
                    <div className="image">
                      <Image 
                          width={380} 
                          height={300} 
                          className="lazy"
                          src={item.image ? `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/blogs/${item.image}` : `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/blogs/default-blog.png`} 
                          alt={item.title}
                          placeholder="blur"
                          blurDataURL={item.blurImage ? item.blurImage : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA0klEQVR4ASyNO2sCURCFv0wwYAhZ3SgxBCGkSBVNwNJSsLL3r1rZaWUlguITRVBUFvGxrrru9e7VYZ7nzMwRYmllwkqrqP2t0DWcI/EvgwsKyGQp2H+UEnny8SzlVJGindMEiMmDPrVNj/rjnq64VJwG1XXLUMKDrq7LW/KJ988VmZTHcyzg4LuE30XTxi+//6wiFp5v8ZH8wRzCXUI3886YydmmKQlay4W51vB94dXSwAVx5njHJco/IdEXwi83ie0GZlOCYRt/1ObszAi8HaFdAQAA//+IiKRcAAAABklEQVQDAA6BSnoMDFJHAAAAAElFTkSuQmCC'}
                          onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/blogs/default-blog.png`;
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
                <div ref={loaderRef} className="box loading-bg">
                  <div className="image skeleton loading" style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} />
                  <div className="content">
                    <h3 style={{ marginBottom: '1rem' }}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h3>
                    <p className="skeleton loading" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '1rem'}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <a href="#" className="btn skeleton loading" style={{margin: '0 auto'}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a>
                  </div>
                </div>
              </>
            )}
        </div>

        {!hasMore && <p style={{ textAlign: 'center', color: 'white', marginTop: '3rem' }}>Đã load hết dữ liệu.</p>}
    </section>
  );
}
