<?php

include("../model/tabla.php");

if(isset($_GET["Tipo"]) && $_GET["Tipo"] == "json"){

    $json = ["metadata" => [], "data" => []];

    $json["metadata"] = [
        [
        "name" => "iProducto", 
        "label" => "#",
        "datatype" => "interger",
        "editable" => false
        ],
        [
            "name" => "sCodigo",
            "label" => "codigo",
            "datatype" => "string",
            "editable" => true
        ],
        [
            "name" => "sNombre",
            "label" => "nombre",
            "datatype" => "string",
            "editable" => true
        ],
        [
            "name" => "rPrecio",
            "label" => "precio",
            "datatype" => "float",
            "editable" => true
        ],
    ];

     $consulta = tabla::ListarTodo();

     foreach ($consulta as $key => $value) {
        
        $json["data"][] = [
            "id" => $value["iProducto"],
            "values" => $value
        ];

     }

     echo json_encode($json);

}elseif (isset($_GET["Tipo"]) && $_GET["Tipo"] == "Productos") {

    echo json_encode(tabla::ListarTodo());

}elseif(isset($_POST["Tipo"]) && $_POST["Tipo"] == "Modificar Campo"){

    $columna;

    switch ($_POST["columnIndex"]) {
        case 0:
            exit;
            break;
        case 1:

            $columna = "sCodigo";

            break;
        case 2: 

            $columna = "sNombre";

            break;
        case 3:

            $columna = "rPrecio";

            break;
        default:
            exit;
            break;
    }

    echo tabla::ActualizarCampo($_POST["iProducto"], $columna, $_POST["value"]);

}elseif(isset($_POST["Tipo"]) && $_POST["Tipo"] == "Guardar Producto"){

    echo tabla::GuardarProducto($_POST["Codigo"], $_POST["Nombre"], $_POST["Precio"]);

}elseif(isset($_GET["Tipo"]) && $_GET["Tipo"] == "Eliminar Producto"){
    echo tabla::EliminarProducto($_GET["id"]);
}