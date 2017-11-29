$(document).ready(function () {
  var $window = $(window);
  var $navbarToggle = $('.nav-btn.toggle');
  var $navClose = $('.nav-btn.close');
  var $mobileNav = $('.mobile-nav');
  var $navbar = $('#navbar');
  var $newsIndicator = $('.news-indicator');
  var $newsSection = $('.sec-news');
  var $langDd = $('.lang-dd');
  var $langChooser = $('.lang-chooser');
  var mobileNavVisible = false;
  var scrollTop = 0;
  var h50 = $window.height() / 2;

  function init() {
    initNav();
    initLangDd();
    checkNews();
    if ($newsSection.length) {
      $window.scroll(trackNewsInView);
      trackNewsInView();
    }
  }

  function initNav() {
    $navbarToggle.click(function () {
      $mobileNav.fadeIn();
      mobileNavVisible = true;
    });
    $navClose.click(function () {
      $mobileNav.fadeOut();
      mobileNavVisible = false;
    });
    $('a.pure-menu-link').click(function (event) {
      var target = this.hash;
      event.preventDefault();
      var navOffset = $navbar.height() - 6;
      if (mobileNavVisible) $mobileNav.fadeOut();
      return $('html, body').animate({
        scrollTop: $(this.hash).offset().top - navOffset
      }, 300, function () {
        return window.history.pushState(null, null, target);
      });
    });
  }

  function initLangDd() {
    $langDd.click(toggleLangDd);
    $('ul.lang-chooser li a').click(toggleLangDd);
    $langChooser.css({ display: 'block' });
    $langChooser.hide();
  }

  function toggleLangDd() {
    $langChooser.slideToggle(200);
  }

  function checkNews() {
    var lastRead = new Date(parseInt(readCookie('newsLastRead')) || 0);
    var latest = new Date($newsIndicator.data('latest'));
    if (latest.getTime() - lastRead.getTime() < 0) return;
    $newsIndicator.css({ display: 'block' });
  }

  function trackNewsInView() {
    scrollTop = $window.scrollTop();
    if (scrollTop > $newsSection.position().top - h50)
      hideNewsIndicator();
  }

  init();
});