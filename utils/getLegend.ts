// Define the htmlLegendPlugin first
export const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart: { options: { plugins: { legend: { labels: { generateLabels: (arg0: any) => any; }; }; }; }; config: { type: any; }; toggleDataVisibility: (arg0: any) => void; setDatasetVisibility: (arg0: any, arg1: boolean) => void; isDatasetVisible: (arg0: any) => any; update: () => void; }, args: any, options: { containerID: string; }) {
        const tableDiv = getOrCreateLegendTable(chart, options.containerID);

        // Удаляем старые элементы таблицы
        while (tableDiv.firstChild) {
            tableDiv.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item: { index: any; datasetIndex: any; fillStyle: string; strokeStyle: string; lineWidth: string; fontColor: string; hidden: any; text: string; }) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.style.cursor = 'pointer';
            cellDiv.style.alignItems = 'center';
            cellDiv.style.display = 'flex';
            cellDiv.style.flexDirection = 'row';
            cellDiv.style.marginLeft = '10px';

            cellDiv.onclick = () => {
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
            boxSpan.style.flexShrink = '0';
            boxSpan.style.height = '1px';
            boxSpan.style.marginRight = '10px';
            boxSpan.style.width = '20px';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text.split(/[\s+]+/)[0]);
            textContainer.appendChild(text);

            cellDiv.appendChild(boxSpan);
            cellDiv.appendChild(textContainer);

            tableDiv.appendChild(cellDiv);
        });
    },
};

const getOrCreateLegendTable = (chart: any, id: string) => {
    const legendContainer = document.getElementById(id);
    let tableDiv = legendContainer.querySelector('.table');

    if (!tableDiv) {
        tableDiv = document.createElement('div');
        tableDiv.className = 'table';
        tableDiv.style.display = 'grid';
        tableDiv.style["grid-template-columns"] = 'repeat(auto-fill, minmax(125px, 1fr))';
        // tableDiv.style["grid-template-columns"] = 'repeat(auto-fill, minmax(150px, 1fr))';
        tableDiv.style.gap = '10px';

        legendContainer.appendChild(tableDiv);
    }
    return tableDiv;
};
