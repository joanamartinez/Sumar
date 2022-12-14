//"Realiza la suma de 2 valores introducidos y enviados mediante AJAX a un PHP que devuelve el resultado para mostrarlo."//

function addEvent() {
    //Almacenamos el valor de cada input en una variable.
    num1 = document.getElementById("num1").value;
    num2 = document.getElementById("num2").value;
    //Almacemnos en una variable el <div> donde queremos mostrar el resultado de la suma.
    resultH3 = document.getElementById("resultH3");
    
    FetchAPI();
    //XMLHttpRequestAPI();
    //JQueryAPI();
}

function FetchAPI() {
    //Creamos una variable de tipo FormData para enviar los números introducidos por el usuario al archivo php a través de Fetch.
    let data = new FormData();
    data.append("firstNum", num1);
    data.append("secondNum", num2);
    
    /* 
     * Hacemos la request al archivo de php con Fetch. 
     * Utilizamos el método POST para crear una nueva suma. 
     * Como body de la request le pasamos la variable creada anteriormente con FormData (los 2 números a sumar).
     * Si la respuesta es exitosa, la pasamos a json y añadimos el resultado de la request al resultH3.
     * En caso que la request sea errónea (falla la función add() del php), se lo haremos saber al usuario.
     */
    fetch("php/index.php",{
        method: "POST",
        body: data
    })
    .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
            throw new Error("Promise rejected")
        } else {
            return response.json(); 
        }
    })
    .then((result) => {
        resultH3.className = "";
        resultH3.className = "correct";
        return resultH3.innerHTML = result;
    })
    .catch(() => {
        resultH3.className = "";
        resultH3.className = "error";
        resultH3.innerHTML = "Input incorrecto!";
    });
}

function XMLHttpRequestAPI() {
    //Creamos una variable de tipo XMLHttpRequest.
    let xmlhttp = new XMLHttpRequest();
    //Creamos una variable de tipo FormData para enviar los números al php a través de Fetch.
    let data = new FormData();
    data.append("firstNum", num1);
    data.append("secondNum", num2);

    /* 
     * En cuanto el estado de la request pase a completada, añadiremos al resultH3 el resultado de la suma.
     * En caso que la request resulte errónea, se lo haremos saber al usuario.
     * Hacemos la request al archivo de php con XMLHttpRequest. 
     * Utilizamos el método POST porque queremos crear una nueva suma. 
     * Y enviamos los datos necesarios para realizar el cálculo.
     */
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            resultH3.className = "";
            resultH3.className = "correct";
            resultH3.innerHTML = this.response;

        } else if(this.status == 403){
            resultH3.className = "";
            resultH3.className = "error";
            resultH3.innerHTML = "Incorrect input!";
        }

    };
    xmlhttp.open("POST", "php/index.php");
    xmlhttp.send(data);
}

function JQueryAPI() {
    /* 
     * Utilizamos el método ajax() de JQuery para realizar el request.
     * Hacemos la petición con POST y apuntamos al archivo "index.php" para que realice la suma.
     * Como datos de la request le pasamos una variable tipo json (data) con los 2 números a sumar.
     * Si la rquest es correcta, añadiremos el resultado de al resultH3.
     * En caso que no lo sea, se lo haremos saber al usuario.
     */
    $.ajax({
        type:"POST",
        url: "php/index.php",
        data: {
            "firstNum": num1,
            "secondNum": num2
        },
        success: (response) => {
            resultH3.className = "";
            resultH3.className = "correct";
            resultH3.innerHTML = response;
        },
        error: () => {
            resultH3.className = "";
            resultH3.className = "error";
            resultH3.innerHTML = "Incorrect input!";
        }
    });
}

function enLang() {
    //Creamos un array con todos los tags con el name="translate".
    let transArr = document.getElementsByName("translate");
    //Creamos la variable con los valores de la variable "elements" del archivo translations.js
    let elementEN = Object.values(elements);

    //Sustituimos el valor de cada tag en español por el correspondiente en inglés.
    //Comprobamos también que no sustituimos el resultado como tal.
    for (let j = 0; j < transArr.length; j++) {
        if (isNaN(transArr[j].innerHTML)) {
            document.getElementsByName("translate")[j].innerHTML = elementEN[j];
        }
    }
    //Cambiamos el atributo del idioma del html.
    let htmlLang = document.getElementById("htmlLang");
    htmlLang.setAttribute("lang", "en");
}

function esLang() {
    //Creamos un array con todos los tags con el name="translate".
    let transArr = document.getElementsByName("translate");
    //Creamos la variables con los keys de la variable "elements" del archivo translations.js
    let elementES = Object.keys(elements);

    //Sustituimos el valor de cada tag en inglés por el correspondiente en español.
    //Comprobamos también que no sustituimos el resultado como tal.
    for (let j = 0; j < transArr.length; j++) {
        if (isNaN(transArr[j].innerHTML)) {
            document.getElementsByName("translate")[j].innerHTML = elementES[j];
        }
    }
    //Cambiamos el atributo del idioma del html.
    let htmlLang = document.getElementById("htmlLang");
    htmlLang.setAttribute("lang", "es");
}