class ContentPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="swup" className="transition-fade">
                <section className="home">
                
                    <div className="image">
                        <img src="images/user.jpg" alt="Nguyễn Thành Luân" />
                    </div>
                
                    <div className="content">
                        <h3>hi, i am Nguyễn Thành Luân</h3>
                        <span>front-end developer</span>
                        <p>Good morning, everyone! Let me introduce myself. I’m Thành Luân. My full name is Nguyễn Thành Luân. I have been working as a web developer since my graduation from Quy Nhon College Of Engineering And Technology in 2016. As I have stated in my CV, I have cooperated with a few small-sized and medium-sized companies and also worked on my personal projects. I believe what has helped me gain credibility are my good professional skills and my punctuality. I always put my heart and soul into every single website that I develop. I guess that’s all I have to share about myself. Thank you for listening!</p>
                        <a href="/about" className="btn"> about me <i className="fas fa-user"></i> </a>
                    </div>
                
                </section>
            </div>
        );
    }
}


ReactDOM.render(
    <ContentPage />
, document.getElementById("root"));
