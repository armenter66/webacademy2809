function makeHamburger() {
    const hamburger = {
        searchElements() {
            const hamburgerBtn = document.querySelector('.hamburger');
            const menuBlock = document.querySelector('.menu');
            const closeBtn = document.querySelector('.menu__close');

            this.hamburgerBtn = hamburgerBtn;
            this.menuBlock = menuBlock;
            this.closeBtn = closeBtn; 
        },
        clickHamb() {
          this.hamburgerBtn.addEventListener('click', () => {
          this.menuBlock.classList.toggle('active');
          });
        },
        close() {
            this.closeBtn.addEventListener('click', () =>
            {
              this.menuBlock.classList.remove('active');
            });
        },
        render() {
          this.searchElements();
          this.clickHamb();
          this.close();
        }

    }

    hamburger.render();

    return hamburger;
}

const hamburger = makeHamburger();