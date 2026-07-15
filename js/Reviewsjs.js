const swiper = new Swiper('.swiper', {
    //Optional Parameters
    direction: 'vertical',
    loop: true,

    //If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    //Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        nextEl: '.swiper-button-prev',
    },

    //And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});