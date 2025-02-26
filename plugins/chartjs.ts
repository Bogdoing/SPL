// plugins/chartjs.js
import Chart from 'chart.js/auto';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('chart', Chart);
});
