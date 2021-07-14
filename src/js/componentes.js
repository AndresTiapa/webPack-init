// para realizar esta importacion, antes se deben instalar el css-loader
// npm install -D style-loader css-loader  
//verificar que se haya añadido en el package,json estas deoendencias


// import './style.css';
import '../css/componentes.css';
// se realiza la importacion de la imagen
import webpacklogo from '../assets/img/webpack-logo.png';

export const miFuncion = (nombre) => {
    //  const objeto = document.querySelector();
    console.log('Creando etiqueta h1: ')
    const titulo = document.createElement('h1');
    titulo.innerHTML = `Hola, ${nombre}`;
    document.body.append(titulo);


    //contruyendo la imagen
    // se debe ejecutar la siguiente dependencia
    // npm install file-loader --save-dev
    const img = document.createElement('img');
    img.src = webpacklogo;
    document.body.append(img);
}