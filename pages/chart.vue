<script setup>

useSeoMeta({
    title: 'Статистика языков по вакансиям HH',
    ogTitle: 'Статистика языков по вакансиям HH',
    description: 'description',
    ogDescription: 'ogDescription',
})

// const langs = ref([15, 16, 17])

</script>

<template>

    <h1 class="text-[40px] font-black leading-[44px]">Статистика языков по вакансиям HH</h1>
    <p class="mt-2 mb-10 text-[13px] text-gray-700 dark:text-gray-300">Май 29, 2025</p>


    <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800" variant="soft">#CHARTS</UBadge>

    <ChartJLine modeChart="nearest" :urlData="langs"/>

    <!-- <ChartJPie mode="nearest"/> -->
</template>