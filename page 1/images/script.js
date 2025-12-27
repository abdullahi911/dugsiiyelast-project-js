document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector('#registrationForm');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const errorMsg = document.querySelector('#error');
    const successMsg = document.querySelector('#succes');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent form from submitting

        let isValid = true; // Track if all fields are valid
        errorMsg.textContent = '';
        successMsg.textContent = '';

        // --- Email Validation ---
        const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
            setInvalid(email);
            isValid = false;
        } else {
            setValid(email);
        }

        // --- Password Validation ---
        if (password.value.trim() === '' || password.value.length < 8) {
            setInvalid(password);
            isValid = false;
        } else {
            setValid(password);
        }

        // --- Confirm Password Validation ---
        if (confirmPassword.value.trim() === '' || confirmPassword.value !== password.value) {
            setInvalid(confirmPassword);
            isValid = false;
        } else {
            setValid(confirmPassword);
        }

        // --- Show messages ---
        if (!isValid) {
            errorMsg.textContent = "Please correct the highlighted fields!";
        } else {
            successMsg.textContent = "✅ Successfully registered!";
            // Optional: reset form
            // form.reset();
        }
    });

    function setInvalid(input) {
        input.classList.add("invalid");
        input.classList.remove("valid");
    }

    function setValid(input) {
        input.classList.add("valid");
        input.classList.remove("invalid");
    }

});
