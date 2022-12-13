//"Realiza la suma de 2 valores introducidos y enviados mediante AJAX a un PHP que devuelve el resultado para mostrarlo."//
function AddEvent(){
    num1 = document.getElementById("num1").value;
    num2 = document.getElementById("num2").value;
    resultDiv = document.getElementById("resultDiv");
    
    //FetchAPI();
    XMLHttpRequestAPI();
    //JQueryAPI();
}

function FetchAPI(){
    var data = new FormData();
    data.append("firstNum", num1);
    data.append("secondNum", num2);
    
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

function XMLHttpRequestAPI(){
    console.log('fff');
    var xmlhttp = new XMLHttpRequest();
    // pre-fill FormData from the form
    var data = new FormData();
    data.append("firstNum", num1);
    data.append("secondNum", num2);

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

function JQueryAPI(){
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

