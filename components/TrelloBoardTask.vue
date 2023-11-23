<script setup lang="ts">
import type { Task } from '~/types'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{(event: 'delete'): void}>()

const focused = ref(false)

onKeyStroke('Backspace', (e) => {
  if (focused.value) {
    e.preventDefault()

    emit('delete')
  }
})
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="task flex max-w-[250px] mb-2 p-2 break-normal rounded bg-white shadow-sm"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
  >
    <DragHandle />
    <span>{{ task.title }}</span>
  </div>
</template>

<style>
.task {
  word-break: break-word;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}

.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: '';
  @apply absolute inset-0 bg-slate-300 rounded;
}
</style>
