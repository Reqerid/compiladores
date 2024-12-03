<?php
session_start();
if (isset($_SESSION['usuario'])){}
else {header("Location:../../index.php");
    exit();}

?>