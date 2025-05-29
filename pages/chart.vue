<script setup>

useSeoMeta({
    title: 'Статистика языков по вакансиям HH',
    ogTitle: 'Статистика языков по вакансиям HH',
    description: 'description',
    ogDescription: 'ogDescription',
})

const langs = ref([])

const handleLangsUpdate = (newLangs) => {
    langs.value = newLangs.map(lang => Number(getIdObj(lang)));
}
</script>

<template>
    <h1 class="text-[40px] font-black leading-[44px]">Статистика языков по вакансиям HH</h1>
    <p class="mt-2 mb-10 text-[13px] text-gray-700 dark:text-gray-300">Май 29, 2025</p>

    <Collapsible @update:selected-langs="handleLangsUpdate"/>

    <ChartJLine modeChart="nearest" :urlData="langs" />

    <!-- <ChartJPie mode="nearest"/> -->
</template>