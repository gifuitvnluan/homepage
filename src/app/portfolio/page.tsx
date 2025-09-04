"use client"

import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

interface PortfolioItem {
  title: string;
  description: string;
  link: string;
  image?: string;
  pubDate: string;
}

export default function Portfolio() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRSSData = async () => {
            try {
                // Sử dụng RSS2JSON API để convert RSS feed thành JSON
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://1tomy.com/portfolio/feed/`);
                const data = await response.json();
                
                if (data.status === 'ok') {
                    const items: PortfolioItem[] = data.items.map((item: any) => ({
                        title: item.title,
                        description: item.description || item.content,
                        link: item.link,
                        image: extractImageFromContent(item.content),
                        pubDate: item.pubDate
                    }));
                    setPortfolioItems(items);
                }
            } catch (error) {
                console.error('Error fetching RSS data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Function để extract image từ content HTML
        const extractImageFromContent = (content: string) => {
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const match = content?.match(imgRegex);
            return match ? match[1] : '/images/default-portfolio.png';
        };

        fetchRSSData();
    }, []);

    const cleanDescription = (description: string) => {
        // Remove HTML tags and limit text length
        const text = description?.replace(/<[^>]*>/g, '');
        return text?.length > 150 ? text.substring(0, 150) + '...' : text;
    };
        
  return (
    <div  id="swup" className="transition-fade">
        <section className="portfolio">

        <h1 className="heading"> <span>my</span> work </h1>

        <div className="box-container">
            {/* RSS Feed Items */}
            {loading ? (
                <div className="loading">Loading portfolio items...</div>
            ) : (
                portfolioItems.map((item, index) => (
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
                            <p>{cleanDescription(item.description)}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">read more</a>
                        </div>
                    </div>
                ))
            )}

        </div>
        <div className="div_loadmore">
            <a href="#" className="btn"> load more <i><FontAwesomeIcon icon={faRedo} /></i> </a>
        </div>

    </section>
    </div>
  );
}
