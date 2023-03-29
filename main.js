/*Se declara la funcion constructora del objeto pasajero*/
function Pasajero (id, nombre, documento, edad, precioxdia, precioxpasajero){
    this.id = id;
    this.nombre = nombre;
    this.documento = documento;
    this.edad = edad;
    this.precioxdia = precioxdia;
    this.precioxpasajero = precioxpasajero;
}


const quote = ()=>{
    /*Se vacia la seccion donde va a ir el resultado de la tabla en caso que se cotize mas de una vez*/
    let tablaSeccion= document.getElementById('tablaresultado');
    tablaSeccion.innerHTML = ``;
    alert("Bienvenido a su cotizador favorito de seguros de viaje! Vamos a empezar:");

    /*Consulta la zona. Verifica que ingrese una opcion valida*/
    let zoneGroup = parseInt(prompt("A donde vas a viajar (escribe el numero correspondiente a la opcion)?:\n1. Americas\n2. Europa\n3. Asia\n4. Oceania"));
    if(zoneGroup>4 || zoneGroup<1 || isNaN(zoneGroup)){
        alert("El valor ingresado no corresponde a ninguna de las opciones. Volve a empezar!");
    }else{

        /*Si ingresa una zona valida, consulta la cantidad de dias que viaja y se asegura que se ingrese un valor valido */
        let cantDias = parseInt(prompt("Cuantos dias vas a viajar?"));
        if(isNaN(cantDias)){
            alert("Por favor ingresa unicamente un valor numerico, caso contrario volves a empezar...un garron.");
        }else{

            /*Si ingresa una cantidad de dias validos, consulta la cantidad de pasajeros y se asegura que se ingrese un valor valido */
            let cantPasaj = parseInt(prompt("¿Cuantos pasajeros hay dentro de tu grupo?"));
            if(isNaN(cantPasaj)){
                alert("Por favor ingresa unicamente un valor numerico, caso contrario volves a empezar...un garron.");
                
            }else{

                /*Inicializa las variables para consultar las edades de los pasajeros y calcular el precio por dia y sumarlo al precio final. Se agrega la generacion de la constante que contiene el array final de pasajeros*/
                let contador = 1;
                let precioFinal = 0;
                let precioPorDia = 0;
                let precioPasajero;
                let mensajeResumen = "El resumen final de su compra es:\n";
                const arrayPasajeros = [];
                for(i=cantPasaj; i>0; i--){
                    
                    /*se captura la edad de cada pasajero y verifica que se ingresen valores validos para poder continuar*/
                    
                    let edad = parseInt(prompt("Que edad tiene el pasajero "+ contador + "?"));
                    if(isNaN(edad) || edad>120 || edad<0 ){
                        alert("Por favor ingresa unicamente un valor numerico valido, caso contrario volves a empezar...un garron.");
                        break;
                    }else{
                        
                        /* Se agregan variables de nombre y documento del pasajero*/
                        let nombrePasajero = (prompt("Que nombre tiene el pasajero "+ contador + "?"));
                        let documentoPasajero = (prompt("Que documento tiene el pasajero "+ contador + "?"));
                        
                        /*calcula segun la zona y el grupo de edad el valor por dia, lo multiplica por la cantidad de dias y lo guarda en una variable*/
                        
                        switch (zoneGroup){
                            case 1:
                                if (edad < 18){
                                    precioPorDia = 2;
                                    precioPasajero = precioPorDia * cantDias;
                                    
                                } else if (edad>=18 && edad < 30){
                                    precioPorDia = 2.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=30 && edad < 50){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;
                            
                            case 2:
                                if (edad < 18){
                                    precioPorDia = 2.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=18 && edad < 30){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=30 && edad < 50){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;

                            case 3:
                                if (edad < 18){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=18 && edad < 30){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=30 && edad < 50){
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3.7;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;

                            case 4:
                                if (edad < 18){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=18 && edad < 30){
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (edad>=30 && edad < 50){
                                    precioPorDia = 3.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 4;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;
                        }

                        /*Se suma el precio del pasajero al precio final, se genera un nuevo objeto con los datos del pasajero y se agrega al array total de pasajeros*/
                        precioFinal += precioPasajero;
                        const pasajerocompletado = new Pasajero (contador, nombrePasajero, documentoPasajero, edad, precioPorDia, precioPasajero)
                        arrayPasajeros.push(pasajerocompletado);
                        
                        contador++;

                        
                    }
                }
                /*Se arma una tabla con todos los datos finales*/
                

                let tablaResultado= document.createElement('table');
                tablaResultado.className = "table table-dark table-striped"

                let tablaHead= document.createElement('thead');
                tablaHead.innerHTML = `
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Precio Por Dia</th>
                        <th scope="col">Precio Total</th>
                    </tr>
                `;

                let tablaBody= document.createElement('tbody');
                for( const pasajero of arrayPasajeros ){
                    tablaBody.innerHTML += `
                        <tr>
                            <td>${pasajero.id}</td>
                            <td>${pasajero.nombre}</td>
                            <td>${pasajero.documento}</td>
                            <td>${pasajero.edad}</td>
                            <td>USD$${pasajero.precioxdia}</td>
                            <td>USD$${pasajero.precioxpasajero}</td>
                        </tr>
                    `;
                }

                let tablaFinal = document.createElement('tr')
                    tablaFinal.className = "text-center stronger"
                    tablaFinal.innerHTML = `
                        <td colspan="6">Precio Final = USD$${precioFinal}</td>
                    `;

                tablaResultado.append(tablaHead);
                tablaResultado.append(tablaBody);
                tablaResultado.append(tablaFinal);
                tablaSeccion.append(tablaResultado);
                
            }
        }
    }
}
