<script setup lang="ts">
import type { Task } from '~/types'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div
    :title="task.createdAt.toLocaleDateString()"
    class="max-w-[250px] mb-2 p-2 rounded bg-white shadow-sm"
  >
    <span>{{ task.title }}</span>
  </div>
</template>
