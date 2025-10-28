<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-green-700 font-bold text-2xl">
          <UserPlus class="w-6 h-6" />
          Convidar Usuário
        </DialogTitle>
        <DialogDescription class="text-sm">
          Informe o <strong>e-mail</strong> do usuário a ser convidado.<br />
          O convite será enviado para o endereço informado.
        </DialogDescription>
      </DialogHeader>
      <!-- Input de Email -->
      <div class="my-4 flex flex-col gap-2">
        <label for="invite-email" class="text-sm font-medium text-gray-700">E-mail</label>
        <input
          id="invite-email"
          type="email"
          v-model="email"
          class="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400"
          placeholder="Digite o e-mail"
        />
      </div>
      <DialogFooter>
        <Button
          class="bg-white text-black shadow-md hover:bg-slate-100 transition-all cursor-pointer"
          type="button"
          @click="localOpen = false"
        >
          Cancelar
        </Button>
        <Button
          class="bg-green-700 text-white shadow-md hover:bg-green-800 transition-all cursor-pointer"
          type="button"
          :disabled="!email"
          @click="confirmInvite"
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
import { UserPlus } from "lucide-vue-next";
import { ref, watch } from "vue";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isOpen', 'invite']);

const localOpen = ref(props.isOpen);
const email = ref('');

watch(() => props.isOpen, (newVal) => {
  localOpen.value = newVal;
});
watch(() => localOpen.value, (newVal) => {
  emit('update:isOpen', newVal);
});

function confirmInvite() {
  emit('invite', email.value);
  localOpen.value = false;
  email.value = ''; 
}
</script>
