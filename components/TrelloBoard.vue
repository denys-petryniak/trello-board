<script setup lang="ts">
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import type { Column, Task } from '~/types'

const columns = useLocalStorage<Column[]>('trelloBoard', [
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

function deleteTask (currentColumn: Column, currentTask: Task) {
  currentColumn.tasks = currentColumn.tasks.filter(task => task.id !== currentTask.id)
}

function createColumn () {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: []
  }

  columns.value.push(column)

  nextTick(() => {
    (document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
  })
}

function deleteColumn (currentColumn: Column) {
  if (currentColumn.title === '') {
    columns.value = columns.value.filter(column => column.id !== currentColumn.id)
  }

  return null
}
</script>

<template>
  <div class="flex items-start gap-4 py-4 overflow-x-auto">
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      handle=".drag-handle"
      :animation="150"
      class="flex items-start gap-4"
    >
      <template #item="{ element: column }: { element: Column }">
        <div
          class="column min-w-[250px] p-5 rounded bg-gray-200"
        >
          <header class="mb-4 font-bold">
            <DragHandle />
            <input
              v-model="column.title"
              type="text"
              class="title-input w-4/5 px-1 rounded bg-transparent focus:bg-white"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="deleteColumn(column)"
            >
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
                  @delete="deleteTask(column, task)"
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
    <button
      class="p-2 rounded whitespace-nowrap bg-gray-200 opacity-50"
      @click="createColumn"
    >
      + Add Another Column
    </button>
  </div>
</template>
