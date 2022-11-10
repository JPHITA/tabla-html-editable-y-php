var Productos;
var cargado = false;

$(document).ready((event) => {
    ActualizarProductos(false);
});

//crea el paginador segun el numero de paginas

function paginador(id, Elementos) {

    let ele = $("#" + id);
    let numPaginas = Math.ceil(Productos.length / Elementos);

    let htmlPaginador = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"> 
        <div class="btn-group mr-2" role="group" aria-label="First group">
            <button class="btn btn-secondary paginador" pagina="1"><</button>
            {p_Botones}
            <button type="button" class="btn btn-secondary paginador" pagina="${numPaginas}">></button>
        </div>
    </div>`;

    let htmlBotones = "";
    for (let i = 1; i <= numPaginas; i++) {
        htmlBotones += '<button class="btn btn-secondary paginador" pagina="' + i + '">' + i + '</button>';
    }

    ele.html(htmlPaginador.replace("{p_Botones}", htmlBotones));

    $(".paginador").click(MoverPagina);
}

//actualiza la tabla y renderiza la modificacion en la tabla (solo sirve en un evento onclick)

function MoverPagina(event) {
    
    let inicio;
    let final;
    let Elementos = $("#CantidadEle");

    final = parseInt(event.currentTarget.getAttribute("pagina")) * parseInt(Elementos.val());  //numero de la pagina multiplicado por el numero de elementos por pagina

    inicio = final - parseInt(Elementos.val()); //ultimo elemento menos el numero de elementos

    let htmlTabla = "";

    for (let i = inicio; i < final; i++) {

        if (typeof Productos[i] != "undefined") {

            htmlTabla += `
                <tr id="R${Productos[i].iProducto}">
                    <td>${Productos[i].iProducto}</td>
                    <td>${Productos[i].sCodigo}</td>
                    <td>${Productos[i].sNombre}</td>
                    <td>${Productos[i].rPrecio}</td>
                    <td><input type="button" class="btn btn-danger btn-sm" style="width:80px" value="Eliminar" onclick="eliminar(${Productos[i].iProducto})"></td>
                </tr>
            `;

        }

    }

    $("#tablaP tbody").html(htmlTabla);

    if(cargado){
        EditableTables.attachToHTMLTable("tablaP");
        EditableTables.renderGrid();
    } 
}

//hace la peticion al servidor y trae todos los productos y los almacena en la variable: Productos

function ActualizarProductos(async = true){
    $.ajax({
        url: "/Productos/controlers/tabla.php?Tipo=Productos",
        method: "get",
        dataType: "json",
        async: async,
        success: function (data) {
            Productos = data;
        },
        error: function(data){
            console.error("error actualizando productos");

            console.log(data);
        }
    });
}