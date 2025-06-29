import { ref, onMounted } from 'vue'

export function useGetJson(url: string) {
    const hhData = ref(null)
    const loading = ref(false)

    const loadData = async () => {
        loading.value = true
        try {
            const response = await fetch(`/${url}.json`)
            hhData.value = await response.json()
        } catch (error) {
            console.error('Ошибка загрузки:', error)
        } finally {
            loading.value = false
        }
    }

    onMounted(loadData)

    return {
        hhData,
        loading,
        loadData
    }
}