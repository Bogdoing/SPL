<script setup lang="ts">
    const { data } = await useFetch('/api/hello')
</script>

<template>    
    <h1>SERVET</h1>
    {{ data }}
    <!-- <UiButton/> -->
</template>
