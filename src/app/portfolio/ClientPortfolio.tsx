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
}

// add data static portfolio items here if needed
const staticPortfolioItems: PortfolioItem[] = [
    {
      "id": 27,
      "title": "つやま産業支援センター",
      "link": "https://gifuitvnluan.github.io/10200407_tsuyama-biz.jp20200410",
      "date": "Fri, 25 Oct 2024 03:09:40 +0000",
      "description": "つやま産業支援センター",
      "image": "tsuyama-biz.webp"
    },
    {
      "id": 26,
      "title": "SMILE SLIDE PUZZLE GAME",
      "link": "https://style.suzuki/smilepuzzlegame",
      "date": "Fri, 25 Oct 2024 03:06:45 +0000",
      "description": "ワゴンRスマイルのスライドパズルゲーム！あなたは何秒、何回でクリアできるかな？結果をSNSでシェアして競い合おう！",
      "image": "smilepuzzlegame.webp"
    },
    {
      "id": 25,
      "title": "FestinaLente",
      "link": "https://gifuitvnluan.github.io/__FL",
      "date": "Fri, 25 Oct 2024 03:05:54 +0000",
      "description": "FestinaLente",
      "image": "fl.webp"
    },
    {
      "id": 24,
      "title": "株式会社ベスト・ハウジング",
      "link": "https://www.besthousing.co.jp",
      "date": "Fri, 25 Oct 2024 03:04:49 +0000",
      "description": "浜松市で新築分譲住宅・土地をお探しの方はベスト・ハウジングにお任せください！",
      "image": "besthousing.webp"
    },
    {
      "id": 23,
      "title": "宮崎で占いならネクストグレスへ　伊勢流・陰陽五行四柱推命とパワーストーンのお店",
      "link": "https://nextgress.com",
      "date": "Fri, 25 Oct 2024 03:03:11 +0000",
      "description": "宮崎で占いならネクストグレスへ。伊勢流・陰陽五行四柱推命...",
      "image": "nextgress.webp"
    },
    {
      "id": 22,
      "title": "「二世帯住宅プランニング | 二世帯住宅の完全分離の間取りや、リノベーションなどでお困りの方」",
      "link": "https://nisetaijyutaku-planning.com",
      "date": "Fri, 25 Oct 2024 03:02:18 +0000",
      "description": "「二世帯住宅プランニング | 二世帯住宅の完全分離の...",
      "image": "nisetaijyutaku-planning.png"
    },
    {
      "id": 21,
      "title": "式会社厨房サービス",
      "link": "https://www.chubo-s.jp",
      "date": "Fri, 25 Oct 2024 03:01:30 +0000",
      "description": "厨房の設計・施工からメンテナンスまでをトータルでサポートしています。厨房機器単体では無く、お客様の調理形態に合った機器の選定、食材・人の流れを計算したゾーニングプランなど厨房という空間全てについて提案します。",
      "image": "chubo-s.webp"
    },
    {
      "id": 20,
      "title": "東洋染化株式会社",
      "link": "https://www.toyosennka.jp",
      "date": "Fri, 25 Oct 2024 03:00:42 +0000",
      "description": "東洋染化株式会社",
      "image": "toyosennka.webp"
    },
    {
      "id": 19,
      "title": "仙台農産株式会社（宮城県岩沼市）",
      "link": "https://www.sendai-nosan.com",
      "date": "Fri, 25 Oct 2024 02:59:50 +0000",
      "description": "宮城県岩沼市の仙台農産株式会社はビニールハウス等の農業用資材の販売および施工、農薬、肥料の提供をしています。仙台農産株式会社では求人募集をしております。",
      "image": "sendai-nosan.webp"
    },
    {
      "id": 18,
      "title": "株式会社菊地電機",
      "link": "https://www.kikuchi-denki.biz",
      "date": "Fri, 25 Oct 2024 02:58:58 +0000",
      "description": "宮城県角田市にて電気設備工事、電気土木工事、土木工事の施工は株式会社菊地電機にお任せ下さい。現在、求人募集中です。",
      "image": "kikuchi-denki.webp"
    },
    {
      "id": 17,
      "title": "SERENESSE",
      "link": "https://gifuitvnluan.github.io/23200501_serenesulp",
      "date": "Fri, 25 Oct 2024 02:57:58 +0000",
      "description": "SERENESSE",
      "image": "serenesulp.webp"
    },
    {
      "id": 16,
      "title": "UCHIDA HOUSEI",
      "link": "https://uchida-factory.co.jp",
      "date": "Fri, 25 Oct 2024 02:56:18 +0000",
      "description": "UCHIDA HOUSEI",
      "image": "uchida-factory.webp"
    },
    {
      "id": 15,
      "title": "エーデン流通株式会社",
      "link": "http://www.adenryutsu.jp/",
      "date": "Fri, 25 Oct 2024 02:55:23 +0000",
      "description": "一般貨物運送・一般利用運送",
      "image": "adenryutsu.webp"
    },
    {
      "id": 14,
      "title": "総武桶谷ミルクセンター『元気と笑いのある明日へ』",
      "link": "http://okemilk.com",
      "date": "Fri, 25 Oct 2024 02:54:33 +0000",
      "description": "ノロウイルスに効果があると言われているラクトフェリン入のヨーグルトや、骨粗鬆症予防のミルクカルシウムが普通牛乳の２...",
      "image": "okemilk.webp"
    },
    {
      "id": 13,
      "title": "三恵株式会社",
      "link": "https://iwata.sankei-corp.com",
      "date": "Fri, 25 Oct 2024 02:52:52 +0000",
      "description": "車に関する製品の開発、加工、組立、出荷までを一貫生産で行う、静岡県磐田市にあるモノづくり企業、三恵株式会社のHPです。",
      "image": "sankei-corp.webp"
    },
    {
      "id": 12,
      "title": "エステルーム chika",
      "link": "https://esteroomchika.com",
      "date": "Fri, 25 Oct 2024 02:51:57 +0000",
      "description": "エステルーム chika",
      "image": "esteroomchika.webp"
    },
    {
      "id": 11,
      "title": "有限会社赤羽根木工所（岡山県津山市）",
      "link": "https://akabane-wood.com",
      "date": "Fri, 25 Oct 2024 02:50:56 +0000",
      "description": "岡山県津山市の赤羽根木工所は、システムキッチン・洗面化粧台・特注家具等を大手メーカーより受注頂き、大きなサイズの物から小さいサイズの物まで全てオーダーメイドで製造しております。",
      "image": "akabane-wood.webp"
    },
    {
      "id": 10,
      "title": "スタディラウンジリキュウReQつくばみどりの校",
      "link": "https://sl-req.com",
      "date": "Fri, 25 Oct 2024 02:48:51 +0000",
      "description": "スタディラウンジリキュウReQつくばみどりの校｜プロ講師が教える通い放題の個別指導塾<",
      "image": "sl-req.webp"
    },
    {
      "id": 9,
      "title": "株式会社VICKYエンジニア",
      "link": "https://vicky-g.com",
      "date": "Fri, 25 Oct 2024 02:48:00 +0000",
      "description": "外壁塗装、屋根塗装、店舗塗装、仮設足場工事、屋根工事、雨漏り点検、雨樋工事、板金工事、解体工事、その他リフォーム工事全般ご相談無料です、ビッキーエンジニアにお任せください。",
      "image": "vicky-g.webp"
    },
    {
      "id": 8,
      "title": "SanYoshi ㈱三義漆器店",
      "link": "https://www.owanya.com",
      "date": "Fri, 25 Oct 2024 02:47:07 +0000",
      "description": "現代でのライフスタイルに合った、食器洗浄機・電子レンジの使用できる塗りの器をご提案。割れにくく、軽くてお手入れ簡単、扱いやすい器作りを追求してまいります。",
      "image": "owanya.webp"
    },
    {
      "id": 7,
      "title": "IT技術者センター",
      "link": "http://www.ite-center.com/",
      "date": "Fri, 25 Oct 2024 02:46:03 +0000",
      "description": "システム開発とプログラマーの積極採用を行う、株式会社IT技術者センターのホームページです。転職を考えているプログラマーの方はお気軽にご連絡ください。",
      "image": "ite-center.webp"
    },
    {
      "id": 6,
      "title": "たかさき歯科クリニック",
      "link": "https://takasakishika.com",
      "date": "Fri, 25 Oct 2024 02:45:06 +0000",
      "description": "JR筑肥線『福吉駅』前の歯科医院。たかさき歯科クリニック",
      "image": "takasakishika.webp"
    },
    {
      "id": 5,
      "title": "獨協医科大学 麻酔科 獨協医大,獨協医科大学病院 麻酔科,麻酔科学講座",
      "link": "https://dept.dokkyomed.ac.jp/dep-m/anes",
      "date": "Fri, 25 Oct 2024 02:43:55 +0000",
      "description": "獨協医科大学 麻酔科 Anesthesiology and Pain Medicine Department,Dokkyo Medical University",
      "image": "dokkyomed.webp"
    },
    {
      "id": 4,
      "title": "有限会社堀内工業津山",
      "link": "https://horiuchi-k.com",
      "date": "Fri, 25 Oct 2024 02:42:11 +0000",
      "description": "有限会社堀内工業津山",
      "image": "horiuchi-k.webp"
    },
    {
      "id": 3,
      "title": "有限会社かんばんのクラフト",
      "link": "https://craft-sign.com",
      "date": "Fri, 25 Oct 2024 02:40:10 +0000",
      "description": "有限会社かんばんのクラフト",
      "image": "craft-sign.webp"
    },
    {
      "id": 2,
      "title": "人材派遣サービス業",
      "link": "https://noa-staff.jp/",
      "date": "Mon, 21 Oct 2024 10:02:33 +0000",
      "description": "株式会社ノアスタッフ 人材派遣・人材紹介",
      "image": "noa-staff.webp"
    },
    {
      "id": 1,
      "title": "髙橋刃物工業株式会社",
      "link": "http://takahashi-tools.jp/index.html",
      "date": "Mon, 21 Oct 2024 09:47:08 +0000",
      "description": "髙橋刃物工業株式会社",
      "image": "takahashi-tools.webp"
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
                            src={item.image ? `/images/portfolio/${item.image}` : '/images/portfolio/default-portfolio.png'} 
                            alt={item.title}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/portfolio/default-portfolio.png';
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
