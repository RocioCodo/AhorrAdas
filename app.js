const vistaBalance =document.getElementById('vistaBalance');
const vistaCategorias =document.getElementById('vistaCategorias');
const vistaReportes =document.getElementById('vistaReportes');
const vistaNuevaOperacion = document.getElementById('vistaNuevaOperacion');

const sinReportes = document.getElementById('sin-reportes');
const conReportes = document.getElementById('con-reportes');

const reportesMes = document.getElementById('reportes-mes');
const reportesCategorias = document.getElementById('reportes-categorias');

const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');
const btnNuevaOperacion = document.getElementById('btn-nuevaOperacion');

const btnCancelarNuevaOp = document.getElementById('btnCandelarNuevaOp');

const inputDescripcionOp = document.getElementById('inputDescripcion-Op');
const inputMontoOp = document.getElementById('inputMonto-Op');
const selectTipoOp = document.getElementById('selectTipo-Op');
const selectCategoriaOp = document.getElementById('selectCategoria-Op');
const inputFechaOp = document.getElementById('inputFecha-op');
const btnAgregarNuevaOp = document.getElementById('btnAgregarNuevaOp');

const inputEditarDescripcion = document.getElementById('inputEditarDescripcion');
const inputEditarMonto = document.getElementById('inputEditarMonto');
const inputEditarTipo = document.getElementById('inputEditarTipo');
const inputEditarCategoria = document.getElementById('inputEditarCategoria');
const inputEditarFecha = document.getElementById('inputEditarFecha');

const btnCancelarEditado = document.getElementById('btnCancelarEditado');
const btnEditarOperacion = document.getElementById('btnEditarOperacion');

const vistaEditarOperacion = document.getElementById('vistaEditarOperacion');

const filtrosContainer = document.getElementById('filtros-container');
const filtrosContainer2 = document.getElementById('filtros-container2');
const ocultarFiltros = document.getElementById('ocultar-filtros');
const mostrarFiltros = document.getElementById('mostrar-filtros');

const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFecha = document.getElementById('filtro-fecha');
const filtroOrdenar = document.getElementById('filtro-ordenar');

const gananciasDiv = document.getElementById('ganancias-div');
const gastosDiv = document.getElementById('gastos-div');
const totalDiv = document.getElementById('total-div');

const btnAgregarCategoria =document.getElementById('btnAgregarCategoria')
const inputAgregarCategoria =document.getElementById('input-agregar-categoria')
const listaCategorias= document.getElementById('listaCategorias');
const selectCategorias = document.getElementsByClassName('select-categorias');
const vistaEditarCategorias = document.getElementById('vistaEditarCategorias');
const cancelarCategoria = document.getElementById('cancelar-categoria')
const inputEditarCat = document.getElementById('input-editar-categoria')
const confirmarCategoriaBtn = document.getElementById('confirmar-categoria');


/*************************************************
                    OPERACIONES
*************************************************/

const obtenerOperaciones = () =>{
return JSON.parse(localStorage.getItem('operaciones')) || [];
}

let operaciones = obtenerOperaciones();
console.log(operaciones)

/*Mostrar panel con operaciones y ocultar panel sin operaciones*/

const mostrarOperaciones = (arr) => {
    if(!arr.length){
        document.getElementById('sin-operaciones').classList.remove('d.none')
        document.getElementById('con-operaciones').classList.add('d-none')
    } else{
        document.getElementById('sin-operaciones').classList.add('d-none')
        document.getElementById('con-operaciones').classList.remove('d-none')
        

    }
}


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


    if(!operaciones.length){
        conReportes.classList.add('d-none');
        sinReportes.classList.remove('d-none');
    } else {
        conReportes.classList.remove('d-none');
        sinReportes.classList.add('d-none');


    }

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

btnCancelarNuevaOp.addEventListener('click', () => {
    vistaBalance.classList.remove('d-none');
    vistaNuevaOperacion.classList.add('d-none');

})


/*Funcionalidad de apretar botón de agregar nueva operación*/

