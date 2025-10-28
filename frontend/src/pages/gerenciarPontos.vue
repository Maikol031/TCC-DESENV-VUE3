<template>
  <div class="mt-10">
    <div class="w-full flex justify-end">
      <button v-if="userRole === 'admin' || userRole === 'organization'" @click="openModalFunc('add')" class="bg-white rounded-md p-3 font-medium border border-gray-200 mr-2 flex gap-x-1 cursor-pointer hover:bg-slate-50 duration-300 shadow"> <PlusIcon/> Criar Ponto De Coleta</button>
    </div>
    <CardPoints :items="items"  @item="openModalFunc('edit', $event)" @delete="openModalDelete($event)" />
  </div>
  <ModalCardPoints 
    v-model:open="isModalOpen"
    :items="selectedCard" 
    :method="modalMethod"
    :userRole="userRole"
    @close="getCollectionPoints(); isModalOpen = !isModalOpen"
  />
  <ModalConfirmeDelete 
    :is-open="isModalOpenModalDelete"
    @update:is-open="isModalOpenModalDelete = $event"
    @confirm="handleConfirmDelete()"
  />
</template>
<script setup lang="ts">
import CollectionPoint, { type ICollectionPoint } from "@/entities/CollectionPoint";
import ModalCardPoints from '@/components/ModalCardPoints.vue';
import CardPoints from '@/components/CardPoints.vue';
import { PlusIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import ModalConfirmeDelete from "@/components/ModalConfirmeDelete.vue";

const collectionPointInstance = ref<CollectionPoint>(new CollectionPoint())
const selectedId = ref<number>()
const items = ref<ICollectionPoint[]>([])
const isModalOpen = ref<boolean>(false)
const isModalOpenModalDelete = ref<boolean>(false)
const selectedCard = ref<ICollectionPoint>();

const modalMethod = ref<'edit' | 'add'>('add')
type UserRole = "admin" | "organization" | "manager";

const role = sessionStorage.getItem("role");
const userRole: UserRole | undefined =
  role === "admin" || role === "organization" || role === "manager"
    ? role
    : undefined;


const getCollectionPoints = async () => {
  const { data } = await collectionPointInstance.value.get();
  items.value = data.data;
}

const openModalDelete = (id: number) => {
  selectedId.value = id;
  isModalOpenModalDelete.value = true;
}

const handleConfirmDelete = async () => {
  if (selectedId.value) await collectionPointInstance.value.delete(selectedId.value);
  isModalOpenModalDelete.value = false;
  await getCollectionPoints();
}

const openModalFunc = (method: 'edit' | 'add', card: ICollectionPoint = new CollectionPoint()) => {
  selectedCard.value = JSON.parse(JSON.stringify(card));
  modalMethod.value = method;
  isModalOpen.value = true;
}



onMounted(async () => {
  await getCollectionPoints();
})


</script>