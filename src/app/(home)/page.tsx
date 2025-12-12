import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Luân's homepage",
};

export default function Home() {
  return (
      <section className="home">
          <div className="image">
            <Image 
            src={`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}/images/user.jpg`} 
            alt="Nguyễn Thành Luân" 
            width={500} 
            height={600} 
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAABN0lEQVR4AUyPy0oCYQCFv/m1yUvaGIIGFgYGQigiLdpUGxdtXVTbWrSq5ymfxGVECdEF6bbRNqKhSZjlfcaZ+Zt2Hs7uHPjOEad7KZnfjMt8dlUWDtPybDsu01G/TERCMpnMSBHUQgjVixbw0fVG0Vey7OyfENzYZT6WQSAUTMWF5dW4KD5SqX+SyuXYSrTo1Z8RxdIT1Uabq3IFW0JWE/Rqr7wpx8wtLCO+hwb9sQ72lINsjPUlD0F7QEBvMWrcIfyqy6Eo9Kc25VqbtXiYj0aT0KIK1gRhS4Xe2KD7O+L6vcPR+SX3tw9USwU8qjNRN02kdOA4FNui0/3h5qXBV3NAJKwhdMPCMAwn/rfEsgym+oRWZ+g86iB6YxMUwaxMa4ppK8y5BEI6iUuRqO7ZkkS43cz7NP4AAAD//2yJEXIAAAAGSURBVAMAz52DtcYiMhYAAAAASUVORK5CYII=`}/>
          </div>

          <div className="content">
              <h3>hi, i am Nguyễn Thành Luân</h3>
              <span>front-end developer</span>
              <p>Good morning, everyone! Let me introduce myself. I’m Thành Luân. My full name is Nguyễn Thành Luân. I have been working as a web developer since my graduation from Quy Nhon College Of Engineering And Technology in 2016. As I have stated in my CV, I have cooperated with a few small-sized and medium-sized companies and also worked on my personal projects. I believe what has helped me gain credibility are my good professional skills and my punctuality. I always put my heart and soul into every single website that I develop. I guess that’s all I have to share about myself. Thank you for listening!</p>
              <Link href="/about" className="btn">about me <i><FontAwesomeIcon icon={faUser}/></i></Link>
          </div>
      
      </section>
  );
}
