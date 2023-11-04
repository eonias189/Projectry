const themeSwitcher = document.getElementById("theme-switcher");
const body = document.body;

themeSwitcher.addEventListener("click", async () => {
    body.classList.toggle("dark");
    setTimeout(() => {
        app().then((appl) => {
            alert(appl.name);
        });
    }, 2000);
});
