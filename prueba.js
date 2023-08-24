var mysql = require('mysql');
const { test } = require('node:test');
const util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos"
  });
  function queryProductos(query) {
    let consulta = '';
    switch (query) {
        case 1:
            consulta = 'SELECT count(*) FROM ventas;';
            break;
        case 2:
            consulta = 'SELECT * FROM ventas ORDER BY fecha ASC LIMIT 1;';
            break;
        case 3:
            consulta = 'SELECT * FROM ventas ORDER BY fecha DESC LIMIT 1;';
            break; 
        case 4:
            consulta = 'SELECT sum(cantidad) FROM ventas_detalle;';
            break;
        case 5:
            consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre;';
            break;
        case 6:
            consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) DESC LIMIT 1;';
            break;
        case 7:
            consulta = 'SELECT nombre, sum(cantidad) FROM ventas_detalle GROUP BY nombre ORDER BY sum(cantidad) ASC LIMIT 1;';
            break;
        case 8:
        consulta = 'SELECT productos.nombre,ventas_detalle.nombre FROM productos left JOIN ventas_detalle using(nombre) where ventas_detalle.nombre is null;';
            break;
        case 9:
            consulta = 'SELECT sum(cantidad*precio) FROM ventas_detalle;';
            break; 
        case 10:
            consulta = 'SELECT id, fecha, hora, SUM(cantidad*precio) AS total FROM ventas v INNER JOIN ventas_detalle vd ON id_venta = id_venta GROUP BY id_venta, fecha, hora ORDER BY fecha, hora;';
            break;
        case 11:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha); ';
            break;
        case 12:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha) DESC LIMIT 1;';
            break;       
        case 13:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha) ASC LIMIT 1;';
            break;
        case 14:
            consulta = 'SELECT YEAR(fecha),SUM(cantidad*precio) FROM ventas_detalle INNER JOIN ventas ON id = id_venta GROUP BY YEAR (fecha);';
            break; 
        case 15:
            consulta = 'SELECT venta.id, SUM(venta.cantidad) AS Totalventas FROM venta GROUP BY venta.id ORDER BY SUM(venta.cantidad) DESC LIMIT 0 , 30 ;';
            break;
        case 16:
            consulta = 'SELECT YEAR(v.fecha) AS ano,(SELECT nombre FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id GROUP BY vd2.nombre ORDER BY SUM(vd2.cantidad) ASC LIMIT 1) AS producto_menos_vendido,(SELECT SUM(cantidad) FROM ventas_detalle vd2 WHERE vd2.id_venta = v.id AND vd2.nombre = (SELECT nombre FROM ventas_detalle vd3 WHERE vd3.id_venta = v.id GROUP BY vd3.nombre ORDER BY SUM(vd3.cantidad) ASC LIMIT 1)) AS cantidad_producto_menos_vendido FROM ventas v GROUP BY ano ORDER BY ano;';
            break;                                                       
        default:
            break;
    }

    return new Promise((resolve, reject) => {
        con.connect();
        con.query(consulta, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function reporte(query) {
    try {
        const results = await queryProductos(query);
        console.log(results);
    } catch (error) {
        console.error(error);
    } finally {
        con.end();
    }
}

console.log("test")
reporte(15).then(()=> {
    process.exit();
});

