<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-red-700 font-bold text-2xl">
          <Trash class="w-6 h-6" />
          Confirmar Exclusão
        </DialogTitle>
        <DialogDescription class="text-sm">
          Tem certeza que deseja <strong>excluir</strong> este item? <br />
          Esta ação não poderá ser desfeita.<br />
          Clique em <strong>Confirmar</strong> para continuar ou <strong>Cancelar</strong> para voltar.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          class="bg-white text-black shadow-md hover:bg-slate-100 transition-all cursor-pointer"
          type="button"
          @click="localOpen = false"
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          class="shadow-md hover:shadow-lg transition-all cursor-pointer"
          type="button"
          @click="$emit('confirm')"
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-vue-next";
import { ref, watch } from "vue";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isOpen', 'confirm']);

const localOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
  localOpen.value = newVal;
});
watch(() => localOpen.value, (newVal) => {
  emit('update:isOpen', newVal);
});
</script>
