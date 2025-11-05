import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";

export default function Home() {
  return (
    <div  id="swup" className="transition-fade">
      <section className="home">

          <div className="image">
            <Image src="/images/user.jpg" alt="Nguyễn Thành Luân" width={500} height={600} />
          </div>

          <div className="content">
              <h3>hi, i am Nguyễn Thành Luân</h3>
              <span>front-end developer</span>
              <p>Good morning, everyone! Let me introduce myself. I’m Thành Luân. My full name is Nguyễn Thành Luân. I have been working as a web developer since my graduation from Quy Nhon College Of Engineering And Technology in 2016. As I have stated in my CV, I have cooperated with a few small-sized and medium-sized companies and also worked on my personal projects. I believe what has helped me gain credibility are my good professional skills and my punctuality. I always put my heart and soul into every single website that I develop. I guess that’s all I have to share about myself. Thank you for listening!</p>
              <Link href="/about" className="btn">about me <i><FontAwesomeIcon icon={faUser}/></i></Link>
          </div>
      
      </section>
    </div>
  );
}
