<script setup lang="ts">
import type { Task } from '~/types'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="flex max-w-[250px] mb-2 p-2 rounded bg-white shadow-sm"
  >
    <DragHandle />
    <span>{{ task.title }}</span>
  </div>
</template>
