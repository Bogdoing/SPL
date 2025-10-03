<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'

const emit = defineEmits(['update:selectedLangs'])

const items = ref<CheckboxGroupItem[]>([
	"1c",
	"ruby",
	"kotlin",
	"swift",
	"dart",
	"flutter",
	"rust",
	"ts",
	"php",
	"python",
	"go",
	"csharp",
	"java",
	"angular",
	"react",
	"vue",
	"js",
	"cpp",
	"sql",
	"nodejs"
])
const value = ref<CheckboxGroupValue[]>([
	"php",
	"python",
	"go",
	"angular",
	"react",
	"vue",
	"js",
	"nodejs"
])

function getAllGroupItem(){
	value.value = items.value
}

function delAllGroupItem(){
	value.value = []
}



// реактивная ссылка с дебаунсом
const debouncedValue = useDebounce(value, 2000)

watch(debouncedValue, (newValue) => {
	emit('update:selectedLangs', newValue)
}, { immediate: true })
</script>

<template>
	<div class="w-full">
		<UCollapsible class="flex flex-col gap-3 w-full m-auto">
			<UButton
				class="group bg-(--bg)"
				label="Языки программирования"
				color="neutral"
				variant="outline"
				trailing-icon="i-lucide-chevron-down"
				:ui="{
						trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
				}"
			block
			/>

			<template #content>
				<UButtonGroup class="mb-3" orientation="vertical">
					<UButton v-on:click="getAllGroupItem" color="neutral" variant="outline" label="Получить все" />
					<UButton v-on:click="delAllGroupItem" color="neutral" variant="outline" label="Убрать все" />
				</UButtonGroup>
				<UCheckboxGroup v-model="value" :items="items"
					class="bg-gray-100 dark:bg-(--bg)"
				/>                
			</template>
		</UCollapsible>
	</div>
</template>

