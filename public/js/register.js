const input_mail = document.querySelector(".mail");
const label_mail = document.querySelector(".mail label");
const mail_text = document.querySelector(".mail input");

const input_password = document.querySelector(".password");
const label_password = document.querySelector(".password label");
const password_text = document.querySelector(".password input");

const input_name = document.querySelector(".name");
const label_name = document.querySelector(".name label");
const name_text = document.querySelector(".name input");

const input_hobby = document.querySelector(".hobby");
const label_hobby = document.querySelector(".hobby label");
const hobby_text = document.querySelector(".hobby input");

input_mail.addEventListener("click", () => {
    input_mail.classList.add("focus-input");
    label_mail.classList.add("active");
    mail_text.style.display = "block";
    mail_text.focus();
});

mail_text.addEventListener("blur", () => {
    if (mail_text.value === "") {
        input_mail.classList.remove("focus-input");
        label_mail.classList.remove("active");
        mail_text.style.display = "none";
    } else {
        login_input.classList.remove("focus-input");
    }
});

input_password.addEventListener("click", () => {
    input_password.classList.add("focus-input");
    label_password.classList.add("active");
    password_text.style.display = "block";
    password_text.focus();
});

password_text.addEventListener("blur", () => {
    if (password_text.value === "") {
        input_password.classList.remove("focus-input");
        label_password.classList.remove("active");
        password_text.style.display = "none";
    } else {
        login_input.classList.remove("focus-input");
    }
});

input_name.addEventListener("click", () => {
    input_name.classList.add("focus-input");
    label_name.classList.add("active");
    name_text.style.display = "block";
    name_text.focus();
});

name_text.addEventListener("blur", () => {
    if (name_text.value === "") {
        input_name.classList.remove("focus-input");
        label_name.classList.remove("active");
        name_text.style.display = "none";
    } else {
        input_name.classList.remove("focus-input");
    }
});

input_hobby.addEventListener("click", () => {
    input_hobby.classList.add("focus-input");
    label_hobby.classList.add("active");
    hobby_text.style.display = "block";
    hobby_text.focus();
});

hobby_text.addEventListener("blur", () => {
    if (hobby_text.value === "") {
        input_hobby.classList.remove("focus-input");
        label_hobby.classList.remove("active");
        hobby_text.style.display = "none";
    } else {
        hobby_text.classList.remove("focus-input");
    }
});