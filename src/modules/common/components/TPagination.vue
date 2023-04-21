<template>
  <nav class="flex justify-center">
    <ul class="flex">
      <li>
        <button
          @click="currentPage = 1"
          class="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          {{ '<<<' }}
        </button>
      </li>
      <li>
        <button
          :disabled="currentPage === 1"
          @click="currentPage -= 1"
          class="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          {{ '<' }}
        </button>
      </li>
      <li>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="{
            'px-3 py-1 border border-gray-300 bg-white text-gray-700 font-bold':
              currentPage === page,
            'px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50':
              currentPage !== page,
          }"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage += 1"
          class="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          {{ '>' }}
        </button>
      </li>
      <li>
        <button
          @click="currentPage = totalPages"
          class="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
        >
          {{ '>>>' }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface Props {
  totalPages: number
  itemsPerPage: number
  currentPage: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), { maxVisiblePages: 3 })

const emit = defineEmits(['pageChanged'])

const currentPage = ref(props.currentPage)

const visiblePages = computed(() => {
  const maxVisiblePages = props.maxVisiblePages
  const currentPageValue = currentPage.value
  const totalPagesValue = props.totalPages

  if (totalPagesValue <= maxVisiblePages) {
    return Array.from({ length: totalPagesValue }, (_, i) => i + 1)
  }

  const halfVisiblePages = Math.floor(maxVisiblePages / 2)
  let startPage = currentPageValue - halfVisiblePages
  let endPage = currentPageValue + halfVisiblePages

  if (startPage < 1) {
    startPage = 1
    endPage = maxVisiblePages
  } else if (endPage > totalPagesValue) {
    endPage = totalPagesValue
    startPage = endPage - maxVisiblePages + 1
  }

  return Array.from({ length: maxVisiblePages }, (_, i) => i + startPage)
})

watch(currentPage, (value) => emit('pageChanged', value))
watch(
  () => props.currentPage,
  (value) => {
    currentPage.value = value
  }
)
</script>

<style></style>
