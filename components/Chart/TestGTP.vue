<template>
    <div>
        <canvas ref="myChart"></canvas>
        <span id="legend-container"></span>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

import { externalTooltipHandler } from '~/utils/getTooltip'
import { htmlLegendPlugin } from '~/utils/getLegend'

const myChart = ref(null);
const { $chart } = useNuxtApp(); // Получаем доступ к Chart.js через плагин

onMounted(() => {
    const ctx = myChart.value.getContext('2d');
    new $chart(ctx, {
        type: 'line', // тип графика
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'php',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: '#e0b5f4',
                    borderColor: '#e0b5f4',
                    borderWidth: 1
                },
                {
                    label: 'js',
                    data: [2, 5, 6, 7, 9, 2],
                    backgroundColor: '#ab4699',
                    borderColor: '#ab4699',
                    borderWidth: 1
                }
            ]
        },
        options: {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            htmlLegend: {
                containerID: 'legend-container',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler
            }
        },
    },
    plugins: [htmlLegendPlugin],
    });
});
</script>
