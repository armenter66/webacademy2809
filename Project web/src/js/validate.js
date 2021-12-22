const registerForm = document.querySelector('.connect__form');
const nameField = registerForm.elements.email;
const nameErrorEl = findErrorEl(nameField);

registerForm.addEventListener('input', onSubmit);

function findErrorEl(el) {
            return el.closest('.connect__form').querySelector('.connect__error');
}

console.log(nameErrorEl);

function onSubmit(e) {
            e.preventDefault();

            const name = nameField.value.trim();

            if (!name || !/@/i.test(name)) {
                nameErrorEl.innerText = 'Please use correct email address which contains @';
                nameErrorEl.hidden = false;
            } else {
                nameErrorEl.innerText = '';
                nameErrorEl.hidden = true;
            }

            nameField.addEventListener('blur', k =>{
                nameErrorEl.hidden = true;
            })
}