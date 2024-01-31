const login_input = document.querySelector("div.input");
const login_label = document.querySelector("div.input label");
const login_text = document.querySelector("div.input input");

login_input.addEventListener("click", () => {
    login_input.classList.add("focus-input");
    login_label.classList.add("active");
    login_text.style.display = "block";
    login_text.focus();
});

login_text.addEventListener("blur", () => {
    if (login_text.value === "") {
        login_input.classList.remove("focus-input");
        login_label.classList.remove("active");
        login_text.style.display = "none";
    } else {
        login_input.classList.remove("focus-input");
    }
});