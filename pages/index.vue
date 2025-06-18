<script setup>

useSeoMeta({
    title: 'СЯП.ру',
    ogTitle: 'СЯП.ру',
    description: 'description',
    ogDescription: 'ogDescription',
})

const posts = ref(
    [
        {
            title: 'Статистика вакансий и резюме из HHRU',
            date: 'Обновлено - Июнь 18, 2025',
            description: 'Обновлены запросы для парсинга',
            toLink: 'stats/hh'
        },
        {
            title: 'Статистика из GITHUB',
            date: '- ',
            description: 'Будет добавлено в скором будующем.',
        },
        {
            title: 'Статистика STACK OWERFLOW',
            date: ' - ',
            description: 'Будет добавлено в скором будующем.'
        },
    ]
)
</script>


<template>
<div class="relative -top-[10px] flex flex-col gap-8">
    <div v-for="post in posts">
        <Post :title="post.title" :date="post.date" :description="post.description" :toLink="post.toLink"/>
    </div>
    
</div>
</template>