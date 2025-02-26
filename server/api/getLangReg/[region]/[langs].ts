import db from '~/server/db/connDB'

export default defineEventHandler((event) => {
    const region = getRouterParam(event, 'region')
    const arr_lang = getRouterParam(event, 'langs')

    // Создаем строку с плейсхолдерами для каждого элемента массива
    const arr_lang_arr = arr_lang?.split('+')
    const placeholders = arr_lang_arr?.map(() => '?').join(',')

    const rows = db.prepare(`
        SELECT 
            hh.datePars,
            languages.name AS lang,
            hh.vac,
            regions.name AS region
        FROM hh
            JOIN languages ON hh.language_id = languages.id
            JOIN regions ON hh.region_id = regions.id
        WHERE regions.name = ? -- Пример фильтрации по региону
        AND   languages.name in (${placeholders})
        ORDER BY hh.datePars, languages.name;
    `).all(region, arr_lang_arr);

    return rows;
})