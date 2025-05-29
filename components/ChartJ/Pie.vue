<script setup>
const props = defineProps({
    urlData: String,
    modeChart: String
})
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

const { data: chartData } = await useFetch(() => `/api/getSumLang/${modeDbSelect.value}/${regionSelect.value}/${props.urlData}`);

const labels = computed(() => {
    return [...new Set(chartData.value.map(item => item.lang))] // Уникальные даты / Преобразование данных
})

const datasets = computed(() => {
    const dataset = []
    const datasetLang = [] 
    const datasetData = [] 
    const datasetColor = [] 
    labels.value.forEach(lang => {
        const item = chartData.value.find(d => d.lang === lang);
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