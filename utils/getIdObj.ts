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


export function getCurrColor(lang:string): string {
    const langsColor: Record<string, string> = {
        "1c":       '#D9531E',
        "ruby":     '#CC342D',
        "kotlin":   '#A97BFF',
        "swift":    '#F0553B',
        "dart":     '#00BFFF',
        "flutter":  '#47C5FB',
        "rust":     '#DEA584',
        "ts":       '#3178C6',
        "php":      '#777BB4',
        "python":   '#3776AB',
        "go":       '#00ADD8',
        "csharp":   '#68217A',
        "java":     '#f89820',
        "angular":  '#DD0031',
        "react":    '#61DAFB',
        "vue":      '#4FC08D',
        "js":       '#F7DF1E',
        "cpp":      '#00599C',
        "sql":      '#CD514C',
        "nodejs":   '#8CC084'
    }
    return langsColor[lang]
}
