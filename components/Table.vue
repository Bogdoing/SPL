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


let data = ref<Table[]>([])

dTable.forEach(item => {
    data.value.push({
        name:    getLanguageById(String(item.l_id)) || 'null',
        m_share: 5,
        passing: -1.5,
        vac:     item.v,
        rez:     item.r,
        varRef:  item.vr,
        index:   0
    })
})


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
    <!-- dataTable - {{ dataTable() }} <br>
    lastDates - {{ lastDates() }} <br>
    preDates - {{ preDates() }} -->
    <UTable :data="data" :columns="columns" class="flex-1" />
</template>