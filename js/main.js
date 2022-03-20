const swup = new Swup();

$(document).ready(function(){
    replacelink();
    currentpage();
});

document.addEventListener('swup:contentReplaced', (event) => {
    currentpage();
});

function currentpage(){
    if ($(".about").length > 0) {
        aboutpage();
    }
    if ($(".portfolio").length > 0) {
        loadweb();
    }
    if ($(".blogs").length > 0) {
        loadblog();
    }
}

function replacelink(){
    $('.navbar a').each(function(i){
        var href = $(this).attr('href');
        $(this).attr('href', window.location.origin + '/homepage' +href);
    })
}
function aboutpage(){
    console.log('about');
    var currentYear = new Date().getFullYear();
    $(".span_experience").html(currentYear - 2017);
    $(".span_age").html(currentYear - 1995);
}

function loadweb(){
    console.log('portfolio');
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
    console.log('blog');
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
        allbox = '<div class="box">'+image+'<div class="content"><div class="icons"><a href="#"> <i class="fas fa-calendar"></i> '+date+' </a><a href="#"> <i class="fas fa-user"></i> by admin </a></div>'+title+'<p>'+description+'</p><a href="./blogs/single.html?page=blog-'+j+'" class="btn"> read more <i class="fas fa-link"></i></a></div></div>'
        $('.blogs .box-container').prepend(allbox);
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
