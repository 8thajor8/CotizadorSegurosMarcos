/*Se declara la funcion constructora del objeto pasajero*/
function Pasajero (id, nombre, documento, edad, precioxdia, precioxpasajero){
    this.id = id;
    this.nombre = nombre;
    this.documento = documento;
    this.edad = edad;
    this.precioxdia = precioxdia;
    this.precioxpasajero = precioxpasajero;
}


/*Se captura la informacion de la cantidad de pasajeros para definir la cantidad de grupos de campos que se crean en la funcion */
const selectPasajeros = document.getElementById("cantpasaj");
const camposPasajeros = document.getElementById("campos__pasajeros");

const agregarCamposPasajeros = () => {
        const groupSize = parseInt(selectPasajeros.value);

        camposPasajeros.innerHTML = ``;

        
        for (let i = 1; i <= groupSize; i++) {
            
            const passengerInput = document.createElement("div");
                passengerInput.className = "mx-3"
                passengerInput.innerHTML = `

                <div>
                    <input type="text" id="nombre${i}" name="nombre${i}" placeholder="Nombre Pasajero #${i}  *" required pattern="[A-Za-z]+" class="form__field wider">
                </div>

                <div>
                    <input type="text" id="edad${i}" name="edad${i}" placeholder="Edad Pasajero #${i}  *" required class="form__field wider">
                </div>

                <div>
                    <input type="text" id="documento${i}" name="documento${i}" placeholder="Documento Pasajero #${i}" class="form__field wider">
                </div>
                `;
                
                

            camposPasajeros.appendChild(passengerInput);
            
        }
    }

    /*Se genera un event listener para detectar cambios en el select y generar los campos correspondientes al cambio*/
    selectPasajeros.addEventListener("change", agregarCamposPasajeros);


    /*Se completan los campos en caso de haber guardado datos de cotizaciones anteriores en local storage al cargar el sitio*/
    const zoneSelect = document.getElementById('zoneselect');
    const startDateInput = document.getElementById('startdate');
    const endDateInput = document.getElementById('enddate');
    const cantPasajSelect = document.getElementById('cantpasaj');

    window.addEventListener('load', function() {
        const zoneSelectValue = localStorage.getItem('zoneSelectValue');
        if (zoneSelectValue) {
            zoneSelect.value = zoneSelectValue;
        }
    
        const startDateValue = localStorage.getItem('startDateValue');
        if (startDateValue) {
            startDateInput.value = new Date(startDateValue).toISOString().slice(0, 10);
        }
    
        const endDateValue = localStorage.getItem('endDateValue');
        if (endDateValue) {
            endDateInput.value = new Date(endDateValue).toISOString().slice(0, 10);
        }
    
        const cantPasajSelectValue = localStorage.getItem('cantPasajSelectValue');
        if (cantPasajSelectValue) {
            cantPasajSelect.value = cantPasajSelectValue;
            agregarCamposPasajeros();
        }
    });

