// Return to top

const returnTop = document.getElementById('return-top');

returnTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    returnTop.style.display = "block";
  } else {
    returnTop.style.display = "none";
  }
}