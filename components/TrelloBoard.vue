<script setup lang="ts">
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import type { Column, Task } from '~/types'

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Create marketing landing page',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Develop cool new feature',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Fix page nav bug',
        createdAt: new Date()
      }
    ]
  },
  {
    id: nanoid(),
    title: 'Selected for Dev',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'QA',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'Completed',
    tasks: []
  }
])

const isAltKeyPressed = useKeyModifier('Alt')
</script>

<template>
  <div>
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      handle=".drag-handle"
      :animation="150"
      class="columns flex items-start gap-4 py-4 overflow-x-auto"
    >
      <template #item="{ element: column }: { element: Column }">
        <div
          class="min-w-[250px] p-5 rounded bg-gray-200"
        >
          <header class="mb-4 font-bold">
            <DragHandle />
            {{ column.title }}
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: isAltKeyPressed ? 'clone' : true }"
            item-key="id"
            handle=".drag-handle"
            :animation="150"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask
                  :task="task"
                  @delete="column.tasks = column.tasks.filter(task => task.id !== $event)"
                />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>
