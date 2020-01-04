// Mode selector

const toggle = document.querySelector('.js-change-theme');
const body = document.querySelector('body');
const profile = document.getElementById('profile');
const mainSection = document.getElementById('section-main');
const bottomSection = document.getElementById('section-bottom');
const logosContainer = document.getElementById('logos-container');
const section = document.querySelectorAll('.section-theme')
const box = document.querySelectorAll('.box-theme')

const title = document.querySelectorAll('.title');

toggle.addEventListener('click', () => {
    if (body.classList.contains('text-gray-900')) {
        toggle.innerHTML = "<i class='fas fa-sun'></i>";

        body.classList.remove('text-gray-900');
        body.classList.add('text-gray-100');

        profile.classList.remove('bg-white');
        profile.classList.add('bg-gray-900');

        mainSection.style.backgroundImage = "url('../images/wallpaper_secondary.jpg')";
        bottomSection.style.backgroundImage = "url('../images/wallpaper_secondary.jpg')";

        logosContainer.classList.remove('bg-white');
        logosContainer.classList.add('bg-gray-400');

        section.forEach(item => {
            item.classList.remove('bg-white');
            item.classList.add('bg-black');
        })

        box.forEach(item => {
            item.classList.remove('bg-white');
            item.classList.add('bg-gray-900');
        })

        title.forEach(item => {
            item.classList.remove('text-teal-700');
            item.classList.add('text-gray-100');
        })
    } else {
        toggle.innerHTML = "<i class='fas fa-moon'></i>";

        body.classList.remove('text-gray-100');
        body.classList.add('text-gray-900');

        profile.classList.remove('bg-gray-900');
        profile.classList.add('bg-white');

        mainSection.style.backgroundImage = "url('../images/wallpaper_primary.jpg')";
        bottomSection.style.backgroundImage = "url('../images/wallpaper_primary.jpg')";

        logosContainer.classList.remove('bg-gray-400');
        logosContainer.classList.add('bg-white');

        section.forEach(item => {
            item.classList.remove('bg-black');
            item.classList.add('bg-white');
        })

        box.forEach(item => {
            item.classList.remove('bg-gray-900');
            item.classList.add('bg-white');
        })

        title.forEach(item => {
            item.classList.remove('text-gray-100');
            item.classList.add('text-teal-700');
        })
    }
});