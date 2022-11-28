$(document).ready(function () {
  var $document = $(document);
  var $eim = $('.eim-modal');
  var $dialog = $('.eim-dialog');
  var $closeBtn = $('.eim-dialog .close');
  var $form = $('#wpform');
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
    // $form.submit(submitForm);
  }

  function submitForm(e) {
    e.preventDefault();
    var GM = { m: 1, f: 2 }
    var gender = $('input[name="gender"]:checked').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var url = r('uggcf://n727nsq9.fvosbezf.pbz/freir/ZHVRNB3sqbYEAupb5mGqKSHh7NWepeXS6Gv59xgaJexnBHVu2XIIwKcw5GT1kKhJ6HsWJ8CI3EFK0LgGsMB_9X-D1gfTsre2D_g9E0-hntKaqmWmeWcbK0HY_04v8iba8WEpL-qFEP8nmR0DBTAq5Yb2U_aFLwDpVfl8ZMiMM7lRsU90jkUvmpOKiJr1GjBo6m6jk6yMQ6r8aqrt');
    setLoading(true);
    $.ajax({
      type: 'POST',
      url: url,
      data: { GESCHLECHT: GM[gender], NAME: lastName, EMAIL: email },
      success: reportSuccess,
      error: reportError,
    });
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
    setTimeout(hideEIM, 3500);
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