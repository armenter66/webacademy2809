function Modal() {
    
    this.findElems();
    this.overlayAdd();
    this.closeOverlay();
}

Modal.prototype.findElems = function() {
    const modalBtns = Array.from(document.querySelectorAll('.modal-js-button'));
    const overlayEl = document.querySelector('.overlaymodal');
    const closeBtn = document.querySelector('.modal__close');

    this.modalBtns = modalBtns;
    this.overlayEl = overlayEl;
    this.closeBtn = closeBtn;
}

Modal.prototype.overlayAdd = function () {
    this.modalBtns.forEach( item => {
        item.addEventListener('click', ev => {
            ev.preventDefault();

            const modalId = item.getAttribute('data-modal');
            const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
            
            this.overlayEl.classList.add('active');
        });
    });
}

Modal.prototype.closeOverlay = function() {

    this.closeBtn.addEventListener('click', () => {
        this.overlayEl.classList.remove('active');   
    });
}


const modalComing = new Modal();