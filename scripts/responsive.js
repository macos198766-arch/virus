(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
                this.classList.toggle('active');
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            document.addEventListener('click', function(e) {
                if (mobileMenu.classList.contains('active') && 
                    !mobileToggle.contains(e.target) && 
                    !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                const openedSlide = document.querySelector('.slider__item.opened');
                if (openedSlide) {
                    openedSlide.classList.remove('opened');
                    document.body.classList.remove('has-opened');
                    const overlay = document.querySelector('.slider-text-overlay');
                    if (overlay) {
                        overlay.classList.remove('active');
                        setTimeout(() => {
                            if (overlay && overlay.parentNode) {
                                overlay.remove();
                            }
                        }, 500);
                    }
                    const sliderMain = document.querySelector('.slider_main')?.swiper;
                    if (sliderMain) {
                        sliderMain.mousewheel.enable();
                        sliderMain.allowTouchMove = true;
                    }
                }
            }
        });
        
        function checkAndDisableParallax() {
            const isMobile = window.innerWidth <= 768;
            const sliders = document.querySelectorAll('.slider .slider__item');
            if (isMobile) {
                sliders.forEach(slide => {
                    const img = slide.querySelector('.slider__img');
                    if (img && img.style.transform) {
                        img.style.transform = '';
                    }
                });
            }
        }
        
        checkAndDisableParallax();
        window.addEventListener('resize', function() {
            checkAndDisableParallax();
        });
        
        function updateSwiperBreakpoints() {
            const swiperContainer = document.querySelector('.slider_main');
            if (swiperContainer && swiperContainer.swiper) {
                const swiper = swiperContainer.swiper;
                const width = window.innerWidth;
                let slidesPerView = 3.5;
                let spaceBetween = 60;
                if (width <= 576) {
                    slidesPerView = 1.5;
                    spaceBetween = 15;
                } else if (width <= 768) {
                    slidesPerView = 2;
                    spaceBetween = 20;
                } else if (width <= 992) {
                    slidesPerView = 2.5;
                    spaceBetween = 30;
                } else {
                    slidesPerView = 3.5;
                    spaceBetween = 60;
                }
                swiper.params.slidesPerView = slidesPerView;
                swiper.params.spaceBetween = spaceBetween;
                swiper.update();
            }
        }
        
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                updateSwiperBreakpoints();
            }, 250);
        });
        
        setTimeout(updateSwiperBreakpoints, 100);
    });
    
})();

function fixSliderOverflowOnMobile() {
    const isMobile = window.innerWidth <= 768;
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider_main');
    
    if (isMobile) {
        if (sliderContainer) {
            sliderContainer.style.overflow = 'hidden';
            sliderContainer.style.position = 'relative';
        }
        if (slider) {
            slider.style.overflow = 'hidden';
            slider.style.transform = 'rotate(0deg)';
            slider.style.width = '100%';
            slider.style.left = '0';
            slider.style.position = 'relative';
            slider.style.top = '0';
            slider.style.height = 'auto';
        }
        const sliderBg = document.querySelector('.slider_bg');
        if (sliderBg) {
            sliderBg.style.display = 'none';
        }
        const description = document.querySelector('.slider-container .description');
        if (description) {
            description.style.position = 'relative';
            description.style.top = '0';
            description.style.left = '0';
            description.style.maxWidth = '100%';
            description.style.margin = '20px';
            description.style.background = 'rgba(0, 0, 0, 0.6)';
            description.style.borderRadius = '20px';
            description.style.padding = '15px';
        }
    } else {
        if (sliderContainer) {
            sliderContainer.style.overflow = '';
        }
        if (slider) {
            slider.style.overflow = '';
            slider.style.transform = '';
            slider.style.width = '';
            slider.style.left = '';
            slider.style.position = '';
            slider.style.top = '';
            slider.style.height = '';
        }
        const sliderBg = document.querySelector('.slider_bg');
        if (sliderBg) {
            sliderBg.style.display = '';
        }
        const description = document.querySelector('.slider-container .description');
        if (description) {
            description.style.position = '';
            description.style.top = '';
            description.style.left = '';
            description.style.maxWidth = '';
            description.style.margin = '';
            description.style.background = '';
            description.style.borderRadius = '';
            description.style.padding = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', fixSliderOverflowOnMobile);
window.addEventListener('resize', function() {
    setTimeout(fixSliderOverflowOnMobile, 100);
});