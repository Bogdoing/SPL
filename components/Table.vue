<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { ChartItem, HhData } from '@/type/IdataJson'
import { getLanguageById } from '@/utils/getIdObj'

const props = defineProps({
    hhData: Object as () => HhData | null 
})

type Table = {
    name: string    // название языка
    m_share: number // % рынка
    passing: number // изменения в сравнении с прошлым месяцем %
    vac: number     // кол-во вакансий
    rez: number     // кол-во резюме
    varRef: number  // отношение век/реф
    index: number   // индех востребованности
}

// Получаем уникальные даты
const lastDates = () => {
    if (!props.hhData) return []
    return [...new Set(props.hhData.hh.map(item => item.d))].sort().at(-1)
}
const ldate = lastDates()

// Получаем уникальные даты
const preDates = () => {
    if (!props.hhData) return []
    return [...new Set(props.hhData.hh.map(item => item.d))].sort().at(-2)
}
const pDate = preDates()

// Получаем уникальные языки для выбранного региона
const dataTable = () => {
    if (!props.hhData) return []

    return props.hhData!.hh.filter(d =>
        d.d === ldate &&
        d.reg_id === 1
    )
}
const dTable = dataTable()

// Получаем уникальные языки для выбранного региона
const dataTablePre = () => {
    if (!props.hhData) return []

    return props.hhData!.hh.filter(d =>
        d.d === pDate &&
        d.reg_id === 1
    )
}
const dTablePre = dataTable()

let data = ref<Table[]>([])

for (let i = 0; i < dTable.length; i++) {
    data.value.push({
        name:    getLanguageById(String(dTable[i].l_id)) || 'null',  // название языка
        m_share: -999,                                             // % рынка
        passing: ((dTable[i].v - dTablePre[i].v) / dTablePre[i].v) * 100, // изменения в сравнении с прошлым месяцем %
        vac:     dTable[i].v,                                        // кол-во вакансий
        rez:     dTable[i].r,                                        // кол-во резюме
        varRef:  dTable[i].vr,                                       // отношение век/реф
        index:   -999                                              // индех востребованности
    })
}
// dTable.forEach(item => {
//     data.value.push({
//         name:    getLanguageById(String(item.l_id)) || 'null',  // название языка
//         m_share: 5,                                             // % рынка
//         passing: -1.5,                                          // изменения в сравнении с прошлым месяцем %
//         vac:     item.v,                                        // кол-во вакансий
//         rez:     item.r,                                        // кол-во резюме
//         varRef:  item.vr,                                       // отношение век/реф
//         index:   0                                              // индех востребованности
//     })
// })

const columns: TableColumn<Table>[] = [
    {
        accessorKey: 'name',
        header: 'Название',
    },
    {
        accessorKey: 'm_share',
        header: '% рынка',
    },
    {
        accessorKey: 'passing',
        header: 'Изменение',
    },
    {
        accessorKey: 'vac',
        header: 'Вакансии',
    },
    {
        accessorKey: 'rez',
        header: 'Резюме',
    },
    {
        accessorKey: 'varRef',
        header: 'Вак/Рез',
    },
    {
        accessorKey: 'index',
        header: 'Индекс',
    },
]
</script>

<template>
    <UTable :data="data" :columns="columns" class="flex-1" />
</template>