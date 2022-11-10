<?php

class Conexion {

private static $db = "Productos";
private static $usuario = "root";
private static $servidor = "localhost";
private static $puerto = "3306";
private static $conexion;


public static function GetCon(){

  if (!isset(self::$conexion)) {
    self::$conexion = new PDO("mysql:dbname=".self::$db.";host=".self::$servidor.";port=".self::$puerto.";",self::$usuario,"");
  }
  return self::$conexion;
}

public function __clone(){
  trigger_error("imposible clonar", E_USER_ERROR());
}


}