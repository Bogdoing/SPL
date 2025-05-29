<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
        <p :id="legendContainerId"></p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { externalTooltipHandler } from '~/utils/getTooltip'
import { htmlLegendPlugin } from '~/utils/getLegend'

// Генерация уникального ID для контейнера легенды
const legendContainerId = `legend-container-${Math.random().toString(36).substr(2, 9)}`;

Chart.register(...registerables);

const chartCanvas = ref(null);
const chartInstance = ref(null);

const props = defineProps({
    data: {},
    modeChart: String
})

const config = computed(() => {
    return {
        type: 'line',
        data: props.data,
        options: {
            interaction: {
                mode: props.modeChart,
                intersect: true,
            },
            plugins: {
                htmlLegend: {
                    containerID: legendContainerId,
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
    }
})

onMounted(() => {
    chartInstance.value = new Chart(chartCanvas.value, config.value);
});

// Обновляем график при изменении данных
watch(() => config, async (newData) => {
    if (chartInstance.value) {
        chartInstance.value.destroy(); // Уничтожаем предыдущий экземпляр графика
    }
    chartInstance.value = new Chart(chartCanvas.value, newData.value); // Создаем новый экземпляр графика
}, { deep: true });

</script>

<style scoped>
#legend-container {
    margin-top: 20px;
}
</style>