btnAgregarNuevaOp.addEventListener('click', ()=>{

    const operacion = {
        descripcion: inputDescripcionOp.value,
        monto: inputMontoOp.value,
        tipo: selectTipoOp.value,
        categoria: selectCategoriaOp.value,
        fecha: inputFechaOp.value,
        id: uuidv4()
    }

    operaciones.push(operacion)
    

    vistaBalance.classList.remove('d-none');
    vistaNuevaOperacion.classList.add('d-none');

    inputDescripcionOp.value =''
    inputMontoOp.value = 0
    selectTipoOp.value = 'GASTO'
    // selectCategoriaOp.value = 'SERVICIOS'

    mostrarOperaciones(operaciones);

    localStorage.setItem('operaciones', JSON.stringify(operaciones))

    pintarOperaciones(operaciones);


})



 const pintarOperaciones = arr => {
    document.getElementById('listaOperaciones').innerHTML=''
    let str=''
   
    arr.forEach((operacion) => {
    
        
        const {
            id,
            descripcion,
            categoria,
            fecha,
            monto,
            tipo,

        } = operacion;

        str = str +
        `<div class="row pt-3">
        <span class="col-3">${descripcion}</span>
        <span class="col-2"><p class="cat1">${categoria}</p></span>
        <span class="col-3">${fecha}</span>
        <span class="col-2 ${tipo === 'GANANCIA' ? 'green': 'red'}">$${monto}</span> 
        <span class="col-2">
        <a href="#" class="editar-p" data-id=${id}>Editar</a>
        <a href="#" class="borrar-p" data-id=${id}>Borrar</a>
        </span>
        </div>`

        document.getElementById('listaOperaciones').innerHTML= str;

        totalesBalance(operaciones);

    })

 

const btnEditar = document.querySelectorAll('.editar-p');
const btnBorrar = document.querySelectorAll('.borrar-p');


/*Funcionalidad de borrar operación agregada*/

btnBorrar.forEach(btn => {

    btn.addEventListener('click', e => {    

        const borrado = operaciones.filter(operacion => operacion.id !== e.target.dataset.id)

        localStorage.setItem('operaciones', JSON.stringify(borrado))
        operaciones = JSON.parse(localStorage.getItem('operaciones'))

        pintarOperaciones(operaciones)
        mostrarOperaciones(operaciones)
    })
})

/*Funcionalidad de Editar operacion agregada*/

btnEditar.forEach(btn => {

    btn.addEventListener('click', e => {
        let editado = operaciones.filter(operacion => operacion.id === e.target.dataset.id);
        editarOperacion(editado)    

        btnEditarOperacion.addEventListener('click', () =>{
            
            const  filtrar = operaciones.filter(operacion => operacion.id === editado[0].id)
            const operacionEditada = filtrar[0]
            
            operacionEditada.descripcion = inputEditarDescripcion.value;
            operacionEditada.id = editado[0].id;
            operacionEditada.monto = inputEditarMonto.value;
            operacionEditada.tipo = inputEditarTipo.value;
            operacionEditada.categoria = inputEditarCategoria.value;
            operacionEditada.fecha = inputEditarFecha.value;
        
            vistaBalance.classList.remove('d-none')
            vistaEditarOperacion.classList.add('d-none')

            const nuevasOp = operaciones.map((operacion) => 
            operacion.id === editado[0].id
            ? operacionEditada
            : operacion
            )

            localStorage.setItem('operaciones', JSON.stringify(nuevasOp));
            const operacionesEditadas = JSON.parse(localStorage.getItem('operaciones'))

            pintarOperaciones(operacionesEditadas)

        })

        btnCancelarEditado.addEventListener('click', () =>{
            vistaBalance.classList.remove('d-none')
            vistaEditarOperacion.classList.add('d-none')

        })

    })
})

}

 const editarOperacion = arr => {
    if(arr.length === 0) return
    const {descripcion, monto, tipo, categoria, fecha} = arr[0];
    
    vistaBalance.classList.add('d-none')
    vistaEditarOperacion.classList.remove('d-none')

    inputEditarDescripcion.value = descripcion;
    inputEditarMonto.value = monto;
    inputEditarTipo.value = tipo;
    inputEditarCategoria.value = categoria;
    inputEditarFecha.valueAsDate = new Date(fecha);
 }



/*************************************************
                    FILTROS
*************************************************/


/*Funcionalidad de ocultar panel de filtros*/

ocultarFiltros.addEventListener('click', () =>{
    filtrosContainer.classList.add('d-none');
    filtrosContainer2.classList.remove('d-none');

})

mostrarFiltros.addEventListener('click', ()=> {
    filtrosContainer.classList.remove('d-none');
    filtrosContainer2.classList.add('d-none');   
})

/*Funcionalidad de filtrar y ordenar*/

