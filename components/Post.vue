<script setup>
const props = defineProps({
    title: String,
    date: String,
    description: String,
    toLink: String
})

</script>

<template>
    <a
        class="block py-4 hover:scale-[1.005] scale-100 active:scale-100"
        style="opacity: 1; transition: transform 1.2s ease-in-out, opacity 0.2s linear 0.4s;"
    >
        <NuxtLink :to="props.toLink">
            <h2 class="text-[28px] font-black text-(--link)">
                {{ props.title }}
            </h2>
            <p class="text-[13px] text-gray-700 dark:text-gray-300">{{ props.date }}</p>
            <p class="mt-1">{{ props.description }}</p>
        </NuxtLink>
    </a>
</template>