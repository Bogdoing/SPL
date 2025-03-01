<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
        <p id="legend-container"></p>
    </div>

    {{  }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { externalTooltipHandler } from '~/utils/getTooltip'
import { htmlLegendPlugin } from '~/utils/getLegendGrid'

Chart.register(...registerables);

const chartCanvas = ref(null);
const chartInstance = ref(null);

const props = defineProps({
    data: {},
    mode: String
})

const config = {
    type: 'line',
    data: props.data,
    options: {
        interaction: {
            mode: props.mode,
            intersect: true,
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

