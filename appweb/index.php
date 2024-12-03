<?php
require 'src/Controlador/bartender.php';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <link rel="stylesheet" href="static/style.css?v=1">
</head>
<body>


    <div class="container">
    <div class="frame">
        <div class="nav">
        <ul class="links">
            <li class="signin-active"><a class="btn">Iniciar</a></li>
            <li class="signup-inactive"><a class="btn">Registrarse</a></li>
        </ul>
        </div>
        <div ng-app ng-init="checked = false">


            <form class="form-signin" action="src/Controlador/login.php" method="post" name="form">
                <label for="username">Correo</label>
                <input class="form-styling" type="email" name="email" placeholder="ejemplo@unach.mx" required /> <!-- Cambiado a nombre_usuario -->
                <label for="password">Contraseña</label>
                <input class="form-styling" type="password" name="contraseña" placeholder=";)" required /> <!-- Cambiado a contraseña -->
                <div class="btn-animate">
                    <button type="submit" class="btn-signin">Iniciar</button>
                </div>
            </form>




            <form class="form-signup" action="src/Controlador/registrar.php" method="post" name="form">
                <label for="fullname">Nombres</label>
                <input class="form-styling" type="name" name="fullname" placeholder="NOMBRES"required />
                <label for="fullname">Apellidos</label>
                <input class="form-styling" type="name" name="lastname" placeholder="APELLIDOS" required/>
                <label for="email">Email</label>
                <input class="form-styling" type="email" name="email" placeholder="ejemplo.01@unach.mx"required/>
                <label for="telefono">Telefono</label>
                <input class="form-styling" type="tel" name="phone" placeholder="9612345678" require pattern="[0-9]{10}" title="Ingresa un número a 10 digitos, por favor :)" required/>
                <label for="matricula">Matricula</label>
                <input class="form-styling" type="text" name="matricula" placeholder="A210400"required />
                <label for="password">Contraseña</label>
                <input class="form-styling" type="password" name="password" placeholder="CONTRASEÑA"required />
                <label for="confirmpassword">Confirmar contraseña</label>
                <input class="form-styling" type="password" name="confirmpassword" placeholder="CONTRASEÑA;" required/>
                <button type="button" id="btn-signup" class="btn-signup" ng-click="checked = !checked">Registrarse</button>
                
            </form>

            <div class="success">
                <svg width="270" height="270" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" id="check" ng-class="checked ? 'checked' : ''">
                <path fill="#ffffff" d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                        c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                        c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578" /> </svg>
                <div class="successtext">
                    <p>Gracias has sido registrado.</p>
                </div>
            </div>
        </div>

        <div class="forgot">
        <a href="#">Forgot your password?</a>
        </div>


    </div>


    
</body>
</html>

<script>
    $(document).ready(function() {
        $(".btn").click(function() {
            $(".form-signin").toggleClass("form-signin-left");
            $(".form-signup").toggleClass("form-signup-left");
            $(".frame").toggleClass("frame-long");
            $(".signup-inactive").toggleClass("signup-active");
            $(".signin-active").toggleClass("signin-inactive");
            $(".forgot").toggleClass("forgot-left");   
            $(this).removeClass("idle").addClass("active");
        });

        $("#btn-signup").click(function() {
            var form=document.querySelector(".form-signup");
            if (form.checkValidity()){
            // Animación para registrarse
            $(".nav").toggleClass("nav-up");
            $(".form-signup-left").toggleClass("form-signup-down");
            $(".success").toggleClass("success-left"); 
            $(".frame").toggleClass("frame-short");
            
            // Enviar formulario después de la animación
            setTimeout(function() {
                $(".form-signup").submit();
            }, 3000); // Tiempo en milisegundos, ajustable según la duración de la animación
            }else{
                form.reportValidity();
            }

        });
    });
</script>


