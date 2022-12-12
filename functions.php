<?php 

    $firstNum = $_POST['firstNum'];
    $secondNum = $_POST['secondNum'];

    function add($firstNum, $secondNum){
        $result = $firstNum + $secondNum;
        echo $result;
    }
    
    if(!is_numeric($firstNum) && !is_numeric($secondNum) ){
        throw new Exception("Not a number!");
    }
        echo "sum of 2  numbers is <br/>";
        add($firstNum, $secondNum);

?>