import db from '~/server/db/connDB'

export default defineEventHandler((event) => {

    console.log(event.context.params)

    const arr_lang = getRouterParam(event, 'name')
    const arr_lang_arr = arr_lang?.split('+')
    // Создаем строку с плейсхолдерами для каждого элемента массива
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
        WHERE regions.name = '1' -- Пример фильтрации по региону
        AND   languages.name in (${placeholders})
        ORDER BY hh.datePars, languages.name;
    `).all(arr_lang_arr);

    return rows;
})


 // Пример запроса к базе данных
    // const rows = db.prepare(`
    //     SELECT 
    //         hh.datePars,
    //         languages.name AS lang,
    //         hh.vac
    //     FROM hh
    //         JOIN languages ON hh.language_id = languages.id
    //         JOIN regions ON hh.region_id = regions.id
    //     WHERE regions.name = '1' -- Пример фильтрации по региону
    //     ORDER BY hh.datePars, languages.name;
    // `).all();
    // const rows = db.prepare(`SELECT * FROM hhold`).all();