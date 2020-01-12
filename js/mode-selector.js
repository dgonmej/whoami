// Mode selector

const toggle = document.querySelector('.js-change-theme');
const body = document.querySelector('body');
const profile = document.querySelectorAll('.profile');
const profileDesktop = document.getElementById('profile-desktop');
const profileMobile = document.getElementById('profile-mobile');
const mainSection = document.getElementById('section-main');
const bottomSection = document.getElementById('section-bottom');
const logosContainer = document.getElementById('logos-container');
const section = document.querySelectorAll('.section-theme');
const box = document.querySelectorAll('.box-theme');

function changeClass(childrens, item, classRemoved, classAdded) {
    if (childrens) {
        item.forEach(i => {
            i.classList.remove(classRemoved);
            i.classList.add(classAdded);
        });
    } else {
        item.classList.remove(classRemoved);
        item.classList.add(classAdded);
    }
};

toggle.addEventListener('click', () => {
    if (body.classList.contains('text-gray-900')) {
        toggle.innerHTML = "<i class='fas fa-sun'></i>";

        profileDesktop.src = 'images/main_3.png';
        changeClass(true, profile, 'bg-teal-700', 'bg-teal-900');
        changeClass(false, profileMobile, 'bg-image-1', 'bg-image-2');

        mainSection.style.backgroundImage = "url('images/wallpaper_secondary.jpg')";
        bottomSection.style.backgroundImage = "url('images/wallpaper_secondary.jpg')";
        
        changeClass(true, box, 'bg-white', 'bg-gray-900');
        changeClass(true, section, 'bg-white', 'bg-black');
        changeClass(false, body, 'text-gray-900', 'text-gray-100');
        changeClass(false, logosContainer, 'bg-white', 'bg-gray-400');
    } else {
        toggle.innerHTML = "<i class='fas fa-moon'></i>";

        profileDesktop.src = 'images/main_1.png';
        changeClass(true, profile, 'bg-teal-900', 'bg-teal-700');
        changeClass(false, profileMobile, 'bg-image-2', 'bg-image-1');
        
        mainSection.style.backgroundImage = "url('images/wallpaper_alternative.jpg')";
        bottomSection.style.backgroundImage = "url('images/wallpaper_primary.jpg')";
        
        changeClass(true, box, 'bg-gray-900', 'bg-white');
        changeClass(true, section, 'bg-black', 'bg-white');
        changeClass(false, body, 'text-gray-100', 'text-gray-900');
        changeClass(false, logosContainer, 'bg-gray-400', 'bg-white');
    }
});

