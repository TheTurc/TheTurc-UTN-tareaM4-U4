var pool = require("./bd");

// SIRVE PARA LISTAR NOVEDADES
async function getNovedades() {
  var query = "select * from novedades";
  var rows = await pool.query(query);
  return rows;
}

async function deleteNovedadesById(id) {
  var query = "delete from novedades where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

async function insertNovedadesById(obj) {
  try {
    var query = "insert into novedades set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { getNovedades, deleteNovedadesById, insertNovedadesById };
