$(document).ready(function () {
  var $document = $(document);
  var $eim = $('.eim-modal');
  var $dialog = $('.eim-dialog');
  var $closeBtn = $('.eim-dialog .close');
  var $form = $('#wpform');
  var $captchaErr = $('#captcha-error');
  var $olSuccess = $('.ol.success');
  var $olError = $('.ol.error');

  function init() {
    initEIM();
  }

  function initEIM() {
    initExitIntent($document, showEIM);
    $closeBtn.click(switchOffEIM);
    $dialog.click(function (e) { e.stopImmediatePropagation(); });
    $eim.click(switchOffEIM);
    $form.submit(submitForm);
  }

  function submitForm(e) {
    e.preventDefault();
    var res = $('#captcha-response').val();
    if (!res) {
      $captchaErr.addClass('visible');
      return;
    }
    var data = $form.serialize();
    var url = r('uggcf://n727nsq9.fvosbezf.pbz/freir/ZHVRNRbTAoOADQe6WVCJjhYrwXKLDzGZJfIssvnlAop-VDaU7vVW_z9y6o6tDET3FuUtjfK6GBJwJUJY4u7QEM4rfq-0bBd5GTUobhuMvpybuKsaid_pdD20kemvzJeytaBj8p-GViK_zAKezuR8mR5KEPGuTKDmY4a8KR5KnLtLAhmNA3CMdagML76yIkHFw9xgkbgl66js_yxN?vfNwnk=1');
    setLoading(true);
    var req = {
      type: 'POST',
      url: url,
      data: data,
      dataType: 'json',
      success: reportSuccess,
      error: reportError,
    };
    $.ajax(req);
  }

  function setLoading(loading) {
    $('input[name="gender"]').prop('disabled', loading);
    $('#lastName').prop('disabled', loading);
    $('#email').prop('disabled', loading);
    $('button').prop('disabled', loading);
    if (loading) {
      $('.btn-text').css('display', 'none');
      $('.lds-ripple').css('display', 'inline-block');
    } else {
      $('.btn-text').css('display', 'inline-block');
      $('.lds-ripple').css('display', 'none');
    }
  }

  function reportSuccess() {
    setLoading(false);
    $olSuccess.addClass('visible');
    setTimeout(switchOffEIM.bind(null, 365), 3500);
  }

  function reportError() {
    setLoading(false);
    $olError.addClass('visible');
    setTimeout(function () {
      $olError.removeClass('visible');
    }, 3500);
  }

  function showEIM() {
    $eim.addClass('visible');
    bodyScrollLock.disableBodyScroll($dialog);
  }

  function hideEIM() {
    $eim.removeClass('visible');
    bodyScrollLock.enableBodyScroll($dialog);
  }

  function initExitIntent(doc, cb) {
    var suppressEIM = readCookie('suppressEIM');
    if (suppressEIM) return;
    $.exitIntent('enable');
    doc.bind('exitintent', cb);
  }

  function switchOffEIM(days) {
    var numDays = !isNaN(days) ? days : 1;
    var suppressEIM = readCookie('suppressEIM');
    if (!suppressEIM) {
      createCookie('suppressEIM', true, numDays);
      $.exitIntent('disable');
    }
    hideEIM();
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function r(s) {
    return s.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  };

  init();
});