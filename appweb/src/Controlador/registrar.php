<?php
require '../Modelo/conectabd01.php';

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    //obtención y sanitización de datos
    $fullname = $mysqli->real_escape_string(trim($_POST['fullname']));
    $lastname = $mysqli->real_escape_string(trim($_POST['lastname']));
    $email = $mysqli->real_escape_string(trim($_POST['email']));
    $phone = $mysqli->real_escape_string(trim($_POST['phone']));
    $matricula = $mysqli->real_escape_string(trim($_POST['matricula']));
    $password = $mysqli->real_escape_string(trim($_POST['password']));
    $confirmpassword = $mysqli->real_escape_string(trim($_POST['confirmpassword']));

    $errors =[];

    if (empty($fullname)||empty($lastname)||empty($email)||empty($phone)||empty($matricula)||empty($password)||empty($confirmpassword)){
        $errors[]="Debes completar todos los campos, gracias. :)";
    }

    if ($password !== $confirmpassword) {
        $errors[]="Tus contraseñas no coinciden, corrígelo, gracias. :)";
    }

    $email_query = $mysqli->query("SELECT * FROM usuarios WHERE nombre_usuario = '$email'");
    if ($email_query->num_rows > 0 ){
        $errors[]="Alguien ya registró tu email 0.0";
    }

    if (empty($errors)){
        //encriptar contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    

        $sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, email, telefono, 
        matricula, contraseña) 
        VALUES ('$fullname','$lastname','$email','$phone','$matricula','$hashed_password')"; 
    
        if ($mysqli->query($sql)==TRUE){
            echo "Registro exitoso.";
        } else {
            echo "ERROR".$sql."<br>".$mysqli->error;
        }
    }else{
        //mostrar errores
        foreach($errors as $error){
            echo "<p>$error</p>";
        }
    }
    $mysqli->close();
    header('Location:../../index.php');
    exit();

}
$mysqli->close();
?>
