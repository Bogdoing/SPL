<template>
    <canvas ref="myChart"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const myChart = ref(null);
const { $chart } = useNuxtApp(); // Получаем доступ к Chart.js через плагин

onMounted(() => {
    const ctx = myChart.value.getContext('2d');

    let dataChart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }]
    }

    let optionsChart = {
        plugins: {
            htmlLegend: {
                // ID of the container to put the legend in
                // containerID: 'legend-container',
            },
            legend: {
                display: true,
            }
        }
    }

    new $chart(ctx, {
        type: 'bar', // тип графика
        data: dataChart,
        options: optionsChart,
    });
});
</script>
