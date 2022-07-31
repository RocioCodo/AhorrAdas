/*Ocultar Paneles*/

const vistaBalance =document.getElementById('vistaBalance');
const vistaCategorias =document.getElementById('vistaCategorias');
const vistaReportes =document.getElementById('vistaReportes');
const vistaNuevaOperacion = document.getElementById('vistaNuevaOperacion');
// const vistaEditarCategorias = document.getElementById('vistaEditarCategorias');

const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-nuevaOperacion');
// const editarP = document.getElementsByClassName('editar-p');
const btnCandelarNuevaOp = document.getElementById('btnCandelarNuevaOp');



 btnCategorias.addEventListener('click', () => {
      vistaBalance.classList.add('d-none');
      vistaReportes.classList.add('d-none');
      vistaCategorias.classList.remove('d-none');
      vistaNuevaOperacion.classList.add('d-none');

  })

  btnReportes.addEventListener('click', () => {
    vistaBalance.classList.add('d-none');
    vistaReportes.classList.remove('d-none');
    vistaCategorias.classList.add('d-none');
    vistaNuevaOperacion.classList.add('d-none');

})

btnBalance.addEventListener('click', () => {
    vistaBalance.classList.remove('d-none');
    vistaReportes.classList.add('d-none');
    vistaCategorias.classList.add('d-none');
    vistaNuevaOperacion.classList.add('d-none');

})

btnNuevaOperacion.addEventListener('click', () => {
    vistaBalance.classList.add('d-none');
    vistaNuevaOperacion.classList.remove('d-none');

})

// editarP.addEventListener('click', () => {
//     vistaEditarCategorias.classList.remove('d-none');
//     vistaCategorias.classList.add('d-none');

// })

btnCandelarNuevaOp.addEventListener('click', () => {
    vistaBalance.classList.remove('d-none');
    vistaNuevaOperacion.classList.add('d-none');

})