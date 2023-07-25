import mongoProductDao from './dbManagers/products.dao.js';
import memoryProductDao from './fileManagers/products.dao.js';

const MongoProductDao = new mongoProductDao();
const MemoryProductDao = new memoryProductDao();

//export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryProductDao : MongoProductDao;
export const PRODUCTSDAO = MongoProductDao;
