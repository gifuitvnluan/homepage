"use client"

import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faDownload, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

interface skillsBox {
    id: number;
    imgSrc: string;
    imgWidth?: number;
    imgHeight?: number;
    skillName: string;
}

interface educationBox {
    id: number;
    icon?: typeof faBriefcase | typeof faGraduationCap;
    timeRange: string;
    title: string;
    description: string;
}

const skills: skillsBox[] = [
    { id: 1, imgSrc: '/images/icon-1.png', imgWidth: 62, imgHeight: 70, skillName: 'html' },
    { id: 2, imgSrc: '/images/icon-2.png', imgWidth: 63, imgHeight: 70, skillName: 'css' },
    { id: 3, imgSrc: '/images/icon-3.png', imgWidth: 61, imgHeight: 70, skillName: 'javascript' },
    { id: 4, imgSrc: '/images/icon-4.png', imgWidth: 95, imgHeight: 70, skillName: 'sass' },
    { id: 5, imgSrc: '/images/icon-5.png', imgWidth: 73, imgHeight: 70, skillName: 'jquery' },
    { id: 6, imgSrc: '/images/icon-6.png', imgWidth: 67, imgHeight: 70, skillName: 'laravel' },
    { id: 7, imgSrc: '/images/icon-10.png', imgWidth: 130, imgHeight: 70, skillName: 'php' },
    { id: 8, imgSrc: '/images/icon-7.png', imgWidth: 70, imgHeight: 70, skillName: 'WordPress' },
    { id: 9, imgSrc: '/images/icon-8.png', imgWidth: 70, imgHeight: 70, skillName: 'Adobe Photoshop' },
    { id: 10, imgSrc: '/images/icon-9.png', imgWidth: 70, imgHeight: 70, skillName: 'Adobe Illustrator' },
    { id: 11, imgSrc: '/images/icon-11.png', imgWidth: 70, imgHeight: 70, skillName: 'Adobe Animate' },
    { id: 12, imgSrc: '/images/icon-12.png', imgWidth: 127, imgHeight: 70, skillName: 'Asterisk (Call Center)' },
];

const education: educationBox[] = [
    {
        id: 1,
        icon: faGraduationCap,
        timeRange: '2013 - 2016',
        title: 'front-end development',
        description: 'Student at school quy nhon college of engineering and technology'
    },
    {
        id: 2,
        icon: faBriefcase,
        timeRange: '2016 - 2017',
        title: 'front-end development',
        description: 'freelancer'
    },
    {
        id: 3,
        timeRange: '2017 - 2022',
        title: 'front-end development',
        description: 'employee of NINJA Q CO., LTD'
    },
    {
        id: 4,
        timeRange: '2022 - current',
        title: 'full-stack development with laravel',
        description: 'employee of NgocThien Supply Co., Ltd (NTS)'
    },
];

export default function About() {
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState(0);
  const [pathBase, setPathBase] = useState('');

  useEffect(() => {
    const myYear = process.env.NEXT_PUBLIC_YEAR_BORN || 0;
    const myStartYear = process.env.NEXT_PUBLIC_YEAR_WORK_START || 0;

    const isProd = process.env.NODE_ENV === 'production'
    if (isProd) {
      setPathBase(process.env.NEXT_PUBLIC_PATH_BASE || '');
    }

    const currentYear = new Date().getFullYear();

    setAge((Number(currentYear) - (Number(myYear) || 0)));
    setExperience((Number(currentYear) - (Number(myStartYear) || 0)));

  }, []);

  return (
    <>
      <section className="about">

        <h1 className="heading"> about <span>me</span> </h1>

        <div className="row">

            <div className="info-container">

                <h1>personal info</h1>

                <div className="box-container">

                    <div className="box">
                        <h3> <span>name : </span> Nguyễn Thành Luân </h3>
                        <h3> <span>age : </span> <span className="span_age" style={{ color: 'inherit', fontWeight: 'inherit'}}>{age}</span> </h3>
                        <h3> <span>email : </span> nguyenthanhluan995@gmail.com </h3>
                        <h3> <span>address : </span> Quy Nhon - Binh Dinh, Viet Nam </h3>
                    </div>
        
                    <div className="box">
                        <h3> <span>freelance : </span> available </h3>
                        <h3> <span>skill : </span> front-end </h3>
                        <h3> <span>experience : </span> <span className="span_experience" style={{ color: 'inherit', fontWeight: 'inherit'}}>{experience}</span> years </h3>
                        <h3> <span>language : </span> Vietnamese </h3>
                    </div>

                </div>

                <a href={`${pathBase}/files/nguyen-thanh-luan_cveng.pdf`} className="btn" download> download CV <i><FontAwesomeIcon icon={faDownload} /></i></a>

            </div>

            <div className="count-container">

                <div className="box">
                    <h3><span className="span_experience">{experience}</span>+</h3>
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
            {skills.map((skill) => (
                <div className="box" key={skill.id}>
                    <Image width={skill.imgWidth} height={skill.imgHeight} src={`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PATH_BASE : ""}${skill.imgSrc}`} alt={skill.skillName.toLowerCase()}/>
                    <h3>{skill.skillName}</h3>
                </div>
            ))}
        </div>

    </section>

    {/* <!-- skills section ends --> */}

    {/* <!-- education section starts  --> */}

    <section className="education">

        <h1 className="heading"> <span>my</span> education </h1>

        <div className="box-container">
            {education.map((edu) => (
                <div className="box" key={edu.id}>
                    <i>{edu.icon? <FontAwesomeIcon icon={edu.icon} /> : <FontAwesomeIcon icon={faBriefcase} />}</i>
                    <span>{edu.timeRange}</span>
                    <h3>{edu.title}</h3>
                    <p>{edu.description}</p>
                </div>
            ))}
        </div>

    </section>
    </>
  );
}
