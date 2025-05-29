export const testSpeedLoadJson = async () => {
    const chartData = await fetch('/dataSPL.json').then(r => r.json());
    console.time('loadJSON');
    const dataTestLoad = await fetch('/dataSPL.json').then(r => r.json());
    console.timeEnd('loadJSON'); // > 300 мс — повод оптимизировать

    // console.time('filter');
    // const dataTestLoadFilter = chartData.value.hh.filter(item => item.language === 'JavaScript');
    // console.timeEnd('filter'); // > 100 мс — повод для группировки
}