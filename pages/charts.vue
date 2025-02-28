<script setup>
const langs = 'Angular+Vue+React+php+python'
const urlLine = ref(langs)
</script>

<template>
    <span class="float-right bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
        #CHARTS
    </span>

    <ChartLine mode="nearest" :urlData="urlLine"/>



    <!-- <ClientOnly>
        <ChartTestGTP/>
        <ChartTestCustomToltip/>
        <ChartTestDataChart :data="data"/>
    </ClientOnly> -->
</template>