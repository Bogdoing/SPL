<script setup>
</script>

<template>
    <div class="mx-1 dark:bg-(--bg)">
        <hr class="h-px mx-2 bg-gray-200 border-0 dark:bg-gray-600">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-(--text)">
                статистика языков программирования
            </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <NuxtLink to="/" class="hover:underline me-4 md:me-6 text-(--link)">СЯП.ру </NuxtLink>
            </li>
            <li>
                <a href="https://github.com/Bogdoing/SPL" class="hover:underline me-4 md:me-6 text-(--link)">GITHUB</a>
            </li>
        </ul>
        </div>
    </div>

</template>