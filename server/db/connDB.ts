import Database from 'better-sqlite3';
import path from 'path';

// Укажите путь к существующему файлу базы данных
const dbPath = path.join(process.cwd(), 'server/db/bc-27-12-2024.sqlite');
const db = new Database(dbPath, {
  verbose: console.log, // Опционально, для отладки
});


export default db;
