<script setup>
const props = defineProps({
    urlData: String,
    mode: String
})
// Запрос данных с сервера
const getChartData = await useFetch('/api/getLangReg/' + '113/' + props.urlData)
const chartData = getChartData.data

// Преобразование данных
const labels = [...new Set(chartData.value.map(item => item.datePars))]; // Уникальные даты
const datasets = [];

// Группировка данных по языкам
const languages = [...new Set(chartData.value.map(item => item.lang))]; // Уникальные языки
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
///
// Функция для генерации случайного цвета
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
const data = {
    labels: labels,
    datasets: datasets,
};
</script>

<template>
    <ClientOnly>
        <ChartLinesChart :data="data" :mode="props.mode"/>
    </ClientOnly>
</template>