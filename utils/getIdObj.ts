//@param languagesData - Объект с языками в формате {"id": "name"}
/**
 * Находит ID языка по его названию (регистронезависимо)
 * 
 * @param languageName - Название языка для поиска
 * @returns {string|null} ID языка или null, если не найден
 */
export function getIdObj(languageName: string): string | null { // languagesData: Record<string, string>,
    const languagesData = {
        "1": "1c",
        "2": "ruby",
        "3": "kotlin",
        "4": "swift",
        "5": "dart",
        "6": "flutter",
        "7": "rust",
        "8": "ts",
        "9": "php",
        "10": "python",
        "11": "go",
        "13": "csharp",
        "14": "java",
        "15": "angular",
        "16": "react",
        "17": "vue",
        "19": "js",
        "21": "cpp",
        "27": "sql",
        "28": "nodejs"
    }

    // Нормализуем название для поиска (нижний регистр, удаляем спецсимволы)
    const normalizedSearch = languageName.toLowerCase().replace(/[.+]/g, '').trim();
    
    // Ищем совпадение
    const foundEntry = Object.entries(languagesData).find(([_, name]) => {
        const normalizedName = name.toLowerCase().replace(/[.+]/g, '').trim();
        return normalizedName === normalizedSearch;
    });

    return foundEntry ? foundEntry[0] : null;
}

export function getLanguageById(id: string): string | undefined {
    const languagesData: Record<string, string> = {
        "1": "1c",
        "2": "ruby",
        "3": "kotlin",
        "4": "swift",
        "5": "dart",
        "6": "flutter",
        "7": "rust",
        "8": "ts",
        "9": "php",
        "10": "python",
        "11": "go",
        "13": "csharp",
        "14": "java",
        "15": "angular",
        "16": "react",
        "17": "vue",
        "19": "js",
        "21": "cpp",
        "27": "sql",
        "28": "nodejs"
    };

    return languagesData[id];
}