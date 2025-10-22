<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <Lock class="w-4 h-4" />
          Confirmar Logout
        </DialogTitle>
        <DialogDescription class="text-sm">
          Tem certeza que deseja sair do sistema?
          <br />
          Clique em <strong>Confirmar</strong> para encerrar a sessão ou <strong>Cancelar</strong> para permanecer logado.
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
import { Lock } from "lucide-vue-next";
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