const quote = () => {
    
    /*Se vacia la seccion donde va a ir el resultado de la tabla en caso que se cotize mas de una vez*/
    let tablaSeccion= document.getElementById('tablaresultado');
    tablaSeccion.innerHTML = ``;
    

    /*Consulta la zona. Verifica que ingrese una opcion valida. Guarda el valor en local storage*/
    const zoneGroupSelection = document.getElementById('zoneselect');
    localStorage.setItem('zoneSelectValue', zoneGroupSelection.value)

    /*Se guarda el nombre de la region para mostrarlo en tabla mas tarde*/
    const selectedIndex = zoneGroupSelection.selectedIndex;
    const selectedOption = zoneGroupSelection.options[selectedIndex];
    const zoneGroupName = selectedOption.text;
    const zoneGroup = parseInt(zoneGroupSelection.value);
    if(zoneGroup>4 || zoneGroup<1 || isNaN(zoneGroup)){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Selecciona una opcion del menu de regiones para poder continuar',
            heightAuto: false 
        });
        
    }else{

        /*Si ingresa una zona valida, consulta las fechas de viaje y realiza la cuenta para determinar cantidad de dias. se guardan valores en local storage*/
        const fechaHoy = new Date().toISOString().slice(0, 10);
        
        /*se captura la fecha al momento para verificar que la fecha de inicio sea posterior al dia de la fecha*/

        const startdate = new Date(document.getElementById('startdate').value);
        startdateValid =startdate.toISOString().slice(0, 10);
        localStorage.setItem('startDateValue', startdate.toISOString());
        
        const enddate = new Date(document.getElementById('enddate').value);
        enddateValid= enddate.toISOString().slice(0, 10);
        localStorage.setItem('endDateValue', enddate.toISOString());
        
        const difference = enddate.getTime() - startdate.getTime();
        const cantDias = Math.ceil(difference / (1000 * 3600 * 24));;
        if(isNaN(cantDias) || fechaHoy>startdateValid|| enddateValid<startdateValid || cantDias == 0){
            
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Por favor ingresa las fechas desde y hasta correctamente. La fecha de inicio debe ser mayor al dia de hoy y el fin del viaje no puede ser antes de la fecha de inicio.',
                heightAuto: false
            });
        }else{

            /*Se sigue con la captura de la cantidad de pasajeros para determinar la cantidad de iteraciones de calculo y se guarda el valor en local storage */
            const cantPasaj = parseInt(document.getElementById('cantpasaj').value);
            localStorage.setItem('cantPasajSelectValue', cantpasaj.value);
            if(isNaN(cantPasaj)){
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Por favor ingresa la cantidad de pasajeros correspondiente a tu grupo',
                    heightAuto: false 
                });
                
                
            }else{

                /*Inicializa las variables para hacer calculos correspondientes y sumarlo al precio final. Se agrega la generacion de la constante que contiene el array final de pasajeros*/
                let contador = 1;
                let precioFinal = 0;
                let precioPorDia = 0;
                let precioPasajero;
                let mensajeResumen = "El resumen final de su compra es:\n";
                const arrayPasajeros = [];
                const calculoPasajero = xdia => Number((xdia * cantDias).toFixed(2));
                for(i=cantPasaj; i>0; i--){
                    
                    /*se verifica que los datos ingresados en los campos de edad sean correctos para poder continuar*/
                    
                    
                    let edad = parseInt(document.getElementById(`edad${contador}`).value);
                    if(isNaN(edad) || edad>120 || edad<0 ){
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Por favor ingrese las edades correctamente usando numeros unicamente',
                            heightAuto: false 
                        });
                        break;
                    }else{
                        
                        /* Se agregan variables de nombre y documento del pasajero y se capturan los datos de los inputs*/
                        let nombrePasajero = document.getElementById(`nombre${contador}`).value;
                        let nombrePasajeroValid = document.getElementById(`nombre${contador}`);
                                            
                        if (nombrePasajeroValid.checkValidity() == false ) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'Por favor ingrese los nombres de los pasajeros correctamente',
                                heightAuto: false 
                            });
                            break;
                            
                        } else {
                            
                            let documentoPasajero = document.getElementById(`documento${contador}`).value;
                            
                            /*calcula segun la zona y el grupo de edad el valor por dia, lo multiplica por la cantidad de dias y lo guarda en una variable*/
                            
                            switch (zoneGroup){
                                case 1:
                                    if (edad < 18){
                                        precioPorDia = 2;
                                        precioPasajero = calculoPasajero(precioPorDia);
                                        
                                    } else if (edad>=18 && edad < 30){
                                        precioPorDia = 2.5;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=30 && edad < 50){
                                        precioPorDia = 2.7;
                                        precioPasajero = calculoPasajero(precioPorDia);
                                        
                                    } else {
                                        precioPorDia = 3;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    }
                                    break;
                                
                                case 2:
                                    if (edad < 18){
                                        precioPorDia = 2.5;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=18 && edad < 30){
                                        precioPorDia = 2.7;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=30 && edad < 50){
                                        precioPorDia = 3;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else {
                                        precioPorDia = 3.5;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    }
                                    break;

                                case 3:
                                    if (edad < 18){
                                        precioPorDia = 2.7;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=18 && edad < 30){
                                        precioPorDia = 3;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=30 && edad < 50){
                                        precioPorDia = 3.5;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else {
                                        precioPorDia = 3.7;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    }
                                    break;

                                case 4:
                                    if (edad < 18){
                                        precioPorDia = 3;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=18 && edad < 30){
                                        precioPorDia = 3.5;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else if (edad>=30 && edad < 50){
                                        precioPorDia = 3.7;
                                        precioPasajero = calculoPasajero(precioPorDia);

                                    } else {
                                        precioPorDia = 4;
                                        precioPasajero = calculoPasajero(precioPorDia);

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
                }
                /*Se arma una tabla con todos los datos finales*/
                

                let tablaResultado= document.createElement('table');
                tablaResultado.className = "table table-dark table-striped"

                let tablaHead= document.createElement('thead');
                tablaHead.innerHTML = `
                    <tr>
                        <td>Zona: ${zoneGroupName}</th>
                        <td>Cantidad de Dias: ${cantDias}</th>
                    </tr>
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

/*Se genera la funcion para borrar los datos almacenados en el local storage*/
const borrar = ()=>{
    localStorage.removeItem('zoneSelectValue');
    localStorage.removeItem('startDateValue');
    localStorage.removeItem('endDateValue');
    localStorage.removeItem('cantPasajSelectValue');
    
/*Se eliminan los valores de los inputs*/
    zoneSelect.selectedIndex = 0;
    startDateInput.value = '';
    endDateInput.value = '';
    cantPasajSelect.selectedIndex = 0;

/*Se elimina la tabla de resultados y los campos de los pasajeros*/
    tablaSeccion= document.getElementById('tablaresultado');
    tablaSeccion.innerHTML = ``;
    camposPasajeros.innerHTML = ``;

    
}

/*Se ejecuta la consulta a una opi local, que dispara SWAL cada 15 segundos iterando cada elemento del array de objetos de la api. Al mismo tiempo, tambien cuenta con un link y el metodo didRender para poder detener la iteracion*/
const datosAPI = () => {
    const APIPAISES = 'paises.json';
    fetch (APIPAISES)
        .then((resultado) => resultado.json())
        .then((data) => {
        
        const ofertas = data.ofertasPaises;
        console.log(ofertas.length);
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < ofertas.length) {
                const oferta = ofertas[index];
                
                const swalOfertas = Swal.fire({
                    position: 'top-end',
                    title: `${oferta.pais}`,
                    text: `${oferta.texto}`,
                    imageUrl: `${oferta.imagen}`,
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: `${oferta.pais}`,
                    showConfirmButton: false,
                    timer: 4000,
                    heightAuto: false,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    footer: '<a href="#">Dejar de recibir ofertas</a>',
                    didRender: () => {
                        const footerLink = document.querySelector('.swal2-footer a');
                        footerLink.addEventListener('click', () => {
                            clearInterval(interval);
                            Swal.close();
                        });
                    }

                });

                
                
                index++;

            } else {
                clearInterval(interval);
                }
            }, 15000);
        });
    };

datosAPI();



