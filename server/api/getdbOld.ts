import db from '../db/connDB'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const langs = body.langs || [];

    if (langs.length === 0) {
        return { error: 'No languages provided' };
    }

    const placeholders = langs.map(() => '?').join(', ');
    const sql = `
        SELECT lang, datePars, vac FROM hh
        WHERE lang IN (${placeholders}) AND region = 1
    `;

    const rows = db.prepare(sql).all(langs);
    return rows;
});