const body = document.body;
const themeSwitcher = document.getElementById('theme-switcher');

themeSwitcher.onclick = () => {
    body.classList.toggle('dark');
};