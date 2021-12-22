function shopTabs() {
    const shop = {
        render(){
            const tabs = document.querySelectorAll('.shop__nav__tab');
            const container = document.querySelectorAll('.shop__container');

            for (let i = 0; i < tabs.length; i++) {

                tabs[i].addEventListener("click", (e) =>{
                    e.preventDefault();
                    const activeTabAttr = e.target.getAttribute("data-tab");

                    for (let el = 0; el < tabs.length; el++) {
                        const contentAttr = container[el].getAttribute("data-tab-content");

                        if (activeTabAttr === contentAttr) {
                            tabs[el].classList.add("shop__nav__tab-active");
                            container[el].classList.add("shop__container-active"); 
                        } else {
                            tabs[el].classList.remove("shop__nav__tab-active");
                            container[el].classList.remove("shop__container-active");
                        }
                    };
                });
            }
        }
    }


    shop.render();

    return shop;
}


const shop = shopTabs();

