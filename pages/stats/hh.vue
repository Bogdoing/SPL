<script setup>
import { ref } from 'vue'

useSeoMeta({
    title: 'Статистика языков по вакансиям HH',
    ogTitle: 'Статистика языков по вакансиям HH',
    description: 'description',
    ogDescription: 'ogDescription',
})

const langs = ref([])
const hhData = ref(null)
const loading = ref(false)

// Функция загрузки данных
const loadData = async () => {
    loading.value = true
    try {
        const response = await fetch('/dataSPL.json')
        hhData.value = await response.json()
    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        loading.value = false
    }
}

onMounted(loadData)

// Обработчик обновления языков
const handleLangsUpdate = (newLangs) => {
    langs.value = newLangs.map(lang => Number(getIdObj(lang)))
}

</script>

<template>
    <h1 class="text-[40px] font-black leading-[44px]">Статистика языков по вакансиям HH</h1>
    <p class="mt-2 mb-10 text-[13px] text-gray-700 dark:text-gray-300">Май 29, 2025</p>

    <Collapsible @update:selected-langs="handleLangsUpdate"/>

    <ClientOnly>
        <div v-if="loading">
            Загрузка данных...
            <UProgress animation="swing" size="lg" class="my-5"/>
        </div>
        <template v-else>
            <ChartJLine
                modeChart="nearest"
                :urlData="langs"
                :hhData="hhData"
            />
        </template>
    </ClientOnly>

</template>