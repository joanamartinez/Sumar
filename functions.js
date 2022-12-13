//"Realiza la suma de 2 valores introducidos y enviados mediante AJAX a un PHP que devuelve el resultado para mostrarlo."//

function addEvent() {
    //Almacenamos el valor de cada input en una variable.
    num1 = document.getElementById("num1").value;
    num2 = document.getElementById("num2").value;
    //Almacemnos en una variable el <div> donde queremos mostrar el resultado de la suma.
    resultDiv = document.getElementById("resultDiv");
    
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
     * Utilizamos el método POST porque queremos crear una nueva suma. 
     * Como body de la request le pasamos la variable creada anteriormente con FormData (los 2 números a sumar).
     * Pasamos la respuesta a json y añadimos el resultado de la request al resultDiv.
     * En caso que la request sea errónea, se lo haremos saber al usuario.
     */
    fetch("functions.php",{
        method: "POST",
        body: data
    })
    .then((response) => response.json())
    .then((result) => {
        resultDiv.className = "";
        resultDiv.className = "correct";
        return resultDiv.innerHTML = result;
    })
    .catch(() => {
        resultDiv.className = "";
        resultDiv.className = "error";
        resultDiv.innerHTML = "Incorrect input!";
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
     * En cuanto el estado de la request pase a completada, añadiremos al resultDiv el resultado de la suma.
     * En caso que la request resulte errónea, se lo haremos saber al usuario.
     * Hacemos la request al archivo de php con XMLHttpRequest. 
     * Utilizamos el método POST porque queremos crear una nueva suma. 
     * Y enviamos los datos necesarios para realizar el cálculo.
     */
    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            resultDiv.className = "";
            resultDiv.className = "correct";
            resultDiv.innerHTML = this.response;

        } else if(this.status == 404){
            resultDiv.className = "";
            resultDiv.className = "error";
            resultDiv.innerHTML = "Incorrect input!";
        }

    };
    xmlhttp.open("POST", "functions.php");
    xmlhttp.send(data);
}

function JQueryAPI() {
    /* 
     * Utilizamos el método ajax() de JQuery para realizar el request.
     * Hacemos la petición con POST y apuntamos al archivo "functions.php" para que realice la suma.
     * Como datos de la request le pasamos una variable tipo json (data) con los 2 números a sumar.
     * Si la rquest es correcta, añadiremos el resultado de al resultDiv.
     * En caso que no lo sea, se lo haremos saber al usuario.
     */
    $.ajax({
        type:"POST",
        url: "functions.php",
        data: {
            "firstNum": num1,
            "secondNum": num2
        },
        success: (response) => {
            resultDiv.className = "";
            resultDiv.className = "correct";
            resultDiv.innerHTML = response;
        },
        error: () => {
            resultDiv.className = "";
            resultDiv.className = "error";
            resultDiv.innerHTML = "Incorrect input!";
        }
    });
}

function enLang() {
    //Creamos un array con todos los tags con el name="translate".
    let transArr = document.getElementsByName("translate");
    //Creamos dos variables con los valores de la variable elements del archivo translations.js
    let elementES = Object.keys(elements);
    let elementEN = Object.values(elements);

    //Sustituimos el valor de cada tag en español por el correspondiente en inglés.
    for (let i = 0; i < elementES.length; i++) {
        for (let j = 0; j < transArr.length; j++) {
            console.log(transArr[j].innerHTML)
            document.getElementsByName("translate")[j].innerHTML = elementEN[j];
        }
    }
}

function esLang() {
    //Creamos un array con todos los tags con el name="translate".
    let transArr = document.getElementsByName("translate");
    //Creamos dos variables con los valores de la variable elements del archivo translations.js
    let elementES = Object.keys(elements);
    let elementEN = Object.values(elements);

    //Sustituimos el valor de cada tag en inglés por el correspondiente en español.
    for (let i = 0; i < elementEN.length; i++) {
        for (let j = 0; j < transArr.length; j++) {
            console.log(transArr[j].innerHTML)
            document.getElementsByName("translate")[j].innerHTML = elementES[j];
        }
    }
}