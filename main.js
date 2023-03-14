const quote = ()=>{
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

                /*Inicializa las variables para consultar las edades de los pasajeros y calcular el precio por dia y sumarlo al precio final*/
                let contador= 1;
                let precioFinal= 0;
                let precioPorDia= 0;
                let precioPasajero;
                let mensajeResumen="El resumen final de su compra es:\n";
                for(i=cantPasaj; i>0; i--){
                    
                    /*se utiliza el objeto window para crear i cantidad de variables con el nombre i como sufijo a cada una y verifica que se ingresen valores validos */
                    let pasaj= "pasaj"+ i;
                    window[pasaj]= parseInt(prompt("Que edad tiene el pasajero "+ contador + "?"));
                    if(isNaN(window[pasaj]) || window[pasaj]>120 || window[pasaj]<0 ){
                        alert("Por favor ingresa unicamente un valor numerico valido, caso contrario volves a empezar...un garron.");
                        break;
                    }else{
                        console.log(pasaj + ": " + window[pasaj]);
                        
                        
                        /*calcula segun la zona y el grupo de edad el valor por dia, lo multiplica por la cantidad de dias y lo guarda en una variable*/
                        
                        switch (zoneGroup){
                            case 1:
                                if (window[pasaj] < 18){
                                    precioPorDia = 2;
                                    precioPasajero = precioPorDia * cantDias;
                                    
                                } else if (window[pasaj]>=18 && window[pasaj] < 30){
                                    precioPorDia = 2.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=30 && window[pasaj] < 50){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;
                            
                            case 2:
                                if (window[pasaj] < 18){
                                    precioPorDia = 2.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=18 && window[pasaj] < 30){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=30 && window[pasaj] < 50){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;

                            case 3:
                                if (window[pasaj] < 18){
                                    precioPorDia = 2.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=18 && window[pasaj] < 30){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=30 && window[pasaj] < 50){
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 3.7;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;

                            case 4:
                                if (window[pasaj] < 18){
                                    precioPorDia = 3;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=18 && window[pasaj] < 30){
                                    precioPorDia = 3.5;
                                    precioPasajero = precioPorDia * cantDias;

                                } else if (window[pasaj]>=30 && window[pasaj] < 50){
                                    precioPorDia = 3.7;
                                    precioPasajero = precioPorDia * cantDias;

                                } else {
                                    precioPorDia = 4;
                                    precioPasajero = precioPorDia * cantDias;

                                }
                                break;
                        }

                        /*Se suma el precio del pasajero al precio final, se van agregando los datos en el mensaje de resumen para reportar todo al final*/
                        precioFinal += precioPasajero;
                        mensajeResumen += "Pasajero " + contador + ": "+ cantDias + " dias * USD$" + precioPorDia + "= USD$" + precioPasajero + " Total\n"
                        contador++;
                    }
                }
                /*Se envia un mensaje con todos los datos finales*/
                alert("El precio final de tu cotizacion es de USD$" + precioFinal + "\n\n" + mensajeResumen);
            }
        }
    }
}
