var EditableTables = new EditableGrid("tablaPaginador", { enableSort: false });

$(window).ready((event) => {

    // metadatos de la libreria de editabletables (dice el nombre de las columnas,su tipo y si son editables)
    EditableTables.load({
        metadata: [
            { name: "#", datatype: "integer", editable: false },
            { name: "Codigo", datatype: "string", editable: true },
            { name: "Nombre", datatype: "string", editable: true },
            { name: "Precio", datatype: "double($,1)", editable: true }
        ]
    });

    // pagina la tabla
    paginador("paginador", 5);
    $(".paginador[pagina='1']").click();

    // pasa los valores de la tabla al editabletables
    EditableTables.attachToHTMLTable('tablaP');

    // validaciones de campos
    EditableTables.addCellValidator("Codigo", new CellValidator({
        isValid: function (value) {
            return value.length <= 10 && value.length > 0;
        }
    }));

    EditableTables.addCellValidator("Nombre", new CellValidator({
        isValid: function (value) {
            return value.length <= 20 && value.length > 0;
        }
    }));

    EditableTables.addCellValidator("Precio", new CellValidator({
        isValid: function (value) {
            return value.length <= 32 && value.length > 0 && parseInt(value) >= 0;
        }
    }));

    // renderiza la tabla con los valores
    EditableTables.renderGrid();

    // sirve para decir cuando la tabla ya esta renderizada
    cargado = true;

});

$("#CantidadEle").change((event) => {
    paginador("paginador", event.currentTarget.value);
    $(".paginador[pagina='1']").click();
});

EditableTables.modelChanged = function (rowIndex, columnIndex, oldValue, newValue, row) {

    let idFila = this.getRowId(rowIndex).replace("R", "");  //id del registro a modificar
    columnIndex; //indice del campo que modifico
    newValue; //nuevo valor a modificar

    $.ajax({
        url: "/Productos/controlers/tabla.php",
        method: "post",
        data: {
            Tipo: "Modificar Campo",
            iProducto: idFila,
            columnIndex: columnIndex,
            value: newValue
        },
        success: function (data) {
            ActualizarProductos(true);
        },
        error: function (data) {
            console.error("Error al modificar el registro: " + idFila, data);
        }
    });
}

// Proceso para guardar nuevos productos
$("#btn_GuardarProducto").click((event) => {

    if ($("#Codigo").val() == "" || $("#Codigo").val().length > 10) {
        alert("El Codigo es un campo obligatorio y debe ser menor a 10 caracteres");
        return;
    }

    if ($("#Nombre").val() == "" || $("#Nombre").val().length > 20) {
        alert("El Nombre es un campo obligatorio y debe ser menor a 20 caracteres");
        return;
    }

    if (isNaN($("#Precio").val()) || parseInt($("#Precio").val()) < 0 || $("#Precio").val().length <= 0 || $("#Precio").val().length > 32) {
        alert("El Precio debe ser un numero mayor a 0 y con menos de 32 caracteres");
        return;
    }

    $.ajax({
        url: "/Productos/controlers/tabla.php",
        method: "post",
        data: {
            Tipo: "Guardar Producto",
            Codigo: $("#Codigo").val(),
            Nombre: $("#Nombre").val(),
            Precio: $("#Precio").val()
        },
        success: function (data) {
            if (data) {
                ActualizarProductos(false);

                paginador("paginador", parseInt($("#CantidadEle").val()));
                $(".paginador[pagina='1']").click();

                $("#RegistrarProducto").modal("hide");

                alert("Producto guardado correctamente");
            } else {
                console.error(data);
                alert("Error al guardar el Producto");
            }
        },
        error: function (data) {
            console.error("Error al guardar el registro", data);
        }
    });

});

//proceso para eliminar productos

function eliminar(id) {

    if (!confirm("Esta seguro de querer eliminar el registro")) return;

    $.ajax({
        url: "/Productos/controlers/tabla.php?Tipo=Eliminar Producto&id="+id,
        method: "get",
        success: function (data) {

            if (data) {
                ActualizarProductos(false);

                paginador("paginador", parseInt($("#CantidadEle").val()));
                $(".paginador[pagina='1']").click();

                alert("Registro eliminado exitosamente");
            }else{
                alert("Error al eliminar el producto");

                console.error(data);
            }

        },
        error: function (data) {
            alert("Error al eliminar el producto");

            console.error(data);
        }
    });

}