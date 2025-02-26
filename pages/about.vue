<script setup>
// const getChartData = await useFetch('/api/getArrLang/php+python+Vue')
const getChartData = await useFetch('/api/getLangReg/113/php+Vue+python')
</script>

<template>
    <!-- {{ getChartData.data || getChartData.status ||'NaN' }} -->
    <br> <hr>
    <!-- {{ getChartData.data || 'NaN' }} -->


    <select class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
        <option selected="">Open this select menu</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select>

</template>