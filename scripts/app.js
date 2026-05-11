document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper === 'undefined') {
        console.error('Ошибка: Swiper не загружен!');
        return;
    }

    const sliderMain = new Swiper('.slider_main', {
        freeMode: true,
        centeredSlides: true,
        mousewheel: true,
        parallax: true,
        speed: 1000,
        breakpoints: {
            0: {
                slidesPerView: 2.5,
                spaceBetween: 20
            },
            680: {
                slidesPerView: 3.5,
                spaceBetween: 60
            }
        }
    });

    const sliderBg = new Swiper('.slider_bg', {
        centeredSlides: true,
        parallax: true,
        spaceBetween: 60,
        slidesPerView: 3.5,
        speed: 1000,
        allowTouchMove: false
    });

    sliderMain.controller.control = sliderBg;

    const slideTexts = document.querySelectorAll('.slide-text');

    function showTextForSlide(index) {
        slideTexts.forEach(text => {
            text.classList.remove('active');
        });

        const activeText = document.querySelector(`.slide-text[data-slide="${index}"]`);
        if (activeText) {
            activeText.classList.add('active');
        }
    }

    function hideAllTexts() {
        slideTexts.forEach(text => {
            text.classList.remove('active');
        });
    }

    const slideDescriptions = [
        {
            title: "Brain (1986)",
            text: "Первый компьютерный вирус для IBM PC, созданный братьями Амджатом и Базитом Алви. Вирус заражал загрузочные сектора дискет и распространялся через копирование."
        },
        {
            title: "Morris Worm (1988)",
            text: "Первый червь, распространившийся через Интернет. Создан Робертом Моррисом как эксперимент, но из-за ошибки вызвал масштабные заражения, поразив около 6000 компьютеров."
        },
        {
            title: "Cascade (1980-е)",
            text: "Один из первых полиморфных вирусов. Проявлял себя визуальным эффектом 'падающих букв' на экране, откуда и получил своё название."
        },
        {
            title: "Jerusalem (1987)",
            text: "Вирус, активировавшийся по пятницам 13-го. Удалял запущенные программы и заражал .exe и .com файлы, вызывая их неоднократное увеличение в размере."
        },
        {
            title: "Melissa (1999)",
            text: "Макровирус, распространявшийся через электронную почту. Создал первую в истории массовую эпидемию, вызвав перегрузку почтовых серверов."
        },
        {
            title: "ILOVEYOU (2000)",
            text: "Вирус, замаскированный под любовное письмо. Стал одним из самых разрушительных, нанеся ущерб более чем на 10 миллиардов долларов."
        },
        {
            title: "Code Red (2001)",
            text: "Червь, атаковавший веб-серверы Microsoft IIS. Использовал уязвимость буфера и планировал DDoS-атаку на Белый дом."
        },
        {
            title: "Sasser (2004)",
            text: "Червь, вызывавший перезагрузку компьютеров без участия пользователя. Использовал уязвимость в службе LSASS и заразил миллионы машин."
        },
        {
            title: "Stuxnet (2010)",
            text: "Первый известный кибер-червь, созданный для атаки на промышленные объекты. Считается совместной разработкой США и Израиля против ядерной программы Ирана."
        }
    ];

    function createTextOverlay(description) {
        let overlay = document.querySelector('.slider-text-overlay');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'slider-text-overlay';

            overlay.innerHTML = `
                <div class="overlay-content">
                    <div class="overlay-text">
                        <h2 class="overlay-title">${description.title}</h2>
                        <p class="overlay-description">${description.text}</p>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    closeTextOverlay();
                }
            });
        }

        return overlay;
    }

    function closeTextOverlay() {
        const overlay = document.querySelector('.slider-text-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 500);
        }
    }

    document.querySelectorAll('.slider__item').forEach((item, index) => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();

            if (this.classList.contains('opened')) {
                this.classList.remove('opened');
                document.body.classList.remove('has-opened');
                hideAllTexts();
                sliderMain.mousewheel.enable();
                sliderMain.allowTouchMove = true;
                closeTextOverlay();

            } else {
                document.querySelectorAll('.slider__item.opened').forEach(openSlide => {
                    openSlide.classList.remove('opened');
                });
                this.classList.add('opened');
                document.body.classList.add('has-opened');
                showTextForSlide(index);
                sliderMain.mousewheel.disable();
                sliderMain.allowTouchMove = false;

                const overlay = createTextOverlay(slideDescriptions[index]);

                setTimeout(() => {
                    overlay.classList.add('active');
                }, 50);
            }
        });
    });

    const desc = document.querySelector('.description');
    if (desc) {
        sliderMain.on('slideChange', function () {
            if (document.body.classList.contains('has-opened')) return;

            if (sliderMain.activeIndex > 0) {
                desc.classList.add('hidden');
            } else {
                desc.classList.remove('hidden');
            }
        });
    }

    document.addEventListener('click', function (e) {
        if (document.body.classList.contains('has-opened') && !e.target.closest('.slider__item')) {
            document.querySelectorAll('.slider__item.opened').forEach(openSlide => {
                openSlide.classList.remove('opened');
            });
            document.body.classList.remove('has-opened');
            hideAllTexts();

            sliderMain.mousewheel.enable();
            sliderMain.allowTouchMove = true;

            closeTextOverlay();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const openedSlide = document.querySelector('.slider__item.opened');
            if (openedSlide) {
                openedSlide.classList.remove('opened');
                document.body.classList.remove('has-opened');
                hideAllTexts();
                sliderMain.mousewheel.enable();
                sliderMain.allowTouchMove = true;
                closeTextOverlay();
            }
        }
    });

    console.log('Слайдеры с отдельными текстами готовы!');

    const magicList = document.querySelector('.magic-list');
    const cursor = document.querySelector('.magic-list-section .cursor');

    if (magicList && cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isHoveringItem = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const hoveredItem = e.target.closest('.magic-list__item');

            if (hoveredItem) {
                if (!isHoveringItem) {
                    isHoveringItem = true;
                    cursor.style.opacity = '1';
                }
            } else {
                if (isHoveringItem) {
                    isHoveringItem = false;
                    cursor.style.opacity = '0';
                }
            }
        });

        document.querySelectorAll('.magic-list__item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                isHoveringItem = true;
                cursor.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                isHoveringItem = false;
                cursor.style.opacity = '0';
            });
        });

        function smoothCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            document.body.style.setProperty('--move-x', cursorX + 'px');
            document.body.style.setProperty('--move-y', cursorY + 'px');

            requestAnimationFrame(smoothCursor);
        }

        smoothCursor();

        document.addEventListener('mouseleave', () => {
            isHoveringItem = false;
            cursor.style.opacity = '0';
        });
    }
});



    window.addEventListener('wheel', function (e) {
        if (isScrolling) return;

        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            const sliderRect = sliderContainer.getBoundingClientRect();
            const isInSlider = sliderRect.top < 100 && sliderRect.bottom > 100;
            autoScrollEnabled = !isInSlider;
        }

        if (!autoScrollEnabled) return;

        e.preventDefault();

        if (e.deltaY > 0) {
            if (currentSectionIndex < sections.length - 1) {
                scrollToSection(currentSectionIndex + 1);
            }
        } else {
            if (currentSectionIndex > 0) {
                scrollToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: false });

    setTimeout(() => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < 100 && rect.top > -100) {
                currentSectionIndex = index;
                console.log('Текущая секция:', index);
            }
        });
    }, 500);

    function createSimpleArrows() {
        const oldArrows = document.querySelectorAll('.nav-arrow');
        oldArrows.forEach(arrow => arrow.remove());

        const arrowUp = document.createElement('div');
        arrowUp.className = 'nav-arrow nav-arrow-up';
        arrowUp.innerHTML = '∧';

        const arrowDown = document.createElement('div');
        arrowDown.className = 'nav-arrow nav-arrow-down';
        arrowDown.innerHTML = '∨';

        document.body.appendChild(arrowUp);
        document.body.appendChild(arrowDown);

        arrowUp.addEventListener('click', function () {
            const sections = [
                document.querySelector('.hero'),
                document.querySelector('.slider-container'),
                document.querySelector('.protection-section'),
                document.querySelector('.magic-list-section')
            ].filter(s => s);

            let currentIndex = 0;
            sections.forEach((s, i) => {
                const rect = s.getBoundingClientRect();
                if (rect.top < 100 && rect.bottom > 100) currentIndex = i;
            });

            if (currentIndex > 0) {
                sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        });

        arrowDown.addEventListener('click', function () {
            const sections = [
                document.querySelector('.hero'),
                document.querySelector('.slider-container'),
                document.querySelector('.protection-section'),
                document.querySelector('.magic-list-section')
            ].filter(s => s);

            let currentIndex = 0;
            sections.forEach((s, i) => {
                const rect = s.getBoundingClientRect();
                if (rect.top < 100 && rect.bottom > 100) currentIndex = i;
            });

            if (currentIndex < sections.length - 1) {
                sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        });

        function checkVisibility() {
            const slider = document.querySelector('.slider-container');
            if (!slider) return;

            const rect = slider.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                arrowUp.style.display = 'flex';
                arrowDown.style.display = 'flex';
            } else {
                arrowUp.style.display = 'none';
                arrowDown.style.display = 'none';
            }
        }

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);
        checkVisibility();
    }

    setTimeout(createSimpleArrows, 1000);
