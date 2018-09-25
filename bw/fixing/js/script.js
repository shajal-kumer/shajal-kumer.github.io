
let sectionProjectHeight = document.querySelector('.section__project').clientHeight - 55;
let header = document.querySelector('.header');

console.log();
window.onscroll = function () {
    console.log();
    if (window.pageYOffset > sectionProjectHeight) {
        header.classList.add('is--active');
        console.log('He');
        
        
    }
    
}
