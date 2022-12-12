
function AddEvent(){
    num1 = document.getElementById('num1').value;
    num2 = document.getElementById('num2').value;

    results = document.getElementById('results');

    $.ajax({
        type:'POST',
        url:"functions.php",
        data: {
            firstNum: num1,
            secondNum: num2
        },
        success: function(respuesta){
            results.innerHTML = respuesta;
        }
    });
    
}