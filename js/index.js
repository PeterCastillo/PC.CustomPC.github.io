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
            img: element.img
        }
        componentes[componente.id] = componente;
    });
})
.catch(err=>console.log(err))

const seleccion = document.querySelector('.custom__selected');
const container = document.querySelector('.custom__list__type__list');
const fragmento = document.createDocumentFragment();

seleccion.addEventListener('click', (e) => {
    select(e);
});

const select = e => {
    if(e.target.classList.contains('custom__selected__selected-img') || e.target.classList.contains('custom__selected__selected--hover')){
        sett(e.target.parentElement)
    }
};

const sett = (Obejct) => {
    pintar(Obejct.querySelector('.custom__selected__selected--type').textContent)
}

const pintar = (piezaTipo) => {
    container.innerHTML = '';
    // Object.values(componentes).forEach(componente => {
    //     if(componente.tipo = piezaTipo){
    //         let div = document.createElement('div');
    //         div.classList.add('custom__list__type__list--element')
    //         const componenteContent = `
    //             <div class="custom__list__type__list--element--img"><img src="${componente.img}" alt=""></div>
    //             <span class="custom__list__type__list--element--name">${componente.nombre}</span>
    //             <button class="custom__list__type__list--element--add" data-id= "${componente.id}">AGREGAR</button>
    //             <div class="custom__selected__selected-img-hover"><div><img src="${componente.img}" alt=""></div></div>
    //         `
    //         div.innerHTML = componenteContent;
    //         fragmento.appendChild(div);
    //         container.appendChild(fragmento);
    //     }
    // });
};

