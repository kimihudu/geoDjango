// function getData() {
//   return $.getJSON('data.json');
// }

// test data
// var data = [
//   {id: 0, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipOKc_YcqoP7uSnHpU7xxHnzt4lmgboz3OZNu6rk=w1800-h1200-k"},
//   {id: 1, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipOo5pScprBR4WGYN4KqAFSI-VWzhnPIU-Jip3Pr=w1800-h1200-k"},
//   {id: 2, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipMi3jJXHz_xLQW6bzG_VOVwp7fAhWkGdrBaGDVc=w1800-h1200-k"},
//   {id: 3, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipOYT7nS0DVnPvT1NRoVC6sG5mAFTOyOCo5tV8BN=w1800-h1200-k"},
//   {id: 4, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipNbivJKKqZ74WVonvHgqe3KQpHh9QYRQwR8qab0=w1800-h1200-k"},
//   {id: 5, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipP422l1mvvriGLZwz91klLBdvrG1r8iIOWcVLk=w1800-h1200-k"},
//   {id: 6, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipNDz6HWvYm3fOvxrb6sBnOEfY9AoNQyTqTbQxav=w1800-h1200-k"},
//   {id: 7, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipP6dQAWgNygDVwOlsk6npRz2Kk0sNJ9wV5euZzE=w1800-h1200-k"},
//   {id: 8, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipNB1Zs40XbIuR4GCtU-QG_k6GVCRcTdbQWl8e5f=w1800-h1200-k"},
//   {id: 9, link: "#", src: "https://lh3.googleusercontent.com/p/AF1QipNi07rdne3SlgZUihA8lDvzrg3EllHTNOk4BajX=w1800-h1200-k"}
// ];

$(window).on("load", function () {
  //  $.when(getData()).then(function (data) {

  if (data === undefined)
    return;

  var thumbs = data;
  var viewImg = $('.view__img');
  var thWrapper = 0;
  var th = 0;
  var thWidth = 0;

  //show first image
  var imgShow = `<figure>
                <img src='`+ thumbs[0].src + `' />
                <figcaption>`+ thumbs[0].address + `</figcaption>
                </figure>`;

  viewImg.append('<img src = ' + thumbs[0].src + ' >');

  //append all images
  for (var i = 0; i < thumbs.length; i++) {
    $('.thumbs__img').append('<div class = "thumb__wrapper"><a href="' + thumbs[i].link + '" class="thumbnail"><img src = ' + thumbs[i].src + ' ></div></a>');
  }

  //change view image on click
  $('.thumbnail').each(function (index) {
    $(this).on('click', function () {
      viewImg.fadeOut('fast');
      setTimeout(
        function () {
          viewImg.empty().append('<img src = ' + thumbs[index].src + ' >')
            .fadeIn('fast');
        }
        , 200)
    })
  });

  // excecute functions to set thumbs width and button height
  thumbWidth();
  scrollBtn();

  $(window).on('resize mouseenter', function () {
    thumbWidth();
    scrollBtn();
  });

  //thumbs width fuction
  function thumbWidth() {
    var thumbsWidth = $('.slider__view').width();
    $('.slider__thumbs').css('width', thumbsWidth);
  }

  //Btn left right show function
  function scrollBtn() {
    var btnHeight = $('.slider__thumbs').height();
    $('.scroll__btn').css('height', btnHeight);

    $('.slider__thumbs').on('mouseenter mouseleave', function (evt) {
      evt.type === 'mouseenter' ? $(".scroll__btn").fadeIn(300) : $(".scroll__btn").fadeOut(300);
    })
  }

  // right btn scroll function
  $(".right__btn").on('click', rightScroll);

  function rightScroll() {
    thWrapper = $('.thumb__wrapper').last().offset();
    th = $('.thumbs__img').offset();
    thWidth = th.left + $('.thumbs__img').width() - $('.thumb__wrapper').width();
    if (thWrapper.left >= thWidth) {
      $(".scroll__btn").css('opacity', '0.6');
      $('.thumb__wrapper').animate({ right: '+=220.5px' });
    } else {
      $(this).css('opacity', '0.3');
    }
    $('.scroll__btn').prop('disabled', true);
    setTimeout(function () { $('.scroll__btn').prop('disabled', false); }, 400);
    thWrapper = 0
  }

  // left btn scroll function
  $(".left__btn").on('click', leftScroll)

  function leftScroll() {
    thWrapper = $('.thumb__wrapper').first().offset();
    th = $('.thumbs__img').offset();
    if (thWrapper.left != th.left) {
      $(".scroll__btn").css('opacity', '0.6');
      $('.thumb__wrapper').animate({ right: '-=220.5px' });
    } else {
      $(this).css('opacity', '0.3');
    }
    $('.scroll__btn').prop('disabled', true);
    setTimeout(function () { $('.scroll__btn').prop('disabled', false); }, 400);
    thWrapper = 0;
  }

  setTimeout(function () {
    $('.container').animate({ opacity: '1' }, 1000);
  }, 1500)
  //  });
});
