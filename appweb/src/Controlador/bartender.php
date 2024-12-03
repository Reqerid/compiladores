<?php
session_start(); 


if (isset($_SESSION['usuario'])) {
    header("Location: src/Vista/menu.php"); 
    exit();}
?>