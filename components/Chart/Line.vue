<script setup>
const props = defineProps({
    urlData: String,
    mode: String
})

const regions = ref([
    ['113', '1', '26']
])
const regionSelect = ref(regions.value[0][0])

const { data: chartData } = await useFetch('/api/getLangReg/' + regionSelect.value + '/' + props.urlData);

const labels = [...new Set(chartData.value.map(item => item.datePars))]; // Уникальные даты / Преобразование данных
const languages = [...new Set(chartData.value.map(item => item.lang))]; // Уникальные языки / Группировка данных по языкам
const datasets = [];

languages.forEach(lang => {
    const data = labels.map(date => {
        const item = chartData.value.find(d => d.datePars === date && d.lang === lang);
        return item ? item.vac : 0; // Если данных нет, возвращаем 0
    });

    datasets.push({
        label: lang,
        data: data,
        borderColor: getRandomColor(), // Функция для генерации цвета
        fill: false,
    });
});

const data = {
    labels: labels,
    datasets: datasets,
};

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
        <USelectMenu v-model="regionSelect" :items="regions" class="w-40" />
        <ChartLinesChart :data="data" :mode="props.mode"/>
    </ClientOnly>
</template>