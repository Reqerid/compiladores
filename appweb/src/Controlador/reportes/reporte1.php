<?php
include ('../externo/fpdf186/fpdf.php');


$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
// Añadir el texto al PDF, convirtiendo UTF-8 a ISO-8859-1 para caracteres especiales
$pdf->Cell(40, 10, iconv('UTF-8', 'ISO-8859-1', '¡Hola mundo, éste es Gabriel!'));

$pdf->Output();



?>