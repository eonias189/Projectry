const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', async () => {
    body.classList.toggle('dark');
    let appl = await app();
    alert(appl.name);
});