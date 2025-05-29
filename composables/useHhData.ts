import type { Ref } from 'vue'
import { unref } from 'vue'

interface HhItem {
    l_id: number
    reg_id: number
    v: number
    vr: number
    r: number
    d: string
}

interface HhData {
    languages: Record<string, string>
    regionsHH: Record<string, string>
    hh: HhItem[]
}

export function useHhData() {
    // Получить все данные по 1 языку в заданном регионе
    const getLanguageInRegion = (data: Ref<HhData> | HhData, languageId: number, regionId: number) => {
        const hhData = unref(data).hh
        return hhData.filter(item =>
            item.l_id === languageId &&
            item.reg_id === regionId
        )
    }

    // Получить данные о произвольном количестве языков в регионе
    const getMultipleLanguagesInRegion = (data: Ref<HhData> | HhData, languageIds: number[], regionId: number) => {
        // const result: Record<number, typeof data.hh> = {}
        const result: Record<number, HhItem[]> = {} // Явное указание типа
        const hhData = unref(data).hh

        languageIds.forEach(langId => {
            result[langId] = hhData.filter(item =>
                item.l_id === langId &&
                item.reg_id === regionId
            )
        })

        return result
    }

    // Получить конкретные поля для региона
    const getRegionDataWithFields = (data: Ref<HhData> | HhData, regionId: number, fields: Array<'v' | 'vr' | 'r'>) => {
        const hhData = unref(data).hh
        return hhData
            .filter(item => item.reg_id === regionId)
            .map(item => {
                const result: any = { l_id: item.l_id, d: item.d }
                fields.forEach(field => {
                    if (field in item) {
                        result[field] = item[field]
                    }
                })
                return result
            })
    }

    // Получить все уникальные даты
    const getUniqueDates = (data: Ref<HhData> | HhData): string[] => {
        console.log('getUniqueDates')
        const hhData = unref(data).hh
        console.log(hhData)
        const dates = new Set<string>();

        hhData.forEach(item => {
            if (item.d && typeof item.d === 'string') {
                dates.add(item.d);
            }
        });

        return Array.from(dates).sort((a, b) =>
            new Date(a).getTime() - new Date(b).getTime()
        );
    }

    // Вспомогательные функции
    const getLanguageName = (languageId: number) => {
        return unref(data).languages[languageId.toString()]
    }

    const getRegionName = (regionId: number) => {
        return unref(data).regionsHH[regionId.toString()]
    }

    return {
        getLanguageInRegion,
        getMultipleLanguagesInRegion,
        getRegionDataWithFields,
        getLanguageName,
        getRegionName,
        getUniqueDates
    }
}