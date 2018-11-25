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
  var $contactSlider = $('#contact-slider');
  var $contactTab = $('.contact .tab');
  var $sliderArrow = $('.contact .arrow');
  var mobileNavVisible = false;
  var scrollTop = 0;
  var h50 = $window.height() / 2;
  var isMainPage = false;
  var lang = '';

  function init() {
    initNav();
    initCookieConsent();
    initLangDd();
    initContactSlider();
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
    $('a.nav-link').click(scrollToAnchor);
    lang = $navbar.data('lang') || 'de';
    var vals = window.location.href.split(lang)[1].split('/');
    isMainPage = vals.length > 0;
  }

  function initCookieConsent() {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#ffffff",
          "text": "#000000"
        },
        "button": {
          "background": "#515e7c"
        }
      },
      "content": {
        "message": msgs[lang].cookie,
        "dismiss": msgs[lang].ok,
        "link": msgs[lang].learnMore
      }
    });
  }

  function scrollToAnchor(event) {
    var target = this.hash;
    var el = $(this.hash);
    if (!el.length) return;
    event.preventDefault();
    var navOffset = 0;
    if (mobileNavVisible) $mobileNav.fadeOut();
    return $('html, body').animate({
      scrollTop: el.offset().top - navOffset
    }, 300, function () {
      return window.history.pushState(null, null, target);
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

  function initContactSlider() {
    $contactTab.click(toggleContactSlider);
  }

  function toggleContactSlider() {
    var open = $contactSlider.hasClass('open');
    if (open) {
      $contactSlider.css({ top: '100%' });
      $contactSlider.removeClass('open');
      $sliderArrow.removeClass('active');
    } else {
      $contactSlider.css({ top: $window.height() - $contactSlider.height() - 36 });
      $contactSlider.addClass('open');
      $sliderArrow.addClass('active');
    }
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

var msgs = {
  de: {
    cookie: 'Diese Webseite verwendet Cookies um Ihr Nutzungserlebnis zu verbessern.',
    ok: 'OK',
    learnMore: 'Mehr erfahren'
  },
  en: {
    cookie: 'This website uses cookies to improve your user experience.',
    ok: 'Got it',
    learnMore: 'Learn more'
  }
};