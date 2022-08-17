const url = "informacion.txt";
let componentes = {};

fetch(url)
.then(response => response.text())
.then(data => {
    let info = JSON.parse(data);
    info.forEach( element => {
        const  componente  =  { 
            id: element.id,
            nombre: element.nombre,
            type: element.tipo,
            img: element.img,
            seleccionado: false
        }
        componentes[componente.id] = componente;
    });
})
.catch(err=>console.log(err))

const seleccion = document.querySelector('.custom__selected');
const container = document.querySelector('.custom__list__type__list');
const tipoComponentes = document.querySelector('.custom__list__type');
const fragmento = document.createDocumentFragment();

seleccion.addEventListener('click', (e) => {
    select(e);
});

const select = e => {
    if(e.target.classList.contains('custom__selected__selected-img') || e.target.classList.contains('custom__selected__selected--hover')){
        e.target.parentElement.parentElement.querySelectorAll('.custom__selected__selected--type').forEach(element => {
            element.style.textAlign = "start"
        })
        e.target.parentElement.querySelector('.custom__selected__selected--type').style.textAlign = "end";
        sett(e.target.parentElement)
    }
};

const sett = (Obejct) => {
    pintar(Obejct.querySelector('.custom__selected__selected--type').textContent)
}

const pintar = (piezaTipo) => {
    container.innerHTML = '';
    tipoComponentes.innerHTML = piezaTipo
    Object.values(componentes).forEach(componente => {
        if(componente.type == piezaTipo){
            let div = document.createElement('div');
            div.classList.add('custom__list__type__list--element');

            const componenteContent = `
                <div class="custom__list__type__list--element--img"><img src="${componente.img}" alt=""></div>
                <span class="custom__list__type__list--element--name">${componente.nombre}</span>
                <button class="custom__list__type__list--element--add" data-id= "${componente.id}">AGREGAR</button>
                <div class="custom__selected__selected-img-hover"><div><img src="${componente.img}" alt=""></div></div>
            `
            if(componente.seleccionado){
                div.classList.add('custom__list__type__list--element--selected');
                pintarSeleccionado(componente);
            }
            div.innerHTML = componenteContent;
            fragmento.appendChild(div);
            container.appendChild(fragmento);
        }
    });
};

container.addEventListener('click', (e) => {
    addClick(e);
})

const addClick = (e) => {
    if(e.target.classList.contains('custom__list__type__list--element--add')){
        const tipoComponenteSelecionado = componentes[e.target.dataset.id].type;
        Object.values(componentes).forEach(element => {
            if(element.type == tipoComponenteSelecionado){
                element.seleccionado = false;
            }
        });
        componentes[e.target.dataset.id].seleccionado = true;
        pintar(tipoComponenteSelecionado);
    };
};

const pintarSeleccionado = (componente) => {
    const tipo = componentes[componente.id].type;
    seleccion.querySelectorAll('.custom__selected__selected').forEach(elemento => {
        if(elemento.querySelector('.custom__selected__selected--type').textContent == tipo){
            const selecionadoContent = `
            <div class="custom__selected__selected-img"><img src="${componente.img}" alt=""></div>
            <span class="custom__selected__selected--type">${componente.type}</span>
            <span class="custom__selected__selected--hover">${componente.nombre}</span>
            `
            elemento.innerHTML = selecionadoContent;
        }
    });
    // const selecionadin = document.querySelector(`.${tipo}`);
    // const selecionadoContent = `
    // <div class="custom__selected__selected-img"><img src="${componente.img}" alt=""></div>
    // <span class="custom__selected__selected--type">${componente.type}</span>
    // <span class="custom__selected__selected--hover">${componente.nombre}</span>
    // `
    // selecionadin.innerHTML = selecionadoContent

};