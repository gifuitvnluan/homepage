"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMap, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useForm, ValidationError } from '@formspree/react';
import { useState } from "react";

export default function ClientContact() {

    const [state, handleSubmit] = useForm("xleznqva");
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const [inputName, setInputName] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputComment, setInputComment] = useState('');
    const [inputSubject, setInputSubject] = useState('');

    if (state.succeeded) {
        if (!submitted) {
            setMessage(`Cảm ơn ${inputName} đã gửi thông tin!`);
            setInputName('');
            setInputNumber('');
            setInputEmail('');
            setInputComment('');
            setInputSubject('');

            setSubmitted(true);
        }
    }

  return (
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


        <form onSubmit={handleSubmit}>

            <div className="inputBox">
                <input type="text" placeholder="your name" name="name" value={inputName} onChange={(e) => setInputName(e.target.value)} disabled={submitted}/>
                <input type="number" placeholder="your number" name="number" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} disabled={submitted}/>
            </div>

            <div className="inputBox">
                <input type="email" placeholder="your email" name="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} disabled={submitted}/>
                <input type="text" placeholder="your subject" name="subjectmail" value={inputSubject} onChange={(e) => setInputSubject(e.target.value)} disabled={submitted}/>
            </div>

            <textarea name="comment" placeholder="your message" cols={30} rows={10} value={inputComment} onChange={(e) => setInputComment(e.target.value)} disabled={submitted}></textarea>

            <input type="submit" value="send message" className="btn" disabled={submitted} />

            {(state.errors || message) ? (
                <div className={`${message ? "successSend" : ""} validate-form`}>
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                    <ValidationError prefix="Number" field="number" errors={state.errors} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                    <ValidationError prefix="Message" field="comment" errors={state.errors} />
                    {message ? <p>{message}</p> : null}
                </div>
            ) : null}

        </form>

        </div>

    </section>
  );
}
