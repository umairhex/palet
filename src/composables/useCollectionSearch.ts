import { ref, computed, type Ref } from 'vue'

interface SearchConfig<T> {
  searchFields: (keyof T)[]
  categoryField?: keyof T
  allCategoryLabel?: string
  defaultSort?: string
  sortStrategies?: Record<string, (a: T, b: T) => number>
}

export function useCollectionSearch<T>(items: Ref<T[]>, config: SearchConfig<T>) {
  const searchQuery = ref('')
  const activeCategory = ref(config.allCategoryLabel || 'All')
  const sortBy = ref(config.defaultSort || 'date')

  const filteredItems = computed(() => {
    let result = [...items.value]

    const allLabel = config.allCategoryLabel || 'All'
    if (config.categoryField && activeCategory.value !== allLabel) {
      result = result.filter((item) => {
        const val = item[config.categoryField!]
        if (Array.isArray(val)) {
          return (val as string[]).includes(activeCategory.value)
        }
        return val === activeCategory.value
      })
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter((item) => {
        return config.searchFields.some((field) => {
          const val = item[field]
          if (Array.isArray(val)) {
            return val.some((v) => String(v).toLowerCase().includes(q))
          }
          return String(val || '')
            .toLowerCase()
            .includes(q)
        })
      })
    }

    if (config.sortStrategies && config.sortStrategies[sortBy.value]) {
      result.sort(config.sortStrategies[sortBy.value])
    }

    return result
  })

  return {
    searchQuery,
    activeCategory,
    sortBy,
    filteredItems,
  }
}
