import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <div  id="swup" className="transition-fade">
      <section className="about">

        <h1 className="heading"> about <span>me</span> </h1>

        <div className="row">

            <div className="info-container">

                <h1>personal info</h1>

                <div className="box-container">

                    <div className="box">
                        <h3> <span>name : </span> Nguyễn Thành Luân </h3>
                        <h3> <span>age : </span> <span className="span_age" style={{ color: 'inherit', fontWeight: 'inherit'}}></span> </h3>
                        <h3> <span>email : </span> nguyenthanhluan995@gmail.com </h3>
                        <h3> <span>address : </span> Quy Nhon - Binh Dinh, Viet Nam </h3>
                    </div>
        
                    <div className="box">
                        <h3> <span>freelance : </span> available </h3>
                        <h3> <span>skill : </span> front-end </h3>
                        <h3> <span>experience : </span> <span className="span_experience" style={{ color: 'inherit', fontWeight: 'inherit'}}></span> years </h3>
                        <h3> <span>language : </span> Vietnamese </h3>
                    </div>

                </div>

                <a href="./files/nguyen-thanh-luan_cveng.pdf" className="btn" download> download CV <i className="fas fa-download"></i> </a>

            </div>

            <div className="count-container">

                <div className="box">
                    <h3><span className="span_experience"></span>+</h3>
                    <p>years of experience</p>
                </div>

                <div className="box">
                    <h3>450+</h3>
                    <p>happy clients</p>
                </div>

                <div className="box">
                    <h3>200+</h3>
                    <p>project completed</p>
                </div>

            </div>

        </div>

    </section>

    {/* <!-- about section ends --> */}

    {/* <!-- skills section starts  --> */}

    <section className="skills">

        <h1 className="heading"> <span>my</span> skills </h1>

        <div className="box-container">
            <div className="box">
                <Image width={100} height={100} src="images/icon-1.png"/>
                <h3>html</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-2.png"/>
                <h3>css</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-3.png"/>
                <h3>javascript</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-4.png"/>
                <h3>sass</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-5.png"/>
                <h3>jquery</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-6.png"/>
                <h3>laravel</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-10.png"/>
                <h3>php</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-7.png"/>
                <h3>WordPress</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-8.png"/>
                <h3>Adobe Photoshop</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-9.png"/>
                <h3>Adobe Illustrator</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-11.png"/>
                <h3>Adobe Animate</h3>
            </div>
            <div className="box">
                <Image width={100} height={100} src="images/icon-12.png"/>
                <h3>Asterisk <br/>(Call Center)</h3>
            </div>
        </div>

    </section>

    {/* <!-- skills section ends --> */}

    {/* <!-- education section starts  --> */}

    <section className="education">

        <h1 className="heading"> <span>my</span> education </h1>

        <div className="box-container">

            <div className="box">
                <i className="fas fa-graduation-cap"></i>
                <span>2013 - 2016</span>
                <h3>front-end development</h3>
                <p>Student at school quy nhon college of engineering and technology</p>
            </div>

            <div className="box">
                <i className="fas fa-graduation-cap"></i>
                <span>2016 - 2017</span>
                <h3>front-end development</h3>
                <p>freelancer</p>
            </div>

            <div className="box">
                <i className="fas fa-graduation-cap"></i>
                <span>2017 - 2022</span>
                <h3>front-end development</h3>
                <p>employee of NINJA Q CO., LTD</p>
            </div>

            <div className="box">
                <i className="fas fa-graduation-cap"></i>
                <span>2022 - current</span>
                <h3>front-end development</h3>
                <p>employee of NgocThien Supply Co., Ltd (NTS)</p>
            </div>

        </div>

    </section>
    </div>
  );
}
