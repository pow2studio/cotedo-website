$(document).ready(function () {
  var $window = $(window);
  var $members = $('.sec-team .members');
  var counters = $('.countup');
  var countUpFired = false;
  var countUpOpts = { useEasing: true, useGrouping: false };
  var countUpDuration = 2.5;
  var countUpTrigger = 0;
  var scrollTop = 0;

  function init() {
    initCards();
    initSlider();
    initScrollSpy();
    $window.scroll(debounce(checkScrollTop, 100));
    checkScrollTop();
  }

  function initCards() {
    $(".card").flip({ axis: 'x', trigger: 'hover' });
  }

  function initSlider() {
    $prev = $('.sec-team .slider-prev');
    $next = $('.sec-team .slider-next');
    // Randomize the slides
    $members.each(function () {
      $(this).children().sort(function () {
        return Math.round(Math.random()) - 0.5;
      }).detach().appendTo(this);
    });
    $members.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $prev,
      nextArrow: $next,
      responsive: [
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }

  function initScrollSpy() {
    gumshoe.init();
  }

  function startCountUp() {
    counters.each(function () {
      $(this).data('counter').start();
    });
    countUpFired = true;
  }

  function checkScrollTop() {
    scrollTop = $window.scrollTop();
    if (!countUpFired && scrollTop > countUpTrigger)
      startCountUp();
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  init();
});