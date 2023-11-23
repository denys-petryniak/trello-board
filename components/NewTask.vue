<script lang="ts" setup>
import { nanoid } from 'nanoid'
import type { Task } from '~/types'

const emit = defineEmits<{(event: 'add', payload: Task): void}>()

const focused = ref(false)
const title = ref('')

function createTask (e: Event) {
  if (title.value.trim()) {
    e.preventDefault()

    emit('add', {
      id: nanoid(),
      title: title.value.trim(),
      createdAt: new Date()
    } as Task)
  }

  title.value = ''
}
</script>

<template>
  <div>
    <textarea
      v-model="title"
      class="w-full p-2 resize-none rounded border-none focus:bg-white focus:shadow"
      :class="{ 'h-20': focused, 'h-10': !focused }"
      style="outline: none !important;"
      :placeholder="focused ? 'Enter a title for this card' : '+ Add a card'"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>
