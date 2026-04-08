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
      "id": 18,
      "title": "Giới thiệu và hướng dẫn cài Agent DVR chi tiết từ A-Z",
      "link": "https://1tomy.com/2026/04/08/gioi-thieu-va-huong-dan-cai-agent-dvr/",
      "date": "2026/04/08",
      "description": "Tìm hiểu về Agent DVR là gì và cách cài đặt Agent DVR chi tiết từng bước trên Windows, Linux. Hướng dẫn đầy đủ, dễ hiểu cho người mới bắt đầu.",
      "image": "agent-dvr.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAn0lEQVR4AQSASQsBYRiAn76i1FhGoTSWk50icRIlF+Un+OEOyMUyY5kZfZixvFJGbSJGbSyp6kjMUleSVkcynalY06VYvZmoiFJEwxfFQpH5Ys5g2KdRyjFr5qm3W6hEzCBTbiP6ymm9IvRufPUDe7tBuxeUe7Px7R3Pj+AFAT/lIly5vzWhf0CRzuL5F47OGcfZY8Z90klNzjxRKTj8AQAA///vsYNaAAAABklEQVQDAKVKRDwKoHzJAAAAAElFTkSuQmCC"
    },
  {
      "id": 17,
      "title": "Hướng Dẫn Sử Dụng MP4Box Chi Tiết Từ A–Z (Cắt, Ghép, Tách Video MP4)",
      "link": "https://1tomy.com/2026/03/10/huong-dan-su-dung-mp4box/",
      "date": "2026/03/10",
      "description": "Hướng dẫn sử dụng MP4Box chi tiết cho người mới: cách cắt video, ghép video, tách audio, subtitle và tối ưu file MP4 nhanh chóng bằng dòng lệnh.",
      "image": "mp4box.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+Akw/Qf81FBb/QDg8/x8gJf8WFhn/EhIS/xAQEP8QEBD/Ain93gANKi0AipOQAJ+dmACtrKkAsrKyAMfHxwC+vr4AArzh6wDk29EAbVxUAGtoagBGR0sAQUFBACkpKQAyMjIAAuD4/gBjTzIAe1I9AF02FwAfHh8AHB4hABgYGwAXGBsAAndBIgAjIAsA5fjxABwcHACip6sAc3qEAAUFAwD2+PIAAuv4DAD97gIADPHnAPXp4QCfuNoAw9bwAPr7/AABAAIAAr/X7gC3zuIAze0EAKnR7gCdf1cArZFqAOvq6ADz8fIAAvHx9QC92O4AtdXwAOf1AQAeHyAAGxsbABgYGAD///8AAAAA//9zqx1mAAAABklEQVQDAO0MZLvGT89IAAAAAElFTkSuQmCC"
    },
  {
      "id": 16,
      "title": "Hướng dẫn cách lấy lại mật khẩu Windows 10/11 và đăng nhập nếu quên mật khẩu",
      "link": "https://1tomy.com/2026/02/02/huong-dan-cach-lay-lai-mat-khau-windows/",
      "date": "2026/02/02",
      "description": "Hướng dẫn chi tiết cách lấy lại mật khẩu Windows 10, Windows 11 khi bị quên, không mất dữ liệu, ai cũng làm được tại nhà.",
      "image": "password.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAA0klEQVR4AQDGADn/AiAkXP8qNnr/UoLT/02N5v9YYdn/Z0mq/0s2eP83M2X/AgkMDgAQAw8A/8rjAADY1gAZEOkASx0ZADoiWAAbFT8AAgkNFQD9CRgA+AEIAPXXxgDq07gAy+/uAPsLBAA7JikAAg0ZJwAdJjIAEhYEAPb/9ADc8O8AyuXRAOrsxQAcFA4AAhImMQAMAgcA+vnmACo1KAAwPDIAPzcdAPwaIADi+AoAAhUMDQD18OgA8+rZABEOBAAlNjIAHis9AAgSIADw8fUAAAAA//9787ZJAAAABklEQVQDANIgQoez4WeYAAAAAElFTkSuQmCC"
    },
  {
      "id": 15,
      "title": "Hướng dẫn setup remote sử dụng GPU thật (không GPU ảo)",
      "link": "https://1tomy.com/2026/01/15/setup-remote-su-dung-gpu-that/",
      "date": "2026/01/15",
      "description": "Hướng dẫn chi tiết cách setup máy remote để sử dụng GPU thật khi remote. Không tạo GPU ảo, không passthrough, hiệu năng tối đa.",
      "image": "remoteGPU.png",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCUlEQVR4ARTHTy+CcQDA8W+/5+n3qIkO3TAObFykCVPWOjjxSrwEvQHk38HRwUw91XJj2tgc3GwWFwwbG7VnzSiGWnn6eRy+++4jMpmsSqdNp4wyzaz6dyplOjZVLptTYq9Q5P1HoRmdSK/fuQ/b5SZ/fMXu/ini09VFeDJMLDJGLBoiHg0Snxkn0NNP8fYRUW/rSCnxeLwYsgNNN3DrGr+Gh4YuEQ1bcHZX46hY5vDiicLlCyfXFZ5tSVMaiL7mDTtbKyQWEywvJdlY22Q9ucr9wTb+2gOit1sQDLRYGP1ibmKQqQEfw36F8VGi/mYhhkZCVL9b5M8tytYrpUqVtuYlPjvPdCTGHwAAAP//2ojhbAAAAAZJREFUAwBqhmRipWy17AAAAABJRU5ErkJggg=="
    },
  {
      "id": 14,
      "title": "Tạo schedule trong Laravel – Tự động hóa tác vụ hiệu quả",
      "link": "https://1tomy.com/2025/12/22/tao-schedule-trong-laravel/",
      "date": "2025/12/22",
      "description": "Hướng dẫn tạo schedule trong Laravel giúp tự động hóa tác vụ như chạy cron job, gửi email, xử lý dữ liệu định kỳ hiệu quả.",
      "image": "scheduleLaravel.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAABZklEQVR4ARyPXTMbcRjFf/lvVhLRdqYd1Ta96GibXra9a6c3ZVzhC3DDjBu+luErGEzERli7jJkgQTAkY70MY4jIesnuPpaL38Uz5zxnzlG5XE7y+byYpimWZcvKyqqsLi2JbcyLkcmI0qJRNO0ZnWhU5/mOu3Var85paT6g3MYdxWKJQqFAaauE7wfIuw6C9k9I8hWqJRbDC3z8kM7Or1SrVRbMZczNEvWGizqoHGLb9kvK+OQEGSPL2eUFFeeUtWIZdeScYFkWi6ZJ1jCYzWSZmplhY3uTnf09VK1WI5GIoyeTxJJtBICEtL9tQ/kNlONU8Joe/r1LJJSVpoV9hOurGxK6QjXqdUQCWt+8pvnoQSAE4ZLDygmF9V1UuVwmosdfPkJnKIYGT/jwvoNbt4nq6frPl1SKH+k0v3/+or+3j57ubv78/cfg4ABqaHiE0bFRPn9Mkf72nYgIztExOWOB6dk5ngAAAP//sPXzFQAAAAZJREFUAwCxl7RK/VAv1gAAAABJRU5ErkJggg=="
    },
  {
      "id": 13,
      "title": "Hướng dẫn cài đặt Xdebug PHP để debug lỗi",
      "link": "https://1tomy.com/2024/12/17/huong-dan-cai-dat-xdebug-php-de-debug-loi/",
      "date": "2024/12/17",
      "description": "Cài đặt Xdebug PHP là bước quan trọng giúp lập trình viên debug lỗi một cách chi tiết và chính xác hơn so với việc dùng dd() hay var_dump().Trong bài...",
      "image": "xdebugdebugerrors.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/Ai5RYf9GY2//VHmG/1B5iP9Reor/SnB//0xsev87XWz/AhwVEAA5MSoAXlFNAO7e2wD47OYAEQ8QADo0MQBEPDcAAgIGBgDy/wYA7PL0ABEZGQATFRkAHB4YAAcHBwDW298AAv4FCQD0AQcA4uPUACQZCAAZDfoAEwXpAOH19wASGBMAAhsYGgAiEAsA8/EDAPwCFAAFDR8A4+UEAB4NCgD39vkAAAAA//+YCiTEAAAABklEQVQDACCuNSklNe7gAAAAAElFTkSuQmCC"
    },
    {
      "id": 12,
      "title": "Hướng dẫn cài đặt và cấu hình Redis Cache trên aaPanel",
      "link": "https://1tomy.com/2024/12/14/cai-dat-redis-cache-aapanel/",
      "date": "2024/12/14",
      "description": "Cài đặt Redis Cache aaPanel là giải pháp giúp tăng tốc website, giảm tải MySQL và cải thiện hiệu suất cho PHP, Laravel, WordPress. Trong bài viết này, mình sẽ...",
      "image": "rediscacheaapanel.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/AkVAM/8/Nyr/UVkw/0hhVf86YF//XWRL/0E5Jv9DNiL/AgEZ8wAqPxkACw8JADInGgAnNUgADRUJAC44JgAzRTQAAvbtEgD2/AwAJTMdABwUDAAIDAcAMDIwAPv8DwDTxdwAAgP38AAS4ecAIcrxAAAB/gAhJREA0O8nABchIgAQDwMAAjD+BwAE+wIA2RAEAMjqFADVxuIABtucAN/n9gD/MmsAAAAA//9n3FFyAAAABklEQVQDAChVMv2X79o0AAAAAElFTkSuQmCC"
    },
    {
      "id": 11,
      "title": "Hướng dẫn sử dụng Filezilla Server để tạo FTP",
      "link": "https://1tomy.com/2024/11/07/huong-dan-tao-ftp-bang-filezilla-server/",
      "date": "2024/11/7",
      "description": "FileZilla Server là một phần mềm miễn phí, dễ sử dụng, giúp bạn thiết lập một máy chủ FTP (File Transfer Protocol) cá nhân một cách nhanh chóng. FTP cho...",
      "image": "filezillaftp.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+AmBvcf9ET07/OEM//32Kjv+apqz/XW1w/3N+gP+dp6//Avv/AAACGyoAFxYfAMrN0QCztLUAzsbFAMLBwAAjJioAAv39/gDy7OoA9gYPAPgbKgD5KT0ARmh6ADVFUAD1+fgAAuXa1gAC//8ACiApAPsbJAD6HSEAx+n1ANXh5ACxvLcAAgcMDQABAgIAB/fwABbu4wDqw7wA88OxAAbm2gDo2ccAAgoIBgAO/OwABfHgACsN+gBxRTIAjnt1AHt8ggD47vEAAiAjJgAqKigAEgsHAA8ODwD1AAcA3+TiAOPp5wAuLDAAAuPZ0gDu5eMA2dbVANLNygDZ1c0A0NrcAMnY2wDk/wsAAAAA///4tJlYAAAABklEQVQDAFS4cLIzEPdlAAAAAElFTkSuQmCC"
    },
    {
      "id": 10,
      "title": "Một số link hay dùng cho front end và back end",
      "link": "https://1tomy.com/2024/10/25/link-hay-dung-cho-front-end-va-back-end/",
      "date": "2024/10/25",
      "description": "Link hữu ích cho front end và back end là những tài nguyên không thể thiếu giúp lập trình viên học nhanh hơn, code hiệu quả hơn và tiết kiệm...",
      "image": "linkhay.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": ""
    },
    {
      "id": 9,
      "title": "Hướng dẫn tạo kết nối PHP với MySQL",
      "link": "https://1tomy.com/2024/10/24/huong-dan-tao-ket-noi-php-voi-mysql/",
      "date": "2024/10/24",
      "description": "Kết nối PHP với MySQL là kiến thức nền tảng bắt buộc đối với bất kỳ lập trình viên web nào khi xây dựng website động. Trong bài viết này,...",
      "image": "phpmysql.jpg",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+Am+Ijv/Azsr/1t7X/9ri2v/c4Nf/1t3U/8TRzP90m6T/AkMyJgCinqkAk6CxAI2iuACEm7IAi5WoAJaSnQAlFg8AAvMECwDY3+YA2ebvAOHw+ADi8PcA5vD4AOjt9AAB/v4AAurt8AD/BAYACAoLAAoJCQADBAUAAP8AAAEBAADz+PoAAtTV3gD99fIA697aAOnY1ADt3NgA8ejjAPTu6wD9+foAAvHp5wB1eGsAdnFjAE5IOwBOTEAAU2FZADhUVgDM0dkAAgcPEQD59/kAIBQNAP4BAgAJBwgARCsfACMTDgAnIBkAAgH//wDZ5eoAqL3LANfi6QDW4+gAprrIAM7c4QDY4ecAAAAA//8HDAmpAAAABklEQVQDANSMe9MkaoQXAAAAAElFTkSuQmCC"
    },
    {
      "id": 8,
      "title": "AI chuyển ngôn ngữ sang SQL – Công cụ tạo truy vấn tự động",
      "link": "https://1tomy.com/2024/10/23/tool-su-dung-ai-chuyen-ngon-ngu-sang-sql/",
      "date": "2024/10/23",
      "description": "AI chuyển ngôn ngữ sang SQL là gì? AI chuyển ngôn ngữ sang SQL là giải pháp giúp người dùng tạo câu truy vấn cơ sở dữ liệu mà không...",
      "image": "aitosql.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABBklEQVR4AQzOP0sCYQDA4V8vcmdZ3WmeCVryql3Q3+HsAzREYh+gpa0lKAqipamgvkEfpKnBNrfAihSCKHKxJRvPTrrz7s39GR7h7B6qrYNzVT2+VDun16p6cqW2jy7U5v6ZWqrtKVEqSWTZxi7kyKdNKovzODJLQRaxy0XEdGKc9+YTctZio5BhLZ9hfUGip9LEEgYipsfRJhKszlmYKQvDSDLwfSaTMwhNRwxCReC5BP4fbtxgLAqIwpBgOCRSIH5dDy8SNNqftJ5b1JuvPL518L466GIEer0fpKHovjToPtyR9ns4ORMna1KrLI8OUyaaXaGfKuFbNuRXaPc16h/f3Nze8w8AAP//CWEfMwAAAAZJREFUAwA9j1cl4LQIewAAAABJRU5ErkJggg=="
    },
    {
      "id": 7,
      "title": "So sánh hình ảnh bằng jQuery – hướng dẫn tạo hiệu ứng",
      "link": "https://1tomy.com/2024/10/23/so-sanh-hinh-anh-bang-jquery/",
      "date": "2024/10/23",
      "description": "So sánh hình ảnh bằng jQuery là kỹ thuật thường được dùng để tạo hiệu ứng before/after, giúp người dùng dễ dàng nhìn thấy sự khác biệt giữa hai hình...",
      "image": "sosanhanhjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDUlEQVR4AQzOXStDYQDA8X/P1mJybA5rnYmhplHaBYkLyXLLnS/iE/gErkVebnBDVlbKLpbSNlsTW7ZcaEdsprXszclZnYdv8BNbewdy+/BY7pyeyN3Lc3l0FZH7kQsZT8XlQz4pReNNp/BU4D6dI5V5ptXsYLQNcq8Vzq7vEDa7Ha/Px9Con9W1FSyngnNQZUTzsBCaQXw3DapfNUr6O9FYgh6ri+iaDLsU6q02oldRaJsmls2GYUkCYz7GvSr5UoVyrYyY1FS0fgdBTx+O5ifRmzix9CN6See3YyGmvC42wovMT08Q9GtoqsL60iyb4TmWQwFEo/VDNvfCR7XOgNvNP5vbTJ5ktkgiW+QPAAD//0E/CRUAAAAGSURBVAMAp5hvG/3eHR4AAAAASUVORK5CYII="
    },
    {
      "id": 6,
      "title": "Tạo hình 360 bằng JavaScript – Hiển thị ảnh xoay 360° trên websiteTạo Hình 360° bằng JS",
      "link": "https://1tomy.com/2024/10/23/tao-hinh-360-bang-js/",
      "date": "2024/10/23",
      "description": "Tạo hình 360 bằng JavaScript là kỹ thuật giúp hiển thị hình ảnh xoay 360 độ trực quan ngay trên website.Giải pháp này thường được sử dụng để giới thiệu...",
      "image": "hinh360.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+Al1jX/9VWlj/gYJ8/5aXkP+3t67/q62n/52kn/9bamn/AiEfHgDw9fgAssbSAKvP5ACcvtMArLzGANbU1QAeFBEAAh4aGAALEBEAJyoqADExMAA9Mi0AUExMAPD2+wAYFRMAAu/x8QD18vEA//z9AB4SDgC2xs4A6fL1APr59wAqLC4AAgQFBQD5+foA19fXAKaqrQAxIRoA6ejpAOzx8wDZ2toAAuvt8AA5MSwAW0o/AHFVRQAuGxAALx4QAGtgVwDGysIAAubk4gD+DxcA4+TlAPHx8ADd3NsA2tjYANPQ0QAfFxsAAgAQGQDz6eMA4+fpALnBxAATFBMAJSUlABUWFwD1+wAAAAAA//90bi++AAAABklEQVQDAGUAcIR/cFKQAAAAAElFTkSuQmCC"
    },
    {
      "id": 5,
      "title": "jQuery canh nút back to top với footer khi dùng position fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-canh-nut-back-to-top-voi-footer/",
      "date": "2024/10/23",
      "description": "jQuery canh nút back to top với footer là giải pháp thường dùng khi thiết kế website.Cách này giúp nút không bị che bởi footer và hiển thị đúng vị...",
      "image": "backtopjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDElEQVR4AQzDPUsCYQDA8b/PIWaDVihFEgQhDaFEEDS6VFu09QmCROwTNBUEDS1NDuEYJZINtbW0CAmBFKUG5Rtn0J15dt1VqPfU8BO1+2uZTR/K3PG+vEgfyExqV54c7cjT1J7c3FiTIp+/4+zqhsviO9nbOueFJrl/mYLKSDCI6LsE05EFlrfirCS3icUTrCaSKJqG3WsjmrUGpq7h9vvQR8cpfjlItwcpHfrCQrgVBeP7h2Gzy8RbnXnHwucaIIWLSX8YERjz8mEPKD9W6L6+QEen9FDm07CZDYcQniEvPtuk01CpVVuUnqo0K3UM65dK8RnRVlssRkLMBRyiAYgGYWlKYT02g1fp8QcAAP//NUND0wAAAAZJREFUAwASmXTT6jlImQAAAABJRU5ErkJggg=="
    },
    {
      "id": 4,
      "title": "Nén và giải nén trên FileZilla – Hướng dẫn chi tiết cho người mới",
      "link": "https://1tomy.com/2024/10/23/nen-va-giai-nen-tren-filezilla/",
      "date": "2024/10/23",
      "description": "Nén và giải nén trên FileZilla là thao tác rất hữu ích khi làm việc với FTP server.Việc này giúp giảm dung lượng file, tăng tốc độ upload và download,...",
      "image": "giainenftp.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA+ElEQVR4AQzKu0rDUACA4f+cQ3pJi6EtIk4OPoa7roqjg26+g6NPIU4iiA6pIlWpiHTUzUUIFOsliBGCeGlMTkKa00w//Hxy78g1B27PnJz3Tffq1pz1B8a9vDGH3Quzf3xqZK1apeU4PGobIQRRnDD0Qxp2k3qthqyXwFKSRduQpDlKKhbmOzTtCvVqCYSqEEQ5d08h1w+v9O6HDEZjvI8/hLKQQsAkSwGBpIBiQlLGEgVSGMqX01AF7/4bzy8+QfDJyPNoWoI8z5CxTmm3HNZWltjcWGVne53drWVm2zPotARJmhJ+/9IhZk5laK2J/hO+fsbEOmMKAAD//9swez4AAAAGSURBVAMAh1tsplD4BssAAAAASUVORK5CYII="
    },
    {
      "id": 3,
      "title": "jQuery tự động tính chiều cao header khi dùng position fixed",
      "link": "https://1tomy.com/2024/10/23/jquery-tu-dong-tinh-chieu-cao-header/",
      "date": "2024/10/23",
      "description": "jQuery tự động tính chiều cao header là giải pháp cần thiết khi sử dụng position fixed trong website.Cách này giúp nội dung bên dưới không bị header che khuất....",
      "image": "heighheaderjquery.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCElEQVR4AQzNu0rDYABA4cPfBFLRSoraJKbWS2spKggdhIqLj+HqooiLeAMFQaSLDgrdHHwWFUVwdXBTtKh4oUmJTRPa/M18OHziYG1F1k725NVFVV6eHsna8bY8P9yUZ/vrsrq1KoU1ZjNRLJErzVEoV5itLDM1v4A5OU3GthCGYaIlNbphiPv7jd8O+GmGOK6Hnh5CZCybKJL8xdF1G3zU37DSfaT6kwyk0ohh0yaRACkjwrCDpioEQRtFVclYMaElFV6eH7EMg2Ihj64P0ulGeE2H0HcQn/VXRsw8TqNBq/XPV/09Hp64u77h/vYBoWo6ucIM2fEcSkz5vsdoNsvGzi7lxSV6AAAA//9BCQFYAAAABklEQVQDAAXkYQK9v9jqAAAAAElFTkSuQmCC"
    },
    {
      "id": 2,
      "title": "Scroll content popup Bootstrap bằng jQuery – Cách làm chi tiết",
      "link": "https://1tomy.com/2024/10/23/scroll-content-popup-bootstrap-bang-jquery/",
      "date": "2024/10/23",
      "description": "Scroll content popup Bootstrap bằng jQuery là giải pháp phổ biến khi cần hiển thị nội dung dài trong modal.Cách làm này giúp popup có thanh cuộn riêng, tránh tràn...",
      "image": "scrollcontenpopup.webp",
      "author": "Tô Mỳ Tôm",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABDUlEQVR4AQzFO0tCYQCA4devk5mSKEURmCUtXRwMCUqjTAgDI5qUVueW9mjpTxTdRKTJMWgSBKMs8UDgkBBdUAvKiBRLPeCn8MAjsncJmU6eyPvcUfdjeXiwI3e3/TK86pSbK24p6rJMqfJJ5rbATSbP88cPv5pg2DHN6KABUXp/pK6MkVMroB9icT2ILxRhZjmA1tNAaGUjFqWX1n8V44CZvJrFPjGO3W5jZEqHeEimqFdrBIIbmK0WnPNLKAK6sLUnEY7ZOZrNBiaLlaboo61TeHp5o1gs4vV6EAu+NfStP9R0iuurS6Kn58TO4sRjF0TjCYRaeEUx9OP3uIkEXOyHnOxtOQi7THx/1egAAAD//0S/GQgAAAAGSURBVAMASmFjauhpwgIAAAAASUVORK5CYII="
    },
    {
      "id": 1,
      "title": "Thay hình bằng jQuery trên smartphone theo kích thước màn hình",
      "link": "https://1tomy.com/2024/10/22/thay-hinh-bang-jquery-tren-smartphone/",
      "date": "2024/10/22",
      "description": "Thay hình bằng jQuery trên smartphone giúp website hiển thị hình ảnh phù hợp với màn hình thiết bị.Giúp tối ưu giao diện, giảm dung lượng tải và cải thiện...",
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
