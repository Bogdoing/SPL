<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { ChartItem, HhData } from '@/type/IdataJson'

const props = defineProps({
    urlData: Array as () => number[], // фильтр по языкам
    modeChart: String,
    hhData: Object as () => HhData | null 
})

// Настройки графика
const modeDb = ref([
    { label: 'Вакансии', id: 'v' },
    { label: 'Упоминания', id: 'vr' },
    { label: 'Резюме', id: 'r' },
    { label: 'Соотношение (v/r) Вак/Рез', id: 'ratio' }
])
const modeDbSelect = ref(modeDb.value[0].id)

// Регионы
const regions = ref([
    { label: 'Вся Россия', id: '113' },
    { label: 'Москва', id: '1' },
    { label: 'Воронеж', id: '26' }
])
const regionSelect = ref(regions.value[0].id)

// Получаем уникальные даты
const labels = computed(() => {
    if (!props.hhData) return []
    return [...new Set(props.hhData.hh.map(item => item.d))].sort()
})

// Получаем уникальные языки для выбранного региона
const languages = computed(() => {
    if (!props.hhData) return []

    const langIds = [...new Set(
        props.hhData.hh
            .filter(item =>
                item.reg_id === Number(regionSelect.value)
                && (!props.urlData || props.urlData.length === 0 || props.urlData.includes(item.l_id))           
            )
            .map(item => item.l_id)
    )]

    return langIds.map(id => ({
        id,
        name: props.hhData!.languages[id.toString()] || `Unknown (${id})`
    }))
})

// Подготовка данных для графика
const chartData = computed(() => {
    if (!props.hhData) return { labels: [], datasets: [] }

    const datasets = languages.value.map(lang => {
        const data = labels.value.map(date => {
            const item = props.hhData!.hh.find(d =>
                d.d === date &&
                d.l_id === lang.id &&
                d.reg_id === Number(regionSelect.value)
            )

            // Если выбран специальный режим "ratio"
            if (modeDbSelect.value === 'ratio'){
                if (item) {
                    return item.r !== 0 ? Number((item.r / item.v).toFixed(2)) : 0
                }
            }

            return item ? item[modeDbSelect.value as keyof ChartItem] as number : 0
        })

        const color = getRandomColor()
        return {
            label: lang.name,
            data,
            borderColor: color,
            backgroundColor: color,
            fill: false
        }
    })

    return {
        labels: labels.value,
        datasets
    }
})

// Функция генерации цвета
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

// Реакция на изменение параметров
// watch([regionSelect, modeDbSelect], () => {
//     if (props.hhData) {
//         console.log('Данные обновлены')
//     }
// })

// реактивная ссылка с дебаунсом
const debouncedValueRegion = useDebounce(regionSelect, 5000)
const debouncedValueMode = useDebounce(modeDbSelect, 5000)
// Реакция на изменение параметров
watch([debouncedValueRegion, debouncedValueMode], (newValue) => {
    if (props.hhData) {
        console.log('Данные обновлены')
    }
}, { immediate: true })

</script>

<template>
    <div>
        <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800 my-3" variant="soft">#CHARTS</UBadge>
        <USelectMenu
            v-model="regionSelect"
            value-key="id"
            :items="regions"
            class="w-40 mr-5 my-2 bg-(--bg)"
        />
        <USelectMenu
            v-model="modeDbSelect"
            value-key="id"
            :items="modeDb"
            class="w-40 mr-5 my-2 bg-(--bg)"
        />
        <ChartJLinesChart
            :data="chartData"
            :mode="modeChart"
        />
        <div v-if="modeDbSelect == 'ratio'" class="my-5">Чем меньше, тем лучше</div>
        <div v-else></div>
    </div>
</template>