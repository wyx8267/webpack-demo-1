!function () {
    var view = document.querySelector('#mySlides')
    var controller = {
        view: null,
        swiper: null,
        init: function (view) {
            this.view = view
            this.initSwiper()
        },
        initSwiper: function () {
            this.swiper = new Swiper(view.querySelector('.swiper-container'), {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            })
        }


    }
    controller.init(view)
}.call()
