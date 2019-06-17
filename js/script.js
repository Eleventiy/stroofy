/**
 * Sticky header function
 */
function stickyHeader() {
    // When window is scroll
    window.onscroll = function () {
        var header = document.querySelector('.NavContainer-sc-1hny48c-0'); // Main header element
        var headerHeight = header.offsetHeight; // Main header height
        var linksArray = document.querySelectorAll('.NavLink__NavLinkContainer-slfaqa-0');
        var lastLink = linksArray[linksArray.length - 1];

        if (window.pageYOffset > headerHeight) {
            header.classList.remove('kuBnqT');
            header.classList.add('iebsHb');

            lastLink.classList.remove('dBCfoV');
            lastLink.classList.add('loqwYk');
        } else {
            header.classList.remove('iebsHb');
            header.classList.add('kuBnqT');

            lastLink.classList.remove('loqwYk');
            lastLink.classList.add('dBCfoV');
        }
    }
}
stickyHeader();


/**
 * Swiper slider
 */
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});