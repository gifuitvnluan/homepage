const swup = new Swup();
var lazyLoadInstance = new LazyLoad({
    // Your custom settings go here
    use_native: true
});

$(document).ready(function(){
    replacelink();
    currentpage();
    
    console.log('click');
});

document.addEventListener('swup:contentReplaced', function (event) {
    currentpage();
    lazyLoadInstance.update();
    $(window).scrollTop(0);
});


function currentpage(){
    if ($(".home").length > 0) {
        toppage();
    }
    if ($(".about").length > 0) {
        aboutpage();
    }
    if ($(".portfolio").length > 0) {
        loadweb();
    }
    if ($(".blogs .box-container").length > 0) {
        loadblog();
    }
    if ($(".blogs .blog-single").length > 0) {
        loadblogsingle();
    }
}

function replacelink(){
    $('.navbar a').each(function(i){
        var href = $(this).attr('href');
        $(this).attr('href', window.location.origin + '/homepage' +href);
    })
}

function toppage(){
    var href = $('.home .btn').attr('href');
    $('.home .btn').attr('href', window.location.origin + '/homepage' +href);
}

function aboutpage(){
    var currentYear = new Date().getFullYear();
    $(".span_experience").html(currentYear - 2017);
    $(".span_age").html(currentYear - 1995);
}

function loadweb(){
    $(".portfolio .box-container .box").slice(0, 8).show();
    $(".btn").on('click', function (e) {
        e.preventDefault();
        $(".portfolio .box-container .box:hidden").slice(0, 8).slideDown();
        if ($(".portfolio .box-container .box:hidden").length == 0) {
            $(".btn").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
}

function loadblog(){
    var i;
    var j = 1;
    for (i = 0; i < 1; i) {
        var urlstring = './blogs/blog-news/blog-'+j+'.html';
        if(doesFileExist(urlstring)){
            getajax(urlstring,j);
            j++;
        }else{
            break;
        }
        
    }
}

function getajax(urlToFile,j) {
    $.get(urlToFile, function(data, status){

        var datastring = data;
        datastring = datastring.split('==='); // split into array


        var title = datastring[0];
        var image = datastring[1];
        image = image.replace('../.','');
        var description = datastring[2];
        var date = datastring[4];
        

        var allbox;
        allbox = '<div class="box">'+image+'<div class="content"><div class="icons"><a href="#"> <i class="fas fa-calendar"></i> '+date+' </a><a href="#"> <i class="fas fa-user"></i> by admin </a></div>'+title+'<p>'+description+'</p><a href="'+window.location.origin+'/homepage/blogs/single.html?page=blog-'+j+'" class="btn"> read more <i class="fas fa-link"></i></a></div></div>'
        $('.blogs .box-container').prepend(allbox);
        lazyLoadInstance.update();
    });
};

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
};

function loadblogsingle(){
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });

    var urlstring = './blog-news/'+$_GET["page"]+'.html';
    if(doesFileExist(urlstring)){
        getajaxsingle(urlstring);
    }else{
        get404();
    }
}

function get404() {
        $('.blogs .heading').html("4<span>0</span>4");
        $('.blogs .blog-single .div_thumbnail').hide();
        $('.blogs .blog-single h1').html("Sorry, the page you were looking for doesn't exist");
        $('.blogs .blog-single .div_des').hide();
        $('.blogs .blog-single .all_content').html('<div class="dl_fl"><a href="../index.html" class="btn"> BACK TO HOME PAGE <i class="fas fa-link"></i></a></div>');
};

function getajaxsingle(urlToFile) {
    $.get(urlToFile, function(data, status){

        var datastring = data;
        datastring = datastring.split('==='); // split into array

        var title = datastring[0].replace('<h3>','').replace('</h3>','');

        var image = datastring[1];
        image = image.replace('<div class="image"><img src="../','').replace('" alt="thumbnail"></div>','');
        var content = datastring[3];
        var date = datastring[4];
        $('.blogs .blog-single .div_thumbnail').css('background-image','url('+image+')');
        $('.blogs .blog-single h1').html(title);
        $('.blogs .blog-single .div_des').html('<div class="icons"><a href="#"> <i class="fas fa-calendar"></i> '+date+' </a><a href="#"> <i class="fas fa-user"></i> by admin </a></div>');
        $('.blogs .blog-single .all_content').html(content);
    });
};
