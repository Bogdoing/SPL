<template>
    {{ foo }}
    <div>
        <canvas ref="chartCanvas"></canvas>
        <span id="legend-container"></span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { externalTooltipHandler } from '~/utils/getTooltip'
import { htmlLegendPlugin } from '~/utils/getLegend'

Chart.register(...registerables);

const chartCanvas = ref(null);
const chartInstance = ref(null);

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        // Add more datasets as needed
    ],
};

const config = {
    type: 'line',
    data: data,
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
};

onMounted(() => {
    chartInstance.value = new Chart(chartCanvas.value, config);
});
</script>

<style scoped>
#legend-container {
margin-top: 20px;
}
</style>

