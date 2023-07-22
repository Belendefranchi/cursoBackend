import mongoProductDao from './dbManagers/products.dao.js';
//import del dao de manejo de datos con archivos

const MongoProductDao = new mongoProductDao();
//Crear las instancias de manejo de datos con archivos

//export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryProductDao : MongoProductDao;
export const PRODUCTSDAO = MongoProductDao;
