// selector
const menu = document.querySelector('.hamburger');
const navegacion = document.querySelector('.navegacion');

// event
menu.addEventListener('click', toggleMenu);
document.addEventListener('scroll', scrollNav);

// method
function toggleMenu (event) {
  event.preventDefault();
    
  this.classList.toggle('is-active');
  navegacion.classList.toggle('navegacion__mostrar');
}

function scrollNav() {
    const scrolling = window.scrollY;
    const headerTop = document.querySelector('.header__top');
    const headerTexto = document.querySelector('.header__texto-logo');
    const navegacionEnlace = document.querySelectorAll('.navegacion__enlace');
    navegacionEnlace.forEach( enlace => {
      colorNegro(enlace);
    });

    const layer = document.querySelectorAll('.layer');
    layer.forEach( elemento => {
        if(scrolling > 0){
          elemento.classList.add('negro');
          return;
        }

        if(scrolling <= 0){
          elemento.classList.remove('negro');
          return;
        }
    });

    if(scrolling > 0){
        headerTop.classList.add('bg-blanco');
        headerTexto.classList.add('text-black');
        return;
    }

    if(scrolling <= 0){
        headerTop.classList.remove('bg-blanco');
        headerTexto.classList.remove('text-black');
        return;
    }
}

function colorNegro(elemento) {
  const scrolling = window.scrollY;
  const activo = document.querySelector('.navegacion__enlace--activo');
  
  if(scrolling > 0){
    elemento.classList.add('black');
    activo.classList.remove('black');
    return;
  }
  if(scrolling <= 0){
    elemento.classList.remove('black');
    return;
  }
}
