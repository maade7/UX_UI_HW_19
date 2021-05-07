


function main() {


(function () {
   'use strict';

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

	
    // Show Menu on Book
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 800;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });

	// Hide nav on click
  $(".navbar-nav li a").click(function (event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });
	
  	// Portfolio isotope filter
    $(window).load(function() {
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });


    });
	

    // Nivo Lightbox 
    $('.portfolio-item a').nivoLightbox({
        effect: 'slideDown',
        keyboardNav: true,
    });


}());


}
main();


$(document).ready(function () {
    $('.vp-center').css({'display':'block'});
});


$('.modal').on('shown.bs.modal', function () {
    $('.img-responsive').trigger('focus');
});


$(".img-responsive").on("click", function() {


    if ($(this).attr("id")) {
        var vimeoLink = $(this).attr("id");
        $('#video').attr('src','//player.vimeo.com/video/'+ vimeoLink +'?api=1&player_id=vimeoplayer&title=0&amp;byline=0&amp;portrait=0');
        $('#video').addClass('iframe-video');
        $('#link').text('');
        $('#link').attr('href','#');
        $('.modal').modal('show');
        var iframe = document.querySelector('iframe');
        var player = new Vimeo.Player(iframe);
        $('.modal').on('shown.bs.modal', function () {
            player.play();
        });
    }
    if ($(this).attr("data")) {
        var webLink = $(this).attr("data");
        $('#video').attr('src',webLink);
        $('#video').addClass('iframe-website');
        $('#link').text('OPEN IN NEW WINDOW');
        $('#link').attr("href", webLink);
        $('.modal').modal('show');
    }
    if ($(this).attr("data-2")) {
        var doc = $(this).attr("data-2");
        $('#video').attr('src',doc);
        $('#video').addClass('iframe-ux');
        $('#link').text('OPEN IN NEW WINDOW');
        $('#link').attr('href',doc);
        $('.modal').modal('show');
    }
});



$('.modal').on('hidden.bs.modal', function () {
    $('#video').attr('src','Loading.html');
    $('#video').removeClass('iframe-ux');
    $('#video').removeClass('iframe-website');
    $('#video').removeClass('iframe-video');
});




// particlesJS.load('js/particles-js', 'css/particles.json', function() {
//   console.log('particles.js loaded - callback');
// });

particlesJS('particles-js',
  
  {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 200,
        "height": 200
      }
    },
    "opacity": {
      "value": 0.47300655795532925,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4.008530152163807,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2.4362316369040355,
        "size_min": 0.8120772123013452,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 160.3412060865523,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1.763753266952075
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 100,
        "rotateY": 100
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 150,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

);