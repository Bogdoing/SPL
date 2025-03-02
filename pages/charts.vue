<script setup>
const langs = 'Angular+Vue+React+php+python+Kotlin+Dart'
const urlLine = ref(langs)
</script>

<template>
    <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800" variant="soft">#CHARTS</UBadge>

    <ChartLine mode="nearest" :urlData="urlLine"/>

</template>