const filtros = (e) => {
    const porCategoria = filtroCategoria.value;
    const porTipo = filtroTipo.value;
    const porFecha = new Date(filtroFecha.value);
    
    let operaciones = obtenerOperaciones();

    if(porFecha !== new Date()){
        operaciones = operaciones.filter(operacion => new Date(operacion.fecha) >= porFecha)
     }

    if(porTipo !== 'TODOS'){
        operaciones = operaciones.filter(operacion => operacion.tipo === porTipo)
    }

    if(porCategoria !== 'TODOS'){
        operaciones = operaciones.filter(operacion => operacion.categoria === porCategoria) 
    }

 
    if(filtroOrdenar.value === 'MENOR MONTO'){
        operaciones = operaciones.sort(
            (a,b) => Number(a.monto) - Number(b.monto)
            );
    }

    if(filtroOrdenar.value === 'MAYOR MONTO'){
        operaciones = operaciones.sort(
            (a,b) => Number(b.monto) - Number(a.monto)
            );
    }

    if(filtroOrdenar.value === 'A/Z'){
        operaciones = operaciones.sort((a,b) => {
            if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()){
                return-1
            }
        })     
    }
    if(filtroOrdenar.value === 'Z/A'){
        operaciones = operaciones.sort((a,b) => {
            if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()){
                return-1
            }
        })     
    }

    if(filtroOrdenar.value === 'MAS RECIENTES'){
        operaciones = operaciones.sort((a,b) => 
        new Date(a.fecha) - new Date(b.fecha)
            );
    }

    if(filtroOrdenar.value === 'MENOS RECIENTES'){
        operaciones = operaciones.sort((a,b) => 
        new Date(b.fecha) - new Date(a.fecha)
        );
    }

    pintarOperaciones(operaciones)
      
}

filtroCategoria.addEventListener('change', filtros);
filtroTipo.addEventListener('change', filtros);
filtroFecha.addEventListener('change', filtros);
filtroOrdenar.addEventListener('change', filtros);


/*Funcionalidad de filtrar por fecha*/

//   filtroFecha.addEventListener('change', (e) => {
    
//     const filtradasPorFecha = operaciones.filter(operacion => new Date(operacion.fecha) >= new Date(e.target.value))
//     console.log(e.target.value)

//     pintarOperaciones(filtradasPorFecha)
    
//     })




/*************************************************
                TOTALES BALANCE
*************************************************/

const totalesBalance = arr => {
    const operGanancias = arr.filter(operacion => operacion.tipo === 'GANANCIA').reduce((prev, current) =>
    prev + Number(current.monto), 0)
    console.log(arr)

    gananciasDiv.innerHTML=
    `<div  class="d-flex justify-content-start fs-6 textt">Ganancias</div>
    <div class="d-flex justify-content-end ganancias-monto fs-6 text">+$${operGanancias}</div>`

    const operGastos = arr.filter(operacion => operacion.tipo === 'GASTO').reduce((prev, current) =>
    prev + Number(current.monto), 0)

    gastosDiv.innerHTML=
    `<div  class="d-flex justify-content-start fs-6 text">Gastos</div>
    <div class="d-flex justify-content-end gastos-monto fs-6 text">-$${operGastos}</div>`

    const totalesOp = (operGanancias - operGastos)

    totalDiv.innerHTML=
    `<div  class="card-subtitle mb-2 text-muted fs-4 text">Total</div>
    <div class="d-flex justify-content-end fs-4 text">${totalesOp  > "0" ? "+" : "-"}$${Math.abs(totalesOp)}</div>`
}


/*************************************************
                 CATEGORIAS
*************************************************/

let categorias = JSON.parse(localStorage.getItem('categorias')) || [

    {
    nombre: 'COMIDAS',
    id: uuidv4(),
    } ,   
    
    {
    nombre:'SERVICIOS',
    id: uuidv4(),
    },
    {
    nombre:'SALIDAS',
    id: uuidv4(),
    },
    {
    nombre:'EDUCACION',
    id: uuidv4(),
    },
    {
    nombre:'TRANSPORTE',
    id: uuidv4(),
    },
    {
    nombre:'TRABAJO',
    id: uuidv4(),
    },
];

   /*Funcionalidad de agregar categoría nueva */

   btnAgregarCategoria.addEventListener('click', ()=>{
    let nuevaCategoria = {

    nombre: inputAgregarCategoria.value,
    id: uuidv4() }

    categorias.push(nuevaCategoria)
    
    listaCategorias.innerHTML +=
    `<div class="categorias-div">
    <div>
        <p class="card-text cat1">${nuevaCategoria.nombre}</p>
    </div>
    <span class="col-2">
    <a href="#" class="editar-cat" data-id=${nuevaCategoria.id}>Editar</a>
    <a href="#" class="borrar-cat" data-id=${nuevaCategoria.id}>Borrar</a>
    <span>
    </div>`
    
     localStorage.setItem('categorias', JSON.stringify(categorias))

     cargarSelects(JSON.parse(localStorage.getItem(categorias)))

    }) 
    

/*Funcionalidad de pintar categorias y actualizar selects */

const cargarSelects = () =>{
          for (let i=0; i < selectCategorias.length; i++){

          const select = selectCategorias[i];
        select.innerHTML=''
          if(select.classList.contains('select-filtros')){
              select.innerHTML= '<option value="TODOS">TODAS</option>'
          } 
         let str  = '';

         categorias.forEach((categoria) => {
         
            select.innerHTML+=`<option>${categoria.nombre}</option>`
    
            str +=`<div class="categorias-div">
            <div>
            <p class="card-text cat1">${categoria.nombre}</p>
            </div>
            <span class="col-2">
            <a href="#" class="editar-cat" data-id=${categoria.id}>Editar</a>
            <a href="#" class="borrar-cat" data-id=${categoria.id}>Borrar</a>
            <span>
             </div>`
         })
    listaCategorias.innerHTML= str;
    
}

    /*Funcionalidad de borrar categoría agregada*/
    
    const btnBorrarCat = document.querySelectorAll('.borrar-cat');

    btnBorrarCat.forEach(btn => {
     
      btn.addEventListener('click', e => {    
        const obtenerCategoria = categorias.find((categoria) => categoria.id === e.target.dataset.id).nombre;
        let categoriaBorrada = categorias.filter(categoria => categoria.id !== e.target.dataset.id)

        localStorage.setItem('categorias', JSON.stringify(categoriaBorrada))
        categorias = JSON.parse(localStorage.getItem('categorias'))

        const eliminarOperacion = operaciones.filter((operaciones) => operaciones.categoria !== obtenerCategoria)

        cargarSelects(categorias)

        localStorage.setItem('operaciones', JSON.stringify(eliminarOperacion))
        operaciones = JSON.parse(localStorage.getItem('operaciones'))
        
        pintarOperaciones(operaciones)
     })

    })

/*Funcionalidad de Editar categoria agregada*/

const btnEditarCat = document.querySelectorAll('.editar-cat');

btnEditarCat.forEach(btn => {

    btn.addEventListener('click', e => {
        let categoriaEditada = categorias.filter(categoria => categoria.id === e.target.dataset.id);
        console.log(categoriaEditada[0])
        editarCategoria(categoriaEditada)    

        inputEditarCat.value = categoriaEditada[0].nombre;

         confirmarCategoriaBtn.addEventListener('click', () =>{
            
            const  filtrarCat = categorias.filter(categoria => categoria.id === categoriaEditada[0].id)

            const categoriaAEditar = filtrarCat[0]
              
            categoriaAEditar.nombre = inputEditarCat.value;
          
            vistaCategorias.classList.remove('d-none')
            vistaEditarCategorias.classList.add('d-none')

             const nuevasCategorias = categorias.map((categoria) => 
             categoria.id === categoriaEditada[0].id
             ? categoriaAEditar
             : categoria
             )

             console.log(nuevasCategorias)

             localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));
             const catEditadas = JSON.parse(localStorage.getItem('categorias'))

             cargarSelects(catEditadas)

        })

         cancelarCategoria.addEventListener('click', () =>{
            vistaCategorias.classList.remove('d-none')
            vistaEditarCategorias.classList.add('d-none')

         })

     })
 })



 const editarCategoria = arr => {
    if(arr.length === 0) return
    
    vistaCategorias.classList.add('d-none')
    vistaEditarCategorias.classList.remove('d-none')

 }
}




/*************************************************
                 RESUMEN REPORTES
*************************************************/

  /*Categporía con mayor ganancia*/

const categoriaMayorGanancia = (operaciones) => {
    document.getElementById('categoria-mayor-ganancia').innerHTML=''
    let str='' 

    const porCategoriaGananciaResumen = operaciones.filter(operacion => operacion.tipo === 'GANANCIA').sort(
        (a,b) => Number(b.monto) - Number(a.monto))

            str = str +
            `<div class="col-4 cat1">${porCategoriaGananciaResumen[0].categoria}</div>
            <div class="col-4 green">$${porCategoriaGananciaResumen[0].monto}</div>`

            document.getElementById('categoria-mayor-ganancia').innerHTML= str;
    
        }

/*Categporía con mayor gasto*/

const categoriaMayorGasto = (operaciones) => {
        document.getElementById('categoria-mayor-gasto').innerHTML=''
        let str='' 
        
        const porCategoriaGastoResumen = operaciones.filter(operacion => operacion.tipo === 'GASTO').sort(
            (a,b) => Number(b.monto) - Number(a.monto))
        
                str = str +
                `<div class="col-4 cat1">${porCategoriaGastoResumen[0].categoria}</div>
                <div class="col-4 red">$${porCategoriaGastoResumen[0].monto}</div>`
        
                document.getElementById('categoria-mayor-gasto').innerHTML= str;
            
            }  

/*Mes con mayor ganancia y mes con mayor gasto*/

const mesMayorOperacion = (operaciones) =>{
    
    const mayorMonto = operaciones.sort((a,b) => Number(b.monto) - Number(a.monto));
    
    const mayorGanancia = mayorMonto.filter((operacion)=> operacion.tipo === 'GANANCIA');
    const mayorGasto = mayorMonto.filter((operacion)=> operacion.tipo === 'GASTO');

    document.getElementById('mes-mayor-ganancia').innerHTML= `
    <div class="col-4 cat1">${mayorGanancia[0].fecha.split('-')[1]}</div>
    <div class="col-4 green">$${mayorGanancia[0].monto}</div>`

    document.getElementById('mes-mayor-gasto').innerHTML= `
    <div class="col-4 cat1">${mayorGasto[0].fecha.split('-')[1]}</div>
    <div class="col-4 red">$${mayorGasto[0].monto}</div>`

}

  /*Totales por categoria*/    

const totalPorCategoria = (operaciones, categorias) => {
  
     const conBalance = categorias.map(categoria => {
      const porCategoria = operaciones.filter(operacion => operacion.categoria === categoria.nombre)
      const categoriasNombre = categoria.nombre;

      const porCategoriaGanancia = porCategoria.filter(operacion => operacion.tipo === 'GANANCIA').reduce((count, current) => count + Number(current.monto) ,0)
      const operacionTipo = operaciones.tipo;
      
      const porCategoriaGasto = porCategoria.filter(operacion => operacion.tipo === 'GASTO').reduce((count, current) => count + Number(current.monto) ,0)
    
      const totalPorCategoriaBalance = porCategoriaGanancia - porCategoriaGasto;

      reportesCategorias.innerHTML+=
      `<div class="row pt-3">
      <span class="col-3">${categoriasNombre}</span>
      <span class="col-3"><p>${porCategoriaGanancia}</p></span>
      <span class="col-3">${porCategoriaGasto}</span>
      <span class="col-3">${totalPorCategoriaBalance}</span> 
      </div>`

      return{
        ...categoria,
        balance: porCategoriaGanancia - porCategoriaGasto
      }
    })

    /*Categoría con mayor balance*/

    const result = conBalance.sort((a,b)=> b.balance - a.balance)

    document.getElementById('categoria-mayor-balance').innerHTML +=`
    <div class="col-4 cat1">${result[0].nombre}</div>
    <div class="col-4">$${result[0].balance}</div>`

  }

  /*Totales por mes*/

  const totalPorMes = arr => {
    const mesesSinRepetir = [...new Set(arr.map(operacion => 
        operacion.fecha.split('-')[1]))].sort()
    
    for (let i = 0; i < mesesSinRepetir.length; i++) {  
      const operacionesPorMes = arr.filter(operacion => operacion.fecha.split('-')[1] === mesesSinRepetir[i])
      const meses = mesesSinRepetir[i];

      const porTipoGanancia = operacionesPorMes.filter(operacion => 
        operacion.tipo === 'GANANCIA' ).reduce((count, current) => count + Number(current.monto) ,0)
   
      const porTipoGasto = operacionesPorMes.filter(operacion => 
        operacion.tipo === 'GASTO' ).reduce((count, current) => count + Number(current.monto) ,0)
    
        const totalPorMesBalance = porTipoGanancia - porTipoGasto;

        reportesMes.innerHTML+=
        `<div class="row pt-3">
        <span class="col-3">${meses}</span>
        <span class="col-3"><p>${porTipoGanancia}</p></span>
        <span class="col-3">${porTipoGasto}</span>
        <span class="col-3">${totalPorMesBalance}</span> 
        </div>`
    }

  }

/*************************************************
                INICIALIZACIONES
*************************************************/

const inicializar =() =>{
    const inputsFecha = document.querySelectorAll('input[type="date"]')
    inputsFecha.forEach( input => {
      input.valueAsDate = new Date()
    })
    mostrarOperaciones(operaciones);
    pintarOperaciones(operaciones);
    cargarSelects(categorias);
    totalPorMes(operaciones);
    totalPorCategoria(operaciones, categorias)
    categoriaMayorGanancia(operaciones, categorias)
    categoriaMayorGasto(operaciones, categorias)
    mesMayorOperacion(operaciones)
}

window.onload = inicializar