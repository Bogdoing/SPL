// Define the htmlLegendPlugin first
export const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart: { options: { plugins: { legend: { labels: { generateLabels: (arg0: any) => any; }; }; }; }; config: { type: any; }; toggleDataVisibility: (arg0: any) => void; setDatasetVisibility: (arg0: any, arg1: boolean) => void; isDatasetVisible: (arg0: any) => any; update: () => void; }, args: any, options: { containerID: string; }) {
        const ul = getOrCreateLegendList(chart, options.containerID);
    
        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
    
        items.forEach((item: { index: any; datasetIndex: any; fillStyle: string; strokeStyle: string; lineWidth: string; fontColor: string; hidden: any; text: string; }) => {
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
            boxSpan.style.flexShrink = '0';
            boxSpan.style.height = '0';
            boxSpan.style.marginRight = '10px';
            boxSpan.style.width = '20px';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            // const text = document.createTextNode(item.text.split(/[\s+]+/)[0]);
            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    },
};

const getOrCreateLegendList = (chart: any, id: string) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = '0';
        listContainer.style.padding = '0';
    
        legendContainer.appendChild(listContainer);
    }
    return listContainer;
};
