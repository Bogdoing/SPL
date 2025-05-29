<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

interface ChartItem {
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
    hh: ChartItem[]
}

const props = defineProps({
    urlData: Array,
    modeChart: String
})

// Реактивные данные
const hhData: Ref<HhData | null> = ref(null)
const loading = ref(false)

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

// Загрузка данных
const loadData = async () => {
    try {
        loading.value = true
        const response = await fetch('/dataSPL.json')
        hhData.value = await response.json()
    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        loading.value = false
    }
}

// Загружаем данные при монтировании
onMounted(async () => {
    await loadData()
})

// Получаем уникальные даты
const labels = computed(() => {
    if (!hhData.value) return []
    return [...new Set(hhData.value.hh.map(item => item.d))].sort()
})

// Получаем уникальные языки для выбранного региона
const languages = computed(() => {
    if (!hhData.value) return []

    const langIds = [...new Set(
        hhData.value.hh
            .filter(item =>
                item.reg_id === Number(regionSelect.value)
                && (!props.urlData || props.urlData.length === 0 || props.urlData.includes(item.l_id))           
            )
            .map(item => item.l_id)
    )]

    return langIds.map(id => ({
        id,
        name: hhData.value!.languages[id.toString()] || `Unknown (${id})`
    }))
})

// Подготовка данных для графика
const chartData = computed(() => {
    if (!hhData.value) return { labels: [], datasets: [] }

    const datasets = languages.value.map(lang => {
        const data = labels.value.map(date => {
            const item = hhData.value!.hh.find(d =>
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
watch([regionSelect, modeDbSelect], () => {
    if (hhData.value) {
        console.log('Данные обновлены')
    }
})

</script>

<template>
    <div>
        <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800 my-3" variant="soft">#CHARTS</UBadge>
        <ClientOnly>
            <div v-if="loading">
                Загрузка данных...
                <UProgress animation="swing" size="lg" class="my-5"/>
            </div>
            <template v-else>
                <!-- {{ urlData }} -->
                <USelectMenu
                    v-model="regionSelect"
                    value-key="id"
                    :items="regions"
                    class="w-40 mr-5 my-2"
                />
                <USelectMenu
                    v-model="modeDbSelect"
                    value-key="id"
                    :items="modeDb"
                    class="w-40 mr-5 my-2"
                />
                <ChartJLinesChart
                    :data="chartData"
                    :mode="modeChart"
                />
                <div v-if="modeDbSelect == 'ratio'" class="my-5">Чем меньше, тем лучше</div>
                <div v-else></div>
            </template>
        </ClientOnly>
    </div>
</template>