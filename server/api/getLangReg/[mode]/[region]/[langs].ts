import db from '~/server/db/connDB'

export default defineEventHandler((event) => {
    const mode = getRouterParam(event, 'mode')
    const region = getRouterParam(event, 'region')
    const arr_lang = getRouterParam(event, 'langs')

    // Создаем строку с плейсхолдерами для каждого элемента массива
    const arr_lang_arr = arr_lang?.split('+')
    const placeholders = arr_lang_arr?.map(() => '?').join(',')

    const rows = db.prepare(`
        SELECT 
            hh.datePars,
            languages.name AS lang,
            ${modeSelection(mode || 'vac')},
            regions.name AS region
        FROM hh
            JOIN languages ON hh.language_id = languages.id
            JOIN regions ON hh.region_id = regions.id
        WHERE regions.name = ?
        AND   languages.name in (${placeholders})
        ORDER BY hh.datePars, languages.name;
    `).all(region, arr_lang_arr);

    return rows;
})

const modeSelection = (mod: string): string | null => {
    switch (mod) {
        case 'vac':
            return 'hh.vac';
        case 'vacRef':
            return 'hh.vacRef';
        case 'res':
            return 'hh.res';
        default:
            return null;
    }
};