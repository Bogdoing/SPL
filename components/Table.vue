<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'

type Table = {
    name: string    // название языка
    m_share: number // % рынка
    passing: number // изменения в сравнении с прошлым месяцем %
    vac: number     // кол-во вакансий
    rez: number     // кол-во резюме
    varRef: number  // отношение век/реф
    index: number   // индех востребованности
}
const data = ref<Table[]>([
    {
        name:    'php',
        m_share: 5,
        passing: -1.5,
        vac:     1234,
        rez:     594,
        varRef:  3,
        index:   0
    },
    {
        name:    'php',
        m_share: 5,
        passing: -1.5,
        vac:     1234,
        rez:     594,
        varRef:  3,
        index:   0
    }
])

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