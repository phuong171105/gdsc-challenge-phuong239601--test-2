const menu = document.querySelector(".navbar__menu");
const menubtn = document.querySelector(".nut__open");
const menubtnclose = document.querySelector(".nut__close");

menubtn.addEventListener('click', () =>{
    menu.classList.toggle("open");
    menubtn.classList.toggle("nut");
    menubtnclose.classList.toggle("nut1");
})
menubtnclose.addEventListener('click', () =>{
    menu.classList.toggle("open");
    menubtnclose.classList.toggle("nut1");
    menubtn.classList.toggle("nut");

})

function validator(option) {
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form__email');
                    if (errorMessage) {
                        errorElement.innerText = errorMessage;
                    } else {
                        errorElement.innerText = '';
                    }
                    return ! errorMessage;
    }

    var formElement = document.querySelector(option.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            option.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isvalid = validate(inputElement, rule);
                if (!isvalid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof option.onsubmit === 'function') {
                    var enableinput = formElement.querySelector('[name]');
                    var formvalue = Array.form(enableinput).reduce(function(value, input) {
                        value[input.name] = input.value;
                        return value;
                    }, {});
                    option.onsubmit(formvalue);
                }
            }

        }


        option.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form__email');
                    errorElement.innerText = '';
                }
            }
        });
    }
}
validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Please insert a valid email'
        }
    };
}
validator ({
    form: '#form_1',
    rules: [
        validator.isEmail('#inbox'),
    ],
     onsubmit: function (data) {
        console.log(data);
     }
});


