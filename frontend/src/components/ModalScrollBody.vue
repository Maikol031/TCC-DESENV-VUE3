<template>


    <Dialog v-model:open="localOpen">
        <DialogContent class=" sm:max-w-[425px] md:max-w-[600px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="pt-4 px-4 pb-0">
                <DialogTitle class="truncate max-w-[200px] md:max-w-[300px] text-2xl  font-semibold" :title="title">
                    {{ title }}
                </DialogTitle>

            </DialogHeader>

            <div class="overflow-y-auto px-6 py-4">
                <slot name="body" />
            </div>
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
} from '@/components/ui/dialog'

interface Props {
    title: string
    open: boolean
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