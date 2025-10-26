<template>
  <Dialog v-model:open="open" :key="open ? 'open' : 'closed'">
    <DialogContent
      class="sm:max-w-[425px] md:max-w-[600px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="pt-4 px-4 pb-0">
        <div
          v-if="enableInputName"
          class="flex flex-col md:flex-row gap-x-2 pt-2 truncate max-w-[300px] md:max-w-[300px] items-start"
        >
          <span class="text-2xl font-semibold">Nome:</span>
          <input
            v-model="name"
            type="text"
            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-60 disabled:bg-gray-100 enabled:bg-white"
            required
          />
        </div>

        <DialogTitle
          class="truncate max-w-[200px] md:max-w-[300px] text-2xl font-semibold"
          :title="title"
        >
          {{ title }}
        </DialogTitle>
      </DialogHeader>

      <div class="overflow-y-auto px-6 py-4">
        <slot name="body" />
      </div>

      <DialogFooter v-if="enableFooter" class="w-full px-8 pb-2">
        <slot name="actions" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  title: string
  enableFooter?: boolean
  enableInputName?: boolean
}

const name = defineModel<string>('name')
const open = defineModel<boolean>('open')
defineProps<Props>()
</script>
