$(document).ready(function () {
    var $news = $('.sec-division .news');

    function init() {
        initSlider();
    }

    function initSlider() {
        $prev = $('.sec-division .slider-prev');
        $next = $('.sec-division .slider-next');
        $news.slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: $prev,
            nextArrow: $next,
            responsive: [
                {
                    breakpoint: 920,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    init();
});