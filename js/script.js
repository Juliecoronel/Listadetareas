const inputNombre = document.querySelector('.inputNombre');
const enviarNombre = document.querySelector('.enviarNombre');
const ingresarNombre = document.getElementById('ingresarNombre');
const advNombre = document.createElement('h3');

if(localStorage.getItem("Nombre")){
    window.open('../lista.html', '_self')
}

enviarNombre.addEventListener("click", ()=>{
    let nombre = inputNombre.value;
    if(nombre){
        localStorage.setItem("Nombre", nombre);
        advNombre.remove();
        window.open('../lista.html', '_self')
    } else{
        advNombre.innerText = '¡Tienes que ingresar un nombre!';
        advNombre.classList.add("advNombre");
        ingresarNombre.appendChild(advNombre);
    }
})

inputNombre.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        let nombre = inputNombre.value;
        if(nombre){
            localStorage.setItem("Nombre", nombre);
            advNombre.remove();
            window.open('../lista.html', '_self')
        } else{
            advNombre.innerText = '¡Tienes que ingresar un nombre!';
            advNombre.classList.add("advNombre");
            ingresarNombre.appendChild(advNombre);
        }
    }
})