<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>about</title>

    <!-- font awesome cdn link  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- custom css file link  -->
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    
<!-- navbar section starts  -->

<nav class="navbar">
    <a href="./"> <i class="fas fa-home"></i> <span>home</span> </a>
    <a href="about.php"> <i class="fas fa-user"></i> <span>about</span> </a>
    <a href="portfolio.php"> <i class="fas fa-briefcase"></i> <span>portfolio</span> </a>
    <a href="blogs.php"> <i class="fas fa-blog"></i> <span>blogs</span> </a>
    <a href="contact.php"> <i class="fas fa-address-book"></i> <span>contact</span> </a>
</nav>

<!-- navbar section ends -->

<!-- about section starts  -->

<section class="about">

    <h1 class="heading"> about <span>me</span> </h1>

    <div class="row">

        <div class="info-container">

            <h1>personal info</h1>

            <div class="box-container">

                <div class="box">
                    <h3> <span>name : </span> Nguyen Thanh Luan </h3>
                    <h3> <span>age : </span> <?php echo date("Y") - 1995; ?> </h3>
                    <h3> <span>email : </span> nguyenthanhluan995@gmail.com </h3>
                    <h3> <span>address : </span> Quy Nhon - Binh Dinh, Viet Nam </h3>
                </div>
    
                <div class="box">
                    <h3> <span>freelance : </span> available </h3>
                    <h3> <span>skill : </span> front-end </h3>
                    <h3> <span>experience : </span> <?php echo date("Y") - 2017; ?> years </h3>
                    <h3> <span>language : </span> Vietnamese </h3>
                </div>

            </div>

            <a href="#" class="btn"> download CV <i class="fas fa-download"></i> </a>

        </div>

        <div class="count-container">

            <div class="box">
                <h3><?php echo date("Y") - 2018; ?>+</h3>
                <p>years of experience</p>
            </div>

            <div class="box">
                <h3>450+</h3>
                <p>happy clients</p>
            </div>

            <div class="box">
                <h3>200+</h3>
                <p>project completed</p>
            </div>

            <!-- <div class="box">
                <h3>10+</h3>
                <p>awards won</p>
            </div> -->

        </div>

    </div>

</section>

<!-- about section ends -->

<!-- skills section starts  -->

<section class="skills">

    <h1 class="heading"> <span>my</span> skills </h1>

    <div class="box-container">
        <div class="box">
            <img src="images/icon-1.png">
            <h3>html</h3>
        </div>
        <div class="box">
            <img src="images/icon-2.png">
            <h3>css</h3>
        </div>
        <div class="box">
            <img src="images/icon-3.png">
            <h3>javascript</h3>
        </div>
        <div class="box">
            <img src="images/icon-4.png">
            <h3>sass</h3>
        </div>
        <div class="box">
            <img src="images/icon-5.png">
            <h3>jquery</h3>
        </div>
        <div class="box">
            <img src="images/icon-6.png">
            <h3>laravel</h3>
        </div>
    </div>

</section>

<!-- skills section ends -->

<!-- education section starts  -->

<section class="education">

    <h1 class="heading"> <span>my</span> education </h1>

    <div class="box-container">

        <div class="box">
            <i class="fas fa-graduation-cap"></i>
            <span>2013 - 2016</span>
            <h3>front-end development</h3>
            <p>Student at school quy nhon college of engineering and technology</p>
        </div>

        <div class="box">
            <i class="fas fa-graduation-cap"></i>
            <span>2016 - 2017</span>
            <h3>front-end development</h3>
            <p>freelancer</p>
        </div>

        <div class="box">
            <i class="fas fa-graduation-cap"></i>
            <span>2017 - 2022</span>
            <h3>front-end development</h3>
            <p>employee of NINJA Q CO., LTD</p>
        </div>

    </div>

</section>

<!-- education section ends -->

</body>
</html>