import Database from "better-sqlite3";
import sqlite3 from 'sqlite3'; 
sqlite3.verbose(); 

// Obtener todos los productos
export function getAll(proyect) {
    const db = new Database(proyect);
    const query = "SELECT * FROM productos;";  // Cambiar 'clientes' por 'productos'
    const productos = db.prepare(query).all();
    db.close();
    return productos;
  }
  
  // Crear un nuevo producto
  export function create(proyect, dato) {
    const sql = "INSERT INTO productos(Name, Precio) VALUES(?, ?);";  // Asegúrate de usar 'Precio'
    const db = new Database(proyect);
    const insertData = db.prepare(sql);
    const resp = insertData.run(dato.Name, dato.Precio);  // Asegúrate de pasar 'Precio'
    db.close();
    return resp;
  }
  
  // Actualizar un producto existente por nombre
export function update(proyect, Name, data) {
    const db = new sqlite3.Database(proyect);
    db.run(`UPDATE productos SET Name = ?, Precio = ? WHERE Name = ?`, 
        [data.Name, data.Precio, Name], function(err) {  // Añadido 'Precio' en la actualización
        if (err) throw err;
    });
    db.close();
    return { success: true };
}

  // Eliminar un producto por ID
  export function remove(proyect, ID) {
    const db = new Database(proyect);
    db.run("DELETE FROM productos WHERE ID = ?", [ID], function(err) {
      if (err) {
        console.error(err.message);
        return null;
      }
      return this.changes;  // Retorna el número de registros eliminados
    });
    db.close();
  }
  