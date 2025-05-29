<script setup>
const langs = ref('Angular-Vue-React')

</script>

<template>
    <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800" variant="soft">#CHARTS</UBadge>

    <!-- <ChartJLine modeChart="nearest" :urlData="langsNameRes"/> -->

    <ChartJPie mode="nearest"/>
</template>