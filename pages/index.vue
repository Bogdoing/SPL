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
            title: 'Графики',
            date: 'Обновлено - Май 29, 2025',
            description: 'json',
            toLink: 'chart'
        },
        {
            title: 'Статистика из GITHUB',
            date: 'Обновлено - Январь 19, 2024',
            description: 'Java вновь на первом месте',
            toLink: 'stats/git'
        },
        {
            title: 'Статистика вакансий и резюме из HHRU',
            date: 'Обновлено - Декабрь 11, 2023',
            description: 'Рынок 1С задыхается',
            toLink: 'stats/hh'
        },
        {
            title: 'Статистика STACK OWERFLOW',
            date: 'Обновлено - Июнь 1, 2022',
            description: 'Сервис умирает'
        },
        {
            title: 'Статистика ещё откуда нибудь',
            description: 'бла бла бла',
        },
])
</script>


<template>
<div class="relative -top-[10px] flex flex-col gap-8">
    <div v-for="post in posts">
        <Post :title="post.title" :date="post.date" :description="post.description" :toLink="post.toLink"/>
    </div>
    
</div>
</template>