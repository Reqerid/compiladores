<?php
require_once '../../../vendor/autoload.php';  // Incluye el autoloader de Composer

$pdf = new TCPDF('');
$pdf->AddPage();
$pdf->SetFont('comic_sans_ms_b', '', 12);
$pdf->Write(10, 'Gabriel Martínez nació en 1985 en la ciudad de Buenos Aires, Argentina. Desde pequeño, mostró un gran interés por las artes y la tecnología, lo que lo llevó a estudiar diseño gráfico y programación en la universidad. Tras completar sus estudios, comenzó a trabajar en diversas agencias de publicidad, donde se destacó por su creatividad y habilidades técnicas.

A lo largo de su carrera, Gabriel combinó su amor por el diseño con su pasión por el desarrollo de software, creando aplicaciones innovadoras y herramientas para mejorar la experiencia del usuario. En 2015, fundó su propia empresa, especializada en soluciones digitales para pequeñas y medianas empresas.

Además de su faceta profesional, Gabriel es un apasionado de los viajes y la fotografía, y utiliza su tiempo libre para explorar nuevos lugares y capturar momentos únicos con su cámara. Su enfoque en la innovación y la creatividad lo ha convertido en una figura influyente en la industria tecnológica, y continúa buscando nuevas formas de hacer que la tecnología sea más accesible y útil para todos.

A lo largo de su vida, Gabriel ha mantenido un enfoque ético en su trabajo, comprometido con la sostenibilidad y el uso responsable de la tecnología.');
$pdf->Output();

?>