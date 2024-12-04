import Database from "better-sqlite3";
import sqlite3 from 'sqlite3'; 
sqlite3.verbose(); 

// Obtener todos los clientes
export function getAll(proyect) {
    const db = new Database(proyect);
    const query = "SELECT * FROM clientes;";
    const clientes = db.prepare(query).all();
    db.close();
    return clientes;
}

// Obtener un cliente por ID
export function get(proyect, id) {
    const db = new Database(proyect);
    const query = "SELECT * FROM clientes WHERE ID = ?;";
    const cliente = db.prepare(query).get(id);
    db.close();
    return cliente;
}

// Crear un nuevo cliente
export function create(proyect, dato) {
    const sql = "INSERT INTO clientes(Name) VALUES(?);";
    const db = new Database(proyect);
    const insertData = db.prepare(sql);
    const resp = insertData.run(dato.Name);
    db.close();
    return resp;
}

// Actualizar un cliente existente por ID
export function update(proyect, Name, data) {
    const db = new sqlite3.Database(proyect);
    db.run(`UPDATE clientes SET Name = ? WHERE Name = ?`, [data.Name, Name], function(err) {
        if (err) throw err;
    });
    db.close();
    return { success: true };
}

export function remove(proyect, ID) {
    // Lógica para eliminar un cliente de la base de datos
    const db = new sqlite3.Database(proyect);
    db.run("DELETE FROM clientes WHERE ID = ?", [ID], function(err) {
        if (err) {
            
            console.error(err.message);
            return null;
        }
        return this.changes;  // Retorna el número de registros eliminados
    });
    db.close();
}
