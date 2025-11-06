import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMap, faPhone } from '@fortawesome/free-solid-svg-icons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Luân',
};


export default function Contact() {

  return (
    <div id="swup" className="transition-fade">

      <section className="contact">

        <h1 className="heading"> contact <span>me</span> </h1>

        <div className="row">

           <div className="info-container">

            <h1>get in touch</h1>

            <p>Have any questions or requests please feel free to contact me</p>

            <div className="box-container">

                <div className="box">
                    <i><FontAwesomeIcon icon={faMap} /></i>
                    <div className="info">
                        <h3>address :</h3>
                        <p> Quy Nhon - Binh Dinh, Viet Nam</p>
                    </div>
                </div>

                <div className="box">
                    <i><FontAwesomeIcon icon={faEnvelope} /></i>
                    <div className="info">
                        <h3>email :</h3>
                        <p>nguyenthanhluan995@gmail.com</p>
                    </div>
                </div>

                <div className="box">
                    <i><FontAwesomeIcon icon={faPhone} /></i>
                    <div className="info">
                        <h3>number :</h3>
                        <p>096-983-7705</p>
                    </div>
                </div>

            </div>

            <div className="share">
                <a href="https://www.facebook.com/luanqn77" target="_blank" className="fab fa-facebook-f"></a>
                <a href="mailto:nguyenthanhluan995@gmail.com" className="fas fa-envelope"></a>
                <a href="https://github.com/gifuitvnluan" target="_blank" className="fab fa-github"></a>
            </div>

        </div>


        <form action="https://formspree.io/f/xleznqva"  method="POST">

            <div className="inputBox">
                <input type="text" placeholder="your name" name="name"/>
                <input type="number" placeholder="your number" name="number"/>
            </div>

            <div className="inputBox">
                <input type="email" placeholder="your email" name="email"/>
                <input type="text" placeholder="your subject" name="subjectmail"/>
            </div>

            <textarea name="comment" placeholder="your message" cols={30} rows={10}></textarea>

            <input type="submit" value="send message" className="btn"/>

        </form>

        </div>

    </section>

    </div>
  );
}
