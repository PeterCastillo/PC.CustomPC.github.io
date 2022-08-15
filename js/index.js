const url = "informacion.txt"

fetch(url)
.then(response => response.text())
.then(data => {
    let info = JSON.parse(data);
    console.log(info)
})
.catch(err=>console.log("Lo sentimos al parecer ocurrio un error"))