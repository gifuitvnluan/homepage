"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLink, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

interface BlogItem {
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
  author?: string;
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
                <div className="loading"  style={{ color: `white`}}>Đang tải dữ liệu blog...</div>
            ) : (
                posts.map((item, index) => (
                  <div className="box" key={index}  >
                    <div className="image">
                      <Image 
                          width={380} 
                          height={300} 
                          className="lazy" 
                          src={item.image || '/images/default-blog.png'} 
                          alt={item.title}
                          onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-blog.png';
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
