class Nav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav className="navbar">
                <a href="/"> <i className="fas fa-home"></i> <span>home</span> </a>
                <a href="/about"> <i className="fas fa-user"></i> <span>about</span> </a>
                <a href="/portfolio"> <i className="fas fa-briefcase"></i> <span>portfolio</span> </a>
                <a href="/blogs"> <i className="fas fa-blog"></i> <span>blogs</span> </a>
                <a href="/contact"> <i className="fas fa-address-book"></i> <span>contact</span> </a>
            </nav>
        );
    }
}


ReactDOM.render(
    <Nav />
, document.getElementById("navbar"));
