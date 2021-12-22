function makeSlider() {
    const slider = {
        slideIndex: 1,
        timer: 0,
        showSlides(el) {
            let i;
            const slides = document.getElementsByClassName("slider__item");
            if (el > slides.length) {
            this.slideIndex = 1
            }
            if (el < 1) {
                this.slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[this.slideIndex - 1].style.display = "block";
        }, 
        plusSlide() {
            const plusBtn = document.querySelector('.next');
            plusBtn.addEventListener('click', () => {
                this.showSlides(this.slideIndex += 1);
            });
        },
        minusSlide() {
            const minusBtn = document.querySelector('.prev');
            minusBtn.addEventListener('click', ()=> {
                this.showSlides(this.slideIndex -= 1); 
            })  
        },
        currentSlide(el) {
            this.showSlides(this.slideIndex = el);
        },
        makeTimer() {
            clearInterval(this.timer) 
            this.timer = setInterval(() =>{
            this.slideIndex++;
            this.showSlides(this.slideIndex);
            },4000);
        }
         
    };

    
    slider.minusSlide();
    slider.plusSlide();
    
    slider.makeTimer();
    slider.showSlides();


    return slider;
}

const sliderRun = makeSlider();


