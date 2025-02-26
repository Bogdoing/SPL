<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
        <div id="legend-container"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

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

  // Define the htmlLegendPlugin first
const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);
    
        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

      // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
    
        items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
            const { type } = chart.config;
            if (type === 'pie' || type === 'doughnut') {
                chart.toggleDataVisibility(item.index);
            } else {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            }
            chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.flexShrink = 0;
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
    });
    },
};

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;
    
        legendContainer.appendChild(listContainer);
    }
    return listContainer;
};

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            htmlLegend: {
                containerID: 'legend-container',
            },
            legend: {
                display: false,
            },
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
