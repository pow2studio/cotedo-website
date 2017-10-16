$(document).ready(function () {
  var $window = $(window);
  var $intro = $('#intro');
  var $stats = $('#stats');
  var $strengths = $('#strengths');
  var $teamCover = $('#team-cover');
  var $secondBubble = $('#second-bubble');
  var $team = $('#team');
  var $members = $('#team .members');
  var $news = $('#news');
  var $footer = $('footer');
  var counters = $('.countup');
  var countUpFired = false;
  var countUpOpts = { useEasing: true, useGrouping: false };
  var countUpDuration = 2.5;
  var countUpTrigger = 0;
  var scrollTop = 0;

  function init() {
    initCounters();
    initSlider();
    updatePositions();
    new Rellax('.rellax');
    $window.scroll(debounce(checkScrollTop, 100));
    $window.resize(debounce(updatePositions, 100));
    checkScrollTop();
  }

  function updatePositions() {
    $stats.css({ top: $intro.position().top + $intro.outerHeight() + 'px' });
    $strengths.css({ top: $stats.position().top + $stats.outerHeight() + 'px' });
    $teamCover.css({ top: $strengths.position().top + $strengths.outerHeight() + 'px' });
    $secondBubble.css({ top: $teamCover.position().top + $teamCover.height() - 290 + 'px ' });
    $team.css({ top: $teamCover.position().top + $teamCover.height() + 'px' });
    $news.css({ top: $team.position().top + $team.outerHeight() + 'px' });
    $footer.css({ position: 'absolute', top: $news.position().top + $news.outerHeight() + 'px' });
    countUpTrigger = $stats.position().top - $window.height();
  }

  function initCounters() {
    counters.each(function (i) {
      var id = 'cu' + i;
      var val = parseInt($(this).text());
      $(this).attr('id', id);
      $(this).data('counter', new CountUp(id, 0, val, 0, countUpDuration, countUpOpts));
    });
  }

  function initSlider() {
    $prev = $('#team .slider-prev');
    $next = $('#team .slider-next');
    // Randomize the slides
    $members.each(function () {
      $(this).children().sort(function () {
        return Math.round(Math.random()) - 0.5;
      }).detach().appendTo(this);
    });
    $members.slick({
      infinite: true,
      slidesToShow: 3,
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