export class Counter {
    constructor() {
        this.rootEl = document.querySelector('.todo-count');

        const [ itemsEl, completedEl] = Array.from(document.querySelectorAll('strong'));

        this.itemsEl = itemsEl;
        this.completedEl = completedEl;
    }

    setItemsCount(all, completed){
        this.itemsEl.innerText = all;
        this.completedEl.innerText = completed;

        
    }
}