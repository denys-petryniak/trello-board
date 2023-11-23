<script setup lang="ts">
import type { Task } from '~/types'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="task flex max-w-[250px] mb-2 p-2 break-normal rounded bg-white shadow-sm"
  >
    <DragHandle />
    <span>{{ task.title }}</span>
  </div>
</template>

<style>
.task {
  word-break: break-word;
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
