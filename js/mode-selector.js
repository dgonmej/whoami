// Mode selector

const body = document.querySelector('body');
const main = document.getElementById('main');
const toggle = document.querySelector('.js-change-theme');
const profile = document.getElementById('profile');

toggle.addEventListener('click', () => {
    if (body.classList.contains('text-gray-900')) {
        toggle.innerHTML = "<i class='fas fa-sun'></i>";
        main.style.backgroundImage = "url('../images/wallpaper_secondary.jpg')";
        body.classList.remove('text-gray-900');
        body.classList.add('text-gray-100');
        profile.classList.remove('bg-white');
        profile.classList.add('bg-gray-900');
    } else {
        toggle.innerHTML = "<i class='fas fa-moon'></i>";
        main.style.backgroundImage = "url('../images/wallpaper_primary.jpg')";
        body.classList.remove('text-gray-100');
        body.classList.add('text-gray-900');
        profile.classList.remove('bg-gray-900');
        profile.classList.add('bg-white');
    }
});