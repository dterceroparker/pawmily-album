let menuBtn = document.getElementById('menu-btn');
let sidebar = document.querySelector('.sidebar');

menuBtn.onclick = function() {
  sidebar.classList.toggle('active')
}