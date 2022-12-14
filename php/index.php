<?php 

    //Almacenamos el valor de cada input que hemos recibido por la request en una variable.
    $firstNum = $_POST['firstNum'];
    $secondNum = $_POST['secondNum'];

    //Esta función realiza la suma de los dos parámetros y la muestra. 
    function add($firstNum, $secondNum){
        $result = $firstNum + $secondNum;
        echo $result;
    }
    
    //Con un if, comprobaremos que lo introducido en los inputs sea realmente un número y que no estén vacíos.
    if( !is_numeric($firstNum) || !is_numeric($secondNum) ) 
    {
        //En caso que el valor de los inputs sea incorrecto, devolveremos el código de respuesta a la petición 403 (invalid format). 
        http_response_code(403);
    } else {
        /*
         * En caso que los datos introducidos por el usuario sean correctos, 
         * ejecutaremos la función add() con los dos números como parámetros.
         */
        add($firstNum, $secondNum);
    }

?>