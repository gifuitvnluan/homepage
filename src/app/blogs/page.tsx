"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

interface BlogItem {
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
}

export default function Blogs() {

  // Fetch RSS feed and set state here
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchRSS = async (pageNum: number = 1) => {
      try {
        // setLoading(true);
        const res = await fetch(`/api/blog?page=${pageNum}`);
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setPosts((prev) => [...prev, ...data.items]);
          setHasMore(data.hasMore);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API Blog:', error);
      } finally {
        setLoading(false);
      }
    }

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
  }, [loaderRef.current, hasMore, loading]);

  // Khi `page` tăng thì load thêm dữ liệu
  useEffect(() => {
    if (page > 1) {
      console.log('Loading more portfolio items, page:', page);
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
                <div className="loading"  style={{ color: `white`}}>Đang tải dữ liệu blog...</div>
            ) : (
                posts.map((item, index) => (
                    <div key={index} className="box">
                        <Image 
                            width={380} 
                            height={300} 
                            className="lazy" 
                            src={item.image || '/images/default-portfolio.png'} 
                            alt={item.title}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/default-portfolio.png';
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
        </div>
        {/* <div className="div_loadmore">
            <a href="#" className="btn"> load more <i><FontAwesomeIcon icon={faRedo} /></i> </a>
        </div> */}
        {/* Loader để trigger scroll */}
        {hasMore && (
          <div ref={loaderRef} className="loading" style={{ textAlign: 'center', color: `white` }}>
            {loadingMore ? 'Đang tải thêm...' : ''}
          </div>
        )}

        {!hasMore && <p className="loading" style={{ textAlign: 'center', color: 'white' }}>Đã load hết dữ liệu.</p>}
    </section>
    </div>
  );
}
