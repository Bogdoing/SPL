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

const { data: chartData } = await useFetch(() => `/api/getLangReg/${modeDbSelect.value}/${regionSelect.value}/${props.urlData}`);

const labels = computed(() => {
    return [...new Set(chartData.value.map(item => item.datePars))] // Уникальные даты / Преобразование данных
})
const languages = computed(() => {
    return [...new Set(chartData.value.map(item => item.lang))] // Уникальные языки / Группировка данных по языкам
})

const datasets = computed(() => {
    const dataset = []
    languages.value.forEach(lang => {
        const data = labels.value.map(date => {
            const item = chartData.value.find(d => d.datePars === date && d.lang === lang);
            return item ? item[modeDbSelect.value] : 0; // Если данных нет, возвращаем 0
        });

        const color = getRandomColor()
        dataset.push({
            label: lang,
            data: data,
            borderColor: color, // Функция для генерации цвета
            backgroundColor: color,
            fill: false,
        });
    });
    console.log(dataset)
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
        <ChartLinesChart :data="data" :mode="props.modeChart"/>
    </ClientOnly>
</template>