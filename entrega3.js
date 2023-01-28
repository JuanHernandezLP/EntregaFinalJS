
let carrito = [];

function agregar_a_carrito( e ){
    console.log("PRODUCTO AGREGADO");

    console.log(e.target);

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    

   

    let nombreDivisa = padre.querySelector("h5").textContent;
    let precioDivisa = padre.querySelector("span").textContent;
    let imgDivisa = abuelo.querySelector("img").src;
    let cantidadDivisa = abuelo.querySelector("input").value;
    precioDivisa =  (parseInt(precioDivisa)) * cantidadDivisa;



    let divisa = { 
        nombre: nombreDivisa,
        precio: precioDivisa,
        img: imgDivisa,
        cantidad: cantidadDivisa

    };

    function buscarDivisa(divisa){

        return divisa.nombre == nombreDivisa

    }
    let resultadoFind = carrito.find (buscarDivisa);
    if (resultadoFind){
        console.log ( "se encontro coincidencia " , resultadoFind);
        
    }

    carrito.push(divisa);
    let arregloJSON = JSON.stringify(carrito);
    localStorage.setItem("TransaccionDeDivisas" , arregloJSON);
    let recuperandoDivisa = localStorage.getItem("TransaccionDeDivisas");

    recuperandoDivisa = JSON.parse(recuperandoDivisa);
    console.log(recuperandoDivisa);


   mostrar_carrito (divisa);
    
}

function mostrar_carrito(divisa){


        
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src ="${divisa.img}">${divisa.nombre}</td>
                      <td>${divisa.cantidad}</td>
                      <td>${divisa.precio}</td>
                      <td></td>
                      <td><button class="btn btn-danger borrarElemento">Borrar</button></td>`   
    let tabla = document.getElementById("tbody");
    tabla.append( fila );



    let btnBorrar = document.querySelectorAll(".borrarElemento");

    for (let boton of btnBorrar) {
        
        boton.addEventListener("click", borrarProducto);
    }

}


function borrarProducto(e){

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();
    localStorage.removeItem(abuelo);

}


let btnCarrito = document.getElementById("mostrar_carrito");
btnCarrito.addEventListener("click", function () {
   
    let carrito = document.getElementById("carrito");
    if ( carrito.style.display != "none"){
        carrito.style.display = "none";
    }
    else{
        carrito.style.display = "block";
    }


})


let btn_compra = document.querySelectorAll(".botonCompra");


for (let boton of btn_compra) {
    
    boton.addEventListener("click" , agregar_a_carrito);

}





fetch(`https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=d4a320bf243b91f04e2b4856e108270f
`)
  .then(response => response.json())
  .then(data => {
    
    console.log("Temp", data.main.temp);
    console.log(data);
    let divClima = document.querySelector(".clima");
    divClima.innerHTML=`
    <h3>La temperatura acutal en la ciudad de ${data.name} es de ${Math.round(data.main.temp)}°C</h3>
    `
  })
  .catch(error => console.log(error));
