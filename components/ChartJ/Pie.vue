<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
    urlData: String,
    modeChart: String
})

// Реактивные данные
const hhData: Ref<HhData | null> = ref(null)
const loading = ref(false)

const modeDb = ref([
    { label: 'Вакансии', id: 'vac' },
    { label: 'Упоминания', id: 'vacRef' },
    { label: 'Резюме', id: 'res' }
])
const modeDbSelect = ref(modeDb.value[0].id)

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
onMounted(loadData)


const labels = computed(() => {
    if (!hhData.value) return []
    return [...new Set(hhData.value.hh.map(item => item.d))] // Уникальные даты / Преобразование данных
})

const datasets = computed(() => {
    const dataset = []
    const datasetLang = [] 
    const datasetData = [] 
    const datasetColor = [] 
    labels.value.forEach(lang => {
        const item = hhData.value.hh.find(d => d.lang === lang);
        datasetData.push(item[`SUM(hh.${(modeDbSelect.value)})`])
        datasetLang.push(lang)
        datasetColor.push(getRandomColor())
    });
    dataset.push({
        label: ' ',
        data: datasetData,
        borderColor: datasetColor, // Функция для генерации цвета
        backgroundColor: datasetColor,
        fill: false,
    });
    return dataset
})

const data = computed(() => { 
    return {
        labels: labels.value,
        datasets: datasets.value      
    }
})

// Функция для генерации случайного цвета
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
</script>

<template>
    <ClientOnly>
        <USelectMenu v-model="regionSelect" value-key="id" :items="regions"  class="w-40" />
        <USelectMenu v-model="modeDbSelect" value-key="id" :items="modeDb" class="w-40" />
        <ChartPieChart :data="data" :mode="props.modeChart"/>
    </ClientOnly>
</template>