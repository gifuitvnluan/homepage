"use client"

import { useEffect, useRef, useState } from "react";
import Skeleton from "./loading";
import Image from 'next/image';

interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
  blurImage?: string;
}

// add data static portfolio items here if needed
const staticPortfolioItems: PortfolioItem[] = [
    {
      "id": 27,
      "title": "つやま産業支援センター",
      "link": "https://gifuitvnluan.github.io/10200407_tsuyama-biz.jp20200410",
      "date": "Fri, 25 Oct 2024 03:09:40 +0000",
      "description": "つやま産業支援センター",
      "image": "tsuyama-biz.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ApSKiv+ekpT/p5KY/8a9yP+1qrX/tq+4/5iSlP+0srT/AoB/gQB7eXkAopKIAOjm4ADW1M8AvL+5AJaNjgCTg4oAAv8B/wD7AP8A7vHyAP0A+wAsNjMAJCkzABUSFAAqKSIAAkQ5LQBhW04AKDdBALyrwgDr6PsAIC0sAEdYVwAJExAAAAAA//9jLZTEAAAABklEQVQDAG11OlRku6WfAAAAAElFTkSuQmCC"
    },
    {
      "id": 26,
      "title": "SMILE SLIDE PUZZLE GAME",
      "link": "https://style.suzuki/smilepuzzlegame",
      "date": "Fri, 25 Oct 2024 03:06:45 +0000",
      "description": "ワゴンRスマイルのスライドパズルゲーム！あなたは何秒、何回でクリアできるかな？結果をSNSでシェアして競い合おう！",
      "image": "smilepuzzlegame.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAhElEQVR4ARTLwQoBURhA4TO3xrUQS2tvYe91KHkKmhSPICs7T+EB1Kixliz8XFeTRsw/957t1zFuOVHJxlpkM5XNQv1ura/tXN1qqtFMfb9S+QcnOuyPZ0QKpG7zc0I0Q8i9Sw75jVKepFJhLzl8P0HAKAk9mzLqeoaDPpY/rbAlqkRrAAAA//8HoRJ4AAAABklEQVQDABxeP7UpWu3MAAAAAElFTkSuQmCC"
    },
    {
      "id": 25,
      "title": "FestinaLente",
      "link": "https://gifuitvnluan.github.io/__FL",
      "date": "Fri, 25 Oct 2024 03:05:54 +0000",
      "description": "FestinaLente",
      "image": "fl.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ApVMKv+qb0r/snFG/517Xv+aeFr/rXhN/59iNv+FUib/AgARDAAT7PgAFOsKAAn7AwDDzdgAGub9ACX8FQD7AP0AAv3l8wD3EAwA4gX5AAf95gDt0dIAXrPFAGOzxACXtuAAAuP+HACmy9cAxOfoAL7W6wAABw8AAQMCAPoGBQAkFRMAAAAA//++VZcuAAAABklEQVQDAA54OPpGqIJMAAAAAElFTkSuQmCC"
    },
    {
      "id": 24,
      "title": "株式会社ベスト・ハウジング",
      "link": "https://www.besthousing.co.jp",
      "date": "Fri, 25 Oct 2024 03:04:49 +0000",
      "description": "浜松市で新築分譲住宅・土地をお探しの方はベスト・ハウジングにお任せください！",
      "image": "besthousing.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AnN0gP+Pl5//d36E/3Z0c/+FkqL/jpGU/5iYlv/Ic3n/Avjz7ADlxLAACubQAAjv4wD27OgA6eHgAL3A1ADKq7oAAn5bVwBlIzUAWhswAFwdLwBgBgEAZBAVAIAlGgBLW08AAhY9PAAlfHYAHGVhABdeWQAKaWQAD3RxACaBegAihn0AAAAA//8kqboSAAAABklEQVQDABWKNOwvkQ8xAAAAAElFTkSuQmCC"
    },
    {
      "id": 23,
      "title": "宮崎で占いならネクストグレスへ　伊勢流・陰陽五行四柱推命とパワーストーンのお店",
      "link": "https://nextgress.com",
      "date": "Fri, 25 Oct 2024 03:03:11 +0000",
      "description": "宮崎で占いならネクストグレスへ。伊勢流・陰陽五行四柱推命...",
      "image": "nextgress.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AjQrJP9GNSr/Myon/z4tJf9LMiX/SzYp/z4oHf8YEA7/Avb5/QABBwgAFRMOAP4GCwDq+QIA8vT3AN7s9AD8/v8AAgABAwDt9PwA8PT6APX3+QD4/P8A6fgCAAAGCQAGCg0AApxfQAAsEgcA4eXoAI94MAC/s2YAzMR8AM3U1gDCzbUAAAAA///k8lW5AAAABklEQVQDALdjNqbK//+cAAAAAElFTkSuQmCC"
    },
    {
      "id": 22,
      "title": "「二世帯住宅プランニング | 二世帯住宅の完全分離の間取りや、リノベーションなどでお困りの方」",
      "link": "https://nisetaijyutaku-planning.com",
      "date": "Fri, 25 Oct 2024 03:02:18 +0000",
      "description": "「二世帯住宅プランニング | 二世帯住宅の完全分離の...",
      "image": "nisetaijyutaku-planning.png",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAeUlEQVR4AUyMsQ6CMBQAz7bpqKuDq4mJm3/j3/kpfoQ6sRgHolLAVykkaJ7IxK13OSOvQmMMGp6ZRsm1rkoVqTU1Uf/OMGCNRemYGcfldOB2PdL33WBgDIz1zBdrvPdsNw2r5RnnJkF65xSPjKoU7mFH+uxp2+94+AEAAP//UL8XPQAAAAZJREFUAwBx5jtzPTDPOwAAAABJRU5ErkJggg=="
    },
    {
      "id": 21,
      "title": "式会社厨房サービス",
      "link": "https://www.chubo-s.jp",
      "date": "Fri, 25 Oct 2024 03:01:30 +0000",
      "description": "厨房の設計・施工からメンテナンスまでをトータルでサポートしています。厨房機器単体では無く、お客様の調理形態に合った機器の選定、食材・人の流れを計算したゾーニングプランなど厨房という空間全てについて提案します。",
      "image": "chubo-s.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Aunq6P/u7+n/8+nY//Xx6v/19fH/8/Pv/+/h0v/x3cn/AgcICQAAAgcA/QgWAAL8+gAA9fAA/Pz9AP4OGAD8FCUAAoqVlgCMkI4Ae3VtALS5iQC9i2MAk5JuAOG6kwBibFEAAkpEQwBaJgAAbEUmAD0CBgA2MCgAXTYqABwJAwBkWmYAAAAA//8fLjfsAAAABklEQVQDAKyyOpc8xz8zAAAAAElFTkSuQmCC"
    },
    {
      "id": 20,
      "title": "東洋染化株式会社",
      "link": "https://www.toyosennka.jp",
      "date": "Fri, 25 Oct 2024 03:00:42 +0000",
      "description": "東洋染化株式会社",
      "image": "toyosennka.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AoCfs/+Io7b/jKe3/36csP99nbH/lLHF/63K3/+sy+H/As2tlQDIrJUAw6iUAO3PswBAHwAANxn8AEAkDgAwE/wAAgEBAQABAgEA///+AB0dHgDJycwA7/DyAAIBAgAQDxAAAv8A/wAsKikAfnxzAFtZUgBgX1sALColAAECAQALCgoAAAAA//+Zl1AUAAAABklEQVQDAPtLMzPQcZzPAAAAAElFTkSuQmCC"
    },
    {
      "id": 19,
      "title": "仙台農産株式会社（宮城県岩沼市）",
      "link": "https://www.sendai-nosan.com",
      "date": "Fri, 25 Oct 2024 02:59:50 +0000",
      "description": "宮城県岩沼市の仙台農産株式会社はビニールハウス等の農業用資材の販売および施工、農薬、肥料の提供をしています。仙台農産株式会社では求人募集をしております。",
      "image": "sendai-nosan.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Av39/f/3+Pj/7O7w/9rf5f/CzND/qKKm/6WGZ/+5gYr/AgAAAADz8vAA5+jZAPD10wD3/swADwXtAP7y4gDwOiMAAgAAAAALDQkAERQLAAIE/QD++dgA0POcAPQ7AQDc8q8AAoFxcACJd3sAjXyMAPnwBQAzLGUAU0uUAEIwewBRNGUAAAAA//9TW973AAAABklEQVQDAPOmP12yQPSAAAAAAElFTkSuQmCC"
    },
    {
      "id": 18,
      "title": "株式会社菊地電機",
      "link": "https://www.kikuchi-denki.biz",
      "date": "Fri, 25 Oct 2024 02:58:58 +0000",
      "description": "宮城県角田市にて電気設備工事、電気土木工事、土木工事の施工は株式会社菊地電機にお任せ下さい。現在、求人募集中です。",
      "image": "kikuchi-denki.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Avr9+/9ew4D/V7t5/5XSqf/p7Or/1Nrc/93h5P/+/v7/Av7/AADn6AUAOwEvAC0DHgDp5eUA7uTfAOzt6wD///8AAgEAAABJISkAUSk8ACAKFwAFAP4A4tzeAPXy7wABAQEAAgEAAADQ2tkAl8W3ALvSxgDF1cMA8wwAAPQB9wD///4AAAAA//+LOeq7AAAABklEQVQDAGKmQfSpCj11AAAAAElFTkSuQmCC"
    },
    {
      "id": 17,
      "title": "SERENESSE",
      "link": "https://gifuitvnluan.github.io/23200501_serenesulp",
      "date": "Fri, 25 Oct 2024 02:57:58 +0000",
      "description": "SERENESSE",
      "image": "serenesulp.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ArHT3//A197/qry8/6/BxP+60tr/sdPg/6HN3v+2y9D/AgwTFgAIEBUAFhUOABQSCAAACQkAChEUACkPAwAlCv8AAu/5/gDk9fwA1cvMABYIDAAa+vMAFf/1ANb+DwDFBSEAAgThyQD/4ckACgkEANDVzgDT1ssA1Mm5AAjjyQAP5ssAAAAA//9O808lAAAABklEQVQDAM0sO1fKr8leAAAAAElFTkSuQmCC"
    },
    {
      "id": 16,
      "title": "UCHIDA HOUSEI",
      "link": "https://uchida-factory.co.jp",
      "date": "Fri, 25 Oct 2024 02:56:18 +0000",
      "description": "UCHIDA HOUSEI",
      "image": "uchida-factory.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Amt9f/99n6f/hKq0/5Wvtv+Kpav/jKSp/7GdiP+6oIf/As2woADSw74A9/b3AO7+BQD4/wMA49zYANnX1gDd3NwAAh4UCQDrxa4AzrixANLCvgDYztAA5tfTAPDr6QDg5OkAAhwdHwAtKygAC+3XAAz16AAS9eEAKBIBAAAFCQD1/wcAAAAA//8wrc6mAAAABklEQVQDAAWNQ7fmAClmAAAAAElFTkSuQmCC"
    },
    {
      "id": 15,
      "title": "エーデン流通株式会社",
      "link": "http://www.adenryutsu.jp/",
      "date": "Fri, 25 Oct 2024 02:55:23 +0000",
      "description": "一般貨物運送・一般利用運送",
      "image": "adenryutsu.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AtHb6/+vv9f/przh/7TH6P+xxOP/qLvd/6W32f/G1uf/ArvDtACrra8Az9fbAMLV5wDL4/4AyN76AL3J3QDV4ugAAgMD+wD7+eYA++nFAPnfsAD+3q8A/+fBAPDeuQD17toAAhUQDgAsHRUAIxYOACkbFAAWB/gADPbbAA4A7gD99ekAAAAA//8KwQJTAAAABklEQVQDAGtKSdSHTfH7AAAAAElFTkSuQmCC"
    },
    {
      "id": 14,
      "title": "総武桶谷ミルクセンター『元気と笑いのある明日へ』",
      "link": "http://okemilk.com",
      "date": "Fri, 25 Oct 2024 02:54:33 +0000",
      "description": "ノロウイルスに効果があると言われているラクトフェリン入のヨーグルトや、骨粗鬆症予防のミルクカルシウムが普通牛乳の２...",
      "image": "okemilk.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Ar24uv+RipP/qqOt/6eepf+YgXj/j315/4V7gP+Si5r/Avn5+QD9/gEA+fr6AOzm4gDe2NoA/AAGAAYHCQAA/vwAAv37+wAEA/4A9fPwANTW2gAACxQA8vgCAAMD/wDi3tMAAhYcKgBPVE0AQ0hDABEUFADf4eYA6+flAA4ODgDv794AAAAA//9uzBzTAAAABklEQVQDAOpiP8ZuKpjFAAAAAElFTkSuQmCC"
    },
    {
      "id": 13,
      "title": "三恵株式会社",
      "link": "https://iwata.sankei-corp.com",
      "date": "Fri, 25 Oct 2024 02:52:52 +0000",
      "description": "車に関する製品の開発、加工、組立、出荷までを一貫生産で行う、静岡県磐田市にあるモノづくり企業、三恵株式会社のHPです。",
      "image": "sankei-corp.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AsrLz//Aw8v/zc/a/9vZ2//Jys//x8jO/7K0t/+AqrH/AgX7+wDPycYAqK20AMS/xADBu8MAmp+iAK6rrwBMGBIAAtDe8ADU3/sAztLjAKi1ygC8xtwA7vMOAPD/GgDJ2/QAAjAhDgAtHQkAKCEWAA4KBQA+MxoARjQUADMa/gA1HwIAAAAA//8xGMTqAAAABklEQVQDAPI3QHwS4zRFAAAAAElFTkSuQmCC"
    },
    {
      "id": 12,
      "title": "エステルーム chika",
      "link": "https://esteroomchika.com",
      "date": "Fri, 25 Oct 2024 02:51:57 +0000",
      "description": "エステルーム chika",
      "image": "esteroomchika.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAe0lEQVR4AQzLuw7CMAwF0It5jEiwsPD/P8HOilhAArFCFBqlpcSt3TZuhjMeGlVME5swm/adSWqt8R/7x2C/4Iz4+4bUDkMT0HqH6n6Fv13gXk88zicQR48uVsiDIkuRgc12j3VWHHZHkHCCLQhGxdRDaQW1JepQkgpmAAAA///TO+tPAAAABklEQVQDAEjoVKxOhO03AAAAAElFTkSuQmCC"
    },
    {
      "id": 11,
      "title": "有限会社赤羽根木工所（岡山県津山市）",
      "link": "https://akabane-wood.com",
      "date": "Fri, 25 Oct 2024 02:50:56 +0000",
      "description": "岡山県津山市の赤羽根木工所は、システムキッチン・洗面化粧台・特注家具等を大手メーカーより受注頂き、大きなサイズの物から小さいサイズの物まで全てオーダーメイドで製造しております。",
      "image": "akabane-wood.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ApSRjv+npqL/4+Ld/+jn5f/s6+n/ysfB/8W/uf+FfHT/As7T2AC+vb0AyMbHANjV0QDk39oA7u7vAMjFwwC/wMIAAv4AAgAMDAoAMCsoAAX57gDc0MMA4t7aAKipqwD9/gAAAvjz7gDr7ewA6+7yAM/FvwDTycUACgDtAEc/LwAF/fQAAAAA//8uhxdxAAAABklEQVQDAHubSoll6IfpAAAAAElFTkSuQmCC"
    },
    {
      "id": 10,
      "title": "スタディラウンジリキュウReQつくばみどりの校",
      "link": "https://sl-req.com",
      "date": "Fri, 25 Oct 2024 02:48:51 +0000",
      "description": "スタディラウンジリキュウReQつくばみどりの校｜プロ講師が教える通い放題の個別指導塾<",
      "image": "sl-req.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ArPFuP/V4tj/5ezk/+fw5v/p8uj/5ezi/9fk2f+3yb3/AnOIhQCYrKkA+/kAAPjy+wD68voA/vsDAKy8tgCEmJAAAm5IPADP2tUAAAEAAAUFBQAGBQMABQD8APLLugAc7+IAAvjy7wB5VV8ACQUFAAkGBQAICAsACAoNADw9QwAsDvoAAAAA//8eOByqAAAABklEQVQDAIKrPLXs55mjAAAAAElFTkSuQmCC"
    },
    {
      "id": 9,
      "title": "株式会社VICKYエンジニア",
      "link": "https://vicky-g.com",
      "date": "Fri, 25 Oct 2024 02:48:00 +0000",
      "description": "外壁塗装、屋根塗装、店舗塗装、仮設足場工事、屋根工事、雨漏り点検、雨樋工事、板金工事、解体工事、その他リフォーム工事全般ご相談無料です、ビッキーエンジニアにお任せください。",
      "image": "vicky-g.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AtvYzP/9/fT//Pz0//v78v/7+/L/8vDj/9rWxv/Cwrj/At3UvwDWy7YA2M66AM7MuwC9w7AAw7edAMO/rgDFxb4AAgAHHAABBxkA+vsNAJWXsgDd4fIACxQtABshOAAlJC0AAiYmMAARFB4A29riAD0pKgAhFhwAJys2ABoZGQATFBYAAAAA//8HjFjNAAAABklEQVQDAFNGPTBX/EJCAAAAAElFTkSuQmCC"
    },
    {
      "id": 8,
      "title": "SanYoshi ㈱三義漆器店",
      "link": "https://www.owanya.com",
      "date": "Fri, 25 Oct 2024 02:47:07 +0000",
      "description": "現代でのライフスタイルに合った、食器洗浄機・電子レンジの使用できる塗りの器をご提案。割れにくく、軽くてお手入れ簡単、扱いやすい器作りを追求してまいります。",
      "image": "owanya.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AnCOt/+Am7//fpu+/5Ctyv+Tsc3/2OPs//7+/v/Y4+H/ApmtygCMpMUAk6zLAJauygDe3d8AFQoBAP3+/wAlGh0AAvr9/wAZEQUAXDgXAG9DHQBYOx4A////AO3v+AD19vsAAlg9GgCCXC0AVUMjADUsGAACAwAA/f39ABUSCQALCwUAAAAA//9B0LUuAAAABklEQVQDADCkPCWgz8vLAAAAAElFTkSuQmCC"
    },
    {
      "id": 7,
      "title": "IT技術者センター",
      "link": "http://www.ite-center.com/",
      "date": "Fri, 25 Oct 2024 02:46:03 +0000",
      "description": "システム開発とプログラマーの積極採用を行う、株式会社IT技術者センターのホームページです。転職を考えているプログラマーの方はお気軽にご連絡ください。",
      "image": "ite-center.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AsvW2f+iqKv/4OXl/9vk5//FzdD/vMTH/7e8vv+yvMD/AoqTkwD43ckAp6ypADZqgACrwcYAAQwJAAv57QC2raMAAs/Q1AD3BxIAmZ+3AAvg3gDBs74AeneIAHyfswDd6O8AAltWUgDtAQwATURFAFdKSwA/MzkALCMpAC8sKgAvNDgAAAAA///O4wXSAAAABklEQVQDAPwpPds2p/z8AAAAAElFTkSuQmCC"
    },
    {
      "id": 6,
      "title": "たかさき歯科クリニック",
      "link": "https://takasakishika.com",
      "date": "Fri, 25 Oct 2024 02:45:06 +0000",
      "description": "JR筑肥線『福吉駅』前の歯科医院。たかさき歯科クリニック",
      "image": "takasakishika.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/ArezsP/W1dL/y8fC/8rGwP/Lx8L/zdfb/9Xh5v/G0Nn/Ai0xMgAZGhwAJCksACQoLgAdIyoADgwOAPDv9AAIBQEAAu/u7gDj4d0AmpGIAJSUkwCEhoYAta6lAOTaywDL09sAAg4ODgAWEg8AX0swAE47IgBrVTsANC0kAAUCAgAUAOsAAAAA///gsXNyAAAABklEQVQDAIVcNkGBhBrAAAAAAElFTkSuQmCC"
    },
    {
      "id": 5,
      "title": "獨協医科大学 麻酔科 獨協医大,獨協医科大学病院 麻酔科,麻酔科学講座",
      "link": "https://dept.dokkyomed.ac.jp/dep-m/anes",
      "date": "Fri, 25 Oct 2024 02:43:55 +0000",
      "description": "獨協医科大学 麻酔科 Anesthesiology and Pain Medicine Department,Dokkyo Medical University",
      "image": "dokkyomed.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AiU0av8rOm3/cnmS/2hwjv9mbor/bnSM/yc2av8eLmb/Av7/AAACAQEAAgQMABQZIAAUGB0AAQgQAAQDAQAAAAAAAq+idgCimXEAQ0o8AGNaOwBvZUgAeW9UAKqfdgC0p3oAAi0qHwAnJBcABgXkAPPx7QC+v8QAz87OACglHAAtKh8AAAAA//8zFLNZAAAABklEQVQDAFaSKMv3eOIcAAAAAElFTkSuQmCC"
    },
    {
      "id": 4,
      "title": "有限会社堀内工業津山",
      "link": "https://horiuchi-k.com",
      "date": "Fri, 25 Oct 2024 02:42:11 +0000",
      "description": "有限会社堀内工業津山",
      "image": "horiuchi-k.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AsLYnv+joYv/j410/4+Pd/+Qj3f/jI5z/7LIiP+82of/Avb7uwDt6fUA3c/kAOHO4wDn1usAIBQmAB4UIQDt9qQAAjQZNwAxNT4AU19gAF1ragBWY2IAHyYqABwP4ABVLlAAAhMTbwA8Pj8ANDk7ACkuMgAsMTQAMDM4ABITdQABAYQAAAAA//8YA2OtAAAABklEQVQDADt6MoNR73+jAAAAAElFTkSuQmCC"
    },
    {
      "id": 3,
      "title": "有限会社かんばんのクラフト",
      "link": "https://craft-sign.com",
      "date": "Fri, 25 Oct 2024 02:40:10 +0000",
      "description": "有限会社かんばんのクラフト",
      "image": "craft-sign.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/Arjc6f+42+n/uNro/6rMzv+wwMX/uNro/7rc6v+73er/Ag4FBQAKAwMA/PPvAAf1+AAQDhMAHAgFADIYDgA1GhAAAhYMBgAC+PUA4tPUAMG3vQBsdIAAaYWZAMLV1wDi8PcAAgoEAwAVCf4A997NACkXCQAuHgsAKgvrADkhFwAtGA4AAAAA//9kZym2AAAABklEQVQDAJriNrpsUaWHAAAAAElFTkSuQmCC"
    },
    {
      "id": 2,
      "title": "人材派遣サービス業",
      "link": "https://noa-staff.jp/",
      "date": "Mon, 21 Oct 2024 10:02:33 +0000",
      "description": "株式会社ノアスタッフ 人材派遣・人材紹介",
      "image": "noa-staff.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AqjF1v+iwtT/oLzN/6bE1f+xzdj/0urv/9bu9/+tytr/AnZxhgCAd4sAj4mbAHhzhwC+rbYAp4R8AADs6QB6dIkAAgAAAAD+AP8A+fr8AAEAAQA3JhoAXElEAMLJ1AD3+PkAAgAAAAD+/f4A9vf4AA4NCgDn7OgA5/f4AJ+lsQD/AAAAAAAA//81vtuUAAAABklEQVQDAGpOQjaVCGTdAAAAAElFTkSuQmCC"
    },
    {
      "id": 1,
      "title": "髙橋刃物工業株式会社",
      "link": "http://takahashi-tools.jp/index.html",
      "date": "Mon, 21 Oct 2024 09:47:08 +0000",
      "description": "髙橋刃物工業株式会社",
      "image": "takahashi-tools.webp",
      "blurImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAkElEQVR4AQCEAHv/AjAUBf8uFAT/LxYJ/0MqHP9ZPzH/Vz0u/zAWB/8wFAX/AtLu/QDh+wsAKkNRAFZufgA7VGIAESg2ANLs+wDQ7PsAAklJSgAHBwgAFBQTABMQCgDX1dQAoaSlAP7+/gAAAAAAAv39/QBMTEwAGxkYANnc3wDw5eQARygmADUxMAAjIyMAAAAA//8/S/4rAAAABklEQVQDAPQgLMLLcGRMAAAAAElFTkSuQmCC"
    }
];

export default function Blogs() {

  // Fetch RSS feed and set state here
  const [posts, setPosts] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchRSS = async (pageNum: number) => {
    try {
      // delay giả lập tải dữ liệu
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Giả lập phân trang với dữ liệu tĩnh
      const itemsPerPage = 10;
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = staticPortfolioItems.slice(startIndex, endIndex);
      setPosts((prev) => [...prev, ...newItems]);

      // Kiểm tra nếu đã load hết dữ liệu

      if (endIndex >= staticPortfolioItems.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu Portfolio:", error);
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
      console.log('Loading more portfolio items, page:', page);
      fetchRSS(page);
    }
  }, [page]);

  return (
      <section className="portfolio">
        <h1 className="heading"> <span>my</span> work </h1>
        <div className="box-container">
            {/* RSS Feed Items */}
            {loading ? (
                <><Skeleton /><Skeleton /><Skeleton /></>
            ) : (
                posts.map((item) => (
                    <div key={item.id} className="box">
                        <Image 
                            width={380} 
                            height={300} 
                            className="lazy"
                            src={item.image ? `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/portfolio/${item.image}` : `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/portfolio/default-portfolio.png`} 
                            alt={item.title}
                            placeholder="blur"
                            blurDataURL={item.blurImage ? item.blurImage : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA6ElEQVR4ARSMPUvDYBgAL08a8tEaizEGobFLVBAa7VAogj9AcHf1v4qDOIg6aJEOXQxdVKwxH6Z5fR1uOY4TnFThjtUguVDH0ysV7J2rg/RS4Zwo7JESrB64AbIRaULC4T6WH2D4AwwnRPpRzHgyYbn2uX99Y9GYzHIH8UIwQIpSscg+qYscen2KwylNWeBuesj/uVOV/Hy9I1s+xumZjro4fkTRgGNYiNmCWbUkO0NSIyaef7Bb2WzbCZ21qYOmxauE77tHRjfXHD0/UWUvmgekWiFK6VdbQ51zm82Yr5bIb01X+47AHwAAAP//6qPEeQAAAAZJREFUAwAIYVMonuBE+wAAAABJRU5ErkJggg=='}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/portfolio/default-portfolio.png`;
                            }}
                        />
                        <div className="content">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">read more</a>
                        </div>
                    </div>
                ))
            )}
            {/* Loader để trigger scroll */}
            {hasMore && (
              <>
              <div ref={loaderRef} className="box skeleton loading">
                <div className="image skeleton loading" style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} />
              </div>
              </>
            )}
        </div>

         {!hasMore && <p style={{ textAlign: 'center', color: 'white', marginTop: '3rem' }}>Đã load hết dữ liệu.</p>}
    </section>
  );
}
