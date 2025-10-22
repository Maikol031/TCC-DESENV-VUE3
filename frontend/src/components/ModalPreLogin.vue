<template>
    <Dialog v-model:open="localOpen"">
    <DialogContent class=" sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle class="flex items-center gap-2">
                <Lock class="w-4 h-4" /> Login
            </DialogTitle>
            <DialogDescription class="text-sm">
                Este acesso é restrito a administradores do sistema.
                Se você é um administrador, clique em <strong>Continuar</strong> para prosseguir para a página de login.
            </DialogDescription>
        </DialogHeader>

        <DialogFooter>
            <Button class="bg-white text-black shadow-md hover:bg-slate-100 transition-all cursor-pointer" type="submit" @click="localOpen = false">
                Fechar
            </Button>
            <Button class="shadow-md hover:shadow-lg transition-all cursor-pointer" type="submit" @click="$emit('continue')">
                Continuar
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-vue-next";
import { ref, watch } from "vue";

interface Props {
    isOpen: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isOpen', 'continue']);

const localOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
    localOpen.value = newVal;
})

watch(() => localOpen.value, (newVal) => {
    emit('update:isOpen', newVal);
})

</script>