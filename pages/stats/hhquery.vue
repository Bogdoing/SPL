<script setup lang="ts">
import { elements } from 'chart.js';
import { getDescriptionLang } from '~/utils/getDescriptionLang'

useSeoMeta({
    title: 'Поисковые запросы',
    ogTitle: 'Поисковые запросы HH',
    description: 'description',
    ogDescription: 'ogDescription',
})

interface QueryItem {
  lang: string;
  query: string;
  queryFormat?: string; // опциональное поле
}

const query = ref(getDescriptionLang())

function addFormattedQuery(items: QueryItem[]): void {
  items.forEach(item => {
    item.queryFormat = item.query.replace(/\+/g, ' ');
  });
}
addFormattedQuery(query.value);
</script>

<template>
    <h1 class="text-[40px] font-black leading-[44px] mb-5">Поисковые запросы HH</h1>
    
    <div v-for="item in query" key="lang">
        <ul class="list-disc text-md p-2">
            <li class="break-words">
                <b>Язык программирования -> </b> {{ item.lang }}
            </li>
            <li class="break-words">
                <b>Query запрос для поиска по url -> </b> {{ item.query }}
            </li>
            <li class="break-words">
                <b>Query запрос для вставки в поисковик HH -> </b> {{ item.queryFormat }}
            </li>
        </ul>
    </div>


</template>