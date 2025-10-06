<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { ChartItem, HhData } from '@/type/IdataJson'
import { getCurrColor } from '@/utils/getIdObj'

const props = defineProps({
    urlData: Array as () => number[], // фильтр по языкам
    modeChart: String,
    hhData: Object as () => HhData | null 
})

// Настройки графика
const modeDb = ref([
    { label: 'Вакансии', id: 'v' },
    { label: 'Упоминания', id: 'vr' },
    { label: 'Резюме', id: 'r' },
    { label: 'Соотношение (v/r) Вак/Рез', id: 'ratio' }
])
const modeDbSelect = ref(modeDb.value[0].id)

// Режимы отображения по уровням опыта
const gradeModes = ref([
    { label: 'Все уровни (сумма)', id: 'all' },
    { label: 'Без опыта (0)', id: '0' },
    { label: '1-3 года', id: '1-3' },
    { label: '3-6 лет', id: '3-6' },
    { label: '6+ лет', id: '6+' }
])
const gradeModeSelect = ref(gradeModes.value[0].id)

// Показывать ли данные старого формата
const showOldFormatData = ref(true)

// Регионы
const regions = ref([
    { label: 'Вся Россия', id: '113' },
    { label: 'Москва', id: '1' },
    { label: 'Воронеж', id: '26' }
])
const regionSelect = ref(regions.value[0].id)

// Функция для получения значения из элемента в зависимости от формата и выбранного уровня
const getItemValue = (item: any, key: string): number => {
    // Если есть структура grades (новый формат)
    if (item.grades) {
        if (gradeModeSelect.value === 'all') {
            // Суммируем значения по всем уровням
            return Object.values(item.grades).reduce((sum: number, grade: any) => {
                return sum + (grade[key] || 0)
            }, 0)
        } else {
            // Получаем значение для конкретного уровня
            return item.grades[gradeModeSelect.value]?.[key] || 0
        }
    }
    // Старый формат - прямое значение (gradeModeSelect игнорируется)
    return item[key] || 0
}

// Проверяем, есть ли данные с grades (новый формат)
const hasGradesData = computed(() => {
    if (!props.hhData) return false
    return props.hhData.hh.some(item => item.grades !== undefined)
})

// Проверяем, есть ли данные старого формата
const hasOldFormatData = computed(() => {
    if (!props.hhData) return false
    return props.hhData.hh.some(item => item.grades === undefined)
})

// Получаем уникальные даты
const labels = computed(() => {
    if (!props.hhData) return []
    return [...new Set(props.hhData.hh.map(item => item.d))].sort()
})

// Получаем уникальные языки для выбранного региона с учетом фильтра формата
const languages = computed(() => {
    if (!props.hhData) return []

    const langIds = [...new Set(
        props.hhData.hh
            .filter(item =>
                item.reg_id === Number(regionSelect.value) &&
                (!props.urlData || props.urlData.length === 0 || props.urlData.includes(item.l_id)) &&
                // Фильтр по формату данных
                (showOldFormatData.value || item.grades !== undefined)
            )
            .map(item => item.l_id)
    )]

    return langIds.map(id => ({
        id,
        name: props.hhData!.languages[id.toString()] || `Unknown (${id})`
    }))
})

// Подготовка данных для графика
const chartData = computed(() => {
    if (!props.hhData) return { labels: [], datasets: [] }

    const datasets = languages.value.map(lang => {
        const data = labels.value.map(date => {
            const item = props.hhData!.hh.find(d =>
                d.d === date &&
                d.l_id === lang.id &&
                d.reg_id === Number(regionSelect.value) &&
                // Фильтр по формату данных
                (showOldFormatData.value || d.grades !== undefined)
            )

            if (!item) return 0

            // Если выбран специальный режим "ratio"
            if (modeDbSelect.value === 'ratio'){
                const v = getItemValue(item, 'v')
                const r = getItemValue(item, 'r')
                return r !== 0 ? Number((r / v).toFixed(2)) : 0
            }

            return getItemValue(item, modeDbSelect.value)
        })

        const color = getCurrColor(lang.name)
        return {
            label: lang.name,
            data,
            borderColor: color,
            backgroundColor: color,
            fill: false
        }
    })

    return {
        labels: labels.value,
        datasets
    }
})

// реактивная ссылка с дебаунсом
const debouncedValueRegion = useDebounce(regionSelect, 5000)
const debouncedValueMode = useDebounce(modeDbSelect, 5000)
const debouncedValueGrade = useDebounce(gradeModeSelect, 5000)
const debouncedValueShowOld = useDebounce(showOldFormatData, 5000)
// Реакция на изменение параметров
watch([debouncedValueRegion, debouncedValueMode, debouncedValueGrade, debouncedValueShowOld], (newValue) => {
    if (props.hhData) {
        console.log('Данные обновлены')
    }
}, { immediate: true })

</script>

<template>
    <div>
        <UBadge class="float-right bg-purple-100 dark:bg-purple-900 dark:text-purple-300 text-purple-800 my-3" variant="soft">#CHARTS</UBadge>
        <USelectMenu
            v-model="regionSelect"
            value-key="id"
            :items="regions"
            class="w-40 mr-5 my-2 bg-(--bg)"
        />
        <USelectMenu
            v-model="modeDbSelect"
            value-key="id"
            :items="modeDb"
            class="w-40 mr-5 my-2 bg-(--bg)"
        />
        <USelectMenu
            v-model="gradeModeSelect"
            value-key="id"
            :items="gradeModes"
            class="w-40 mr-5 my-2 bg-(--bg)"
            v-if="hasGradesData"
        />
        <UCheckbox
            v-model="showOldFormatData"
            label="Показывать старый формат"
            class="mr-5 my-2"
            v-if="hasOldFormatData"
        />
        <ChartJLinesChart
            :data="chartData"
            :mode="modeChart"
        />
        <div v-if="modeDbSelect == 'ratio'" class="my-5">Чем меньше, тем лучше</div>
        <div v-else></div>
    </div>
</template>