$(document).ready(function () {
    var $window = $(window);
    var $body = $('body');
    var scrollTop = 0;
    var relativeScrollTop = 0;
    var bodyHeight = 0;
    var windowHeight = 0;
    var windowWidth = 0;
    var activeKeyFrame = null;
    var keyFrames = [
      {
        wrapper: '#welcome',
        duration: '120%',
        animations: [
          {
            selector: '#first-bubble',
            translateY: '-50%',
            scale: 0.5,
            opacity: 0
          }
        ]
      },
      {
        wrapper: '#team',
        duration: '100%',
        animations: [
          {
            selector: '#second-bubble',
            translateY: '-50%',
            opacity: 0
          }
        ]
      }
    ];

    function init() {
      scrollTop = $window.scrollTop();
      bodyHeight = $body.height();
      windowHeight = $window.height();
      windowWidth = $window.width();
      calcBreakpoints();
      convertValues();
      buildPage();
      console.log(JSON.stringify(keyFrames));
      $window.scroll(debounce(updatePage, 10));
      updatePage();
    }

    function calcBreakpoints() {
      var bodyPaddingTop = $body.innerHeight() - $body.height();
      keyFrames.forEach(function (kf) {
        var $w = $(kf.wrapper);
        kf.on = $w.position().top - bodyPaddingTop;
        kf.height = $w.height() * parseInt(kf.duration) / 100;
        kf.off = kf.on + kf.height;
      });
      keyFrames.sort(function (kf1, kf2) { return kf1.on - kf2.on });
    }

    function updatePage() {
      window.requestAnimationFrame(function () {
        scrollTop = $window.scrollTop();
        if (scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
          animateElements();
          checkKeyFrame();
        }
      });
    }

    function animateElements() {
      if (activeKeyFrame == null) return;
      var kf = keyFrames[activeKeyFrame];
      relativeScrollTop = scrollTop - kf.on;

      var animation, translateY, translateX, scale, rotate, opacity;
      for (var i = 0; i < kf.animations.length; i++) {
        animation = kf.animations[i];
        translateY = calcPropValue(animation, 'translateY');
        translateX = calcPropValue(animation, 'translateX');
        scale = calcPropValue(animation, 'scale');
        rotate = calcPropValue(animation, 'rotate');
        opacity = calcPropValue(animation, 'opacity');
        $(animation.selector).css({
          transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)',
          'opacity': opacity
        })
      }
    }

    function checkKeyFrame() {
      activeKeyFrame = null;
      for (var i = 0; i < keyFrames.length; i++) {
        if (scrollTop < keyFrames[i].on) break;
        if (scrollTop > keyFrames[i].off) continue;
        activeKeyFrame = i;
      }
    }

    function calcPropValue(animation, property) {
      var value = animation[property];
      return value ?
        easeInOutQuad(relativeScrollTop, value[0], (value[1] - value[0]), keyFrames[activeKeyFrame].height) :
        getDefaultPropertyValue(property);
    };

    function convertValues() {
      keyFrames.forEach(function (kf) {
        kf.animations.forEach(function (anim) {
          Object.keys(anim).forEach(function (key) {
            if (key === 'selector') return;
            var val = anim[key];
            if (val instanceof Array) {
              for (var i = 0; i < val.length; i++)
                val[i] = convertPercentToPx(val[i], (key === 'translateY') ? 'y' : 'x');
            } else
              val = convertPercentToPx(val, (key === 'translateY') ? 'y' : 'x');
            anim[key] = val;
          });
        });
      });
    }

    function buildPage() {
      keyFrames.forEach(function (kf) {
        kf.animations.forEach(function (anim) {
          Object.keys(anim).forEach(function (key) {
            if (key === 'selector') return;
            var val = anim[key];
            if (val instanceof Array === false)
              val = [getDefaultPropertyValue(key), val];
            anim[key] = val;
          });
        });
      });
    }

    function getDefaultPropertyValue(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1;
        case 'rotate':
          return 0;
        case 'opacity':
          return 1;
        default:
          return null;
      }
    }

    function convertPercentToPx(value, axis) {
      if (typeof value === 'string' && value.match(/%/g)) {
        if (axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
        if (axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
      }
      return value;
    }

    function easeInOutQuad(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
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
  }
);