<template>


    <Dialog v-model:open="localOpen">
        <DialogContent class=" sm:max-w-[425px] md:max-w-[600px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="pt-4 px-4 pb-0">
                <div class="flex gap-x-2 pt-2 truncate max-w-[200px] md:max-w-[300px] " v-if="enableInputName">
                    <span class="text-2xl font-semibold">Nome:</span>
                    <input type="text" class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-60 disabled:bg-gray-100 enabled:bg-white" required>
                </div>
                <DialogTitle class="truncate max-w-[200px] md:max-w-[300px] text-2xl  font-semibold" :title="title">
                    {{ title }}
                </DialogTitle>

            </DialogHeader>

            <div class="overflow-y-auto px-6 py-4">
                <slot name="body" />
            </div>
            <DialogFooter v-if="enableFooter" class="w-full px-8 pb-2">
                <slot name="actions"/>
            </DialogFooter>
        </DialogContent>
    

    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'

interface Props {
    title: string
    open: boolean
    enableFooter?: boolean
    enableInputName?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:open'])

const localOpen = ref(props.open)

watch(() => props.open, (newVal) => {
    localOpen.value = newVal
})

watch(() => localOpen.value, (newVal) => {
    emit('update:open', newVal)
})

</script>