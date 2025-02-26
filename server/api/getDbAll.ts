import db from '../db/connDB'

export default defineEventHandler(async (event) => {
    // Пример запроса к базе данных
    const rows = db.prepare(`
        SELECT
            languages.name AS lang,
            regions.name AS region,
            hh.vac,
            hh.vacRef,
            hh.res,
            hh.datePars
        FROM hh
        JOIN languages ON hh.language_id = languages.id
        JOIN regions ON hh.region_id = regions.id;
        `).all();
    // const rows = db.prepare(`SELECT * FROM hhold`).all();
    return rows;
})
