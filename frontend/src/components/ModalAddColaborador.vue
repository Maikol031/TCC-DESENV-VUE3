<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="sm:max-w-[425px] z-100">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-green-700 font-bold text-2xl">
          <UserPlus class="w-6 h-6" />
          Selecionar Gestores
        </DialogTitle>
        <DialogDescription class="text-sm">
          Toque para selecionar um ou vários gestores.<br />
        </DialogDescription>
      </DialogHeader>

      <div class="my-4">
        <div class="flex flex-col gap-2 max-h-64 overflow-auto">
          <label
            v-for="gestor in gestoresFiltrados"
            :key="gestor.id"
            class="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-50"
          >
            <input
              type="checkbox"
              :value="gestor.id"
              v-model="selectedGestores"
              class="form-checkbox accent-green-700"
            />
            <span class="font-medium">{{ gestor.name }}</span>
            <span class="text-xs text-gray-500">({{ gestor.email }})</span>
          </label>
        </div>
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
          :disabled="selectedGestores.length === 0"
          @click="add"
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
import { computed, ref, watch } from "vue";
import Colaborator from "@/entities/Colaborator";
import { useAlert } from '@/composables/useAlert';

const { showAlert } = useAlert();

const colaboratorInstance = ref<Colaborator>(new Colaborator(showAlert))

interface Props {
  isOpen: boolean;
  usersCheck: any;
  pointId: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:isOpen', 'selectGestores', 'create']);

const localOpen = ref(props.isOpen);
const selectedGestores = ref<(string | number)[]>([]);
const gestores = ref<any>([])

const getList = async() => {
    const { data } = await colaboratorInstance.value.getAllUsers()
    gestores.value = data.data
}

const add = async () => {
    await colaboratorInstance.value.addPoint(props.pointId, { users_id: selectedGestores.value })
    emit("create")
    localOpen.value = false;
    selectedGestores.value = [];
}

const gestoresFiltrados = computed(() => {
  if (!Array.isArray(props.usersCheck)) return gestores.value;
  const idsCheck = props.usersCheck.map((u: any) => typeof u === 'object' ? u.id : u);
  return gestores.value.filter((g: any) => !idsCheck.includes(g.id));
});

watch(() => props.isOpen, async(newVal) => {
    await getList()
  localOpen.value = newVal;
});
watch(() => localOpen.value, (newVal) => {
  emit('update:isOpen', newVal);
});

</script>
