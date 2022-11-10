<?php

include("../libraries/conexion.php");

class tabla{

    public static function ListarTodo(){
        // de momento lista todo

        try{
            $consulta = conexion::getcon()->prepare("SELECT iProducto, sCodigo, sNombre, rPrecio FROM Producto");
    
            $consulta->execute();
    
            $r = $consulta->fetchAll(PDO::FETCH_ASSOC);
    
            return $r;
    
        }catch(PDOExeption $e){
            return $e->message();
        }
    }

    public static function ActualizarCampo($id, $Campo, $Valor){

        try{
            $pst = Conexion::GetCon()->prepare("UPDATE Producto SET ".$Campo." = :".$Campo." WHERE iProducto = ".$id);
            $consulta = $pst->execute([":".$Campo => $Valor]);

            return $consulta;
        }catch(PDOExeption $e){
            return $e->message();
        }
    }

    public static function GuardarProducto($Codigo, $Nombre, $Precio){

        try{
            $pst = Conexion::GetCon()->prepare("INSERT INTO Producto(iProducto, sCodigo, sNombre, rPrecio) VALUES(NULL, :Codigo, :Nombre, :Precio)");
            $consulta = $pst->execute([":Codigo" => $Codigo, ":Nombre" => $Nombre, ":Precio" => $Precio]);

            return $consulta;
        }catch(PDOExeption $e){
            
            return $e->message();
        }

    }

    public static function EliminarProducto($id){
        try{
            $pst = Conexion::GetCon()->prepare("DELETE FROM Producto WHERE iProducto = :iProducto");
            $consulta = $pst->execute([":iProducto" => $id]);

            return $consulta;
        }catch(PDOExeption $e){
            
            return $e->message();
        }
    }

}