<script setup>
const langs = ref('Angular+Vue+React')
const langs2 = ref('php+python+Kotlin+Dart')
</script>

<template>
    <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800" variant="soft">#CHARTS</UBadge>

    <ChartLine modeChart="nearest" :urlData="langs2"/>
    
    <!-- <ChartPie mode="nearest" :urlData="urlLine2"/> -->

</template>