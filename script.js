$(document).ready(function(){

   $('.nav-item').click(function(){
       $(this).siblings().removeClass('active-nav');
       $(this).addClass('active-nav');
   });

   $('.view-all-btn').click(function(){
     $('body').addClass('disable-scroll');  
     //$('body').css('padding-bottom', '100px'); 
   });

   $('.close').click(function(){
    $('body').removeClass('disable-scroll');   
  });

  $('.nav-menu-btn').click(function(){
    $('.nav-list').toggleClass('show-nav');   
  });


// SLIDER ***********
if(screen.width > 425){
  slide();
}

function slide(){
 
   $('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;
    
    function move(newIndex) {
      var animateLeft, slideLeft;
      
      advance();
      
      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }
      
      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');
      
      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }
      
      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }
    
    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }
    
    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });
    
    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });
  
    
    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');
      
      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
    
    advance();
  });
}



 



  //SLICK SLIDER
  
    $('.featured-dishes-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      variableWidth:true,
      speed:3000,
      arrows:false,
      dots:true,
      appendDots:$('.add-dots'),

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // centerMode: true,
            dots:false
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });


    $('.heart').each(function(){
      $(this).on('click', function() {
          var count = parseInt($(this).data('click'), 10) || 0;
          $(this).css({'fill': '#F34949', 'stroke': '#F34949'});
          count++;
          $(this).data('click', count);
          $(this).next().html('<span>' + count + ' people love this</span>');
      });
  });



});

//SMOOTH SCROLL

 // Select all links with hashes
 $('a[href*="#"]')
 // Remove links that don't actually link to anything
 .not('[href="#"]')
 .not('[href="#0"]')
 .click(function(event) {
 // On-page links
  
 if (
     location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
     && 
     location.hostname == this.hostname
 ) {
     // Figure out element to scroll to
     var target = $(this.hash);
     
     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
     // Does a scroll target exist?
     if (target.length) {
     // Only prevent default if animation is actually gonna happen
     event.preventDefault();
     $('html, body').animate({
         scrollTop: target.offset().top - 78
     }, 1000, function() {
         // Callback after animation
         // Must change focus!
        //  var $target = $(target);
        //  $target.focus();
        //  if ($target.is(":focus")) { // Checking if the target was focused
        //  $target.css('outline', '0');
        //  return false;
        //  } else {
        //  $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        //  $target.focus(); // Set focus again
        //  };
     });
     }
 }
 });

 


//MODAL

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}