<template>
  <div class="mt-10">
    <div class="w-full flex justify-end">
      <button @click="openModalFunc('add',{})" class="bg-white rounded-md p-3 font-medium border border-gray-200 mr-2 flex gap-x-1 cursor-pointer hover:bg-slate-50 duration-300 shadow"> <PlusIcon/> Criar Ponto De Coleta</button>
    </div>
    <CardPoints :items="items"  @item="openModalFunc('edit', $event)" />
  </div>
  <ModalCardPoints v-model:isModalOpen="isModalOpen" :items="selectedCard" :method="modalMethod" />
</template>
<script setup lang="ts">
import CardPoints from '@/components/CardPoints.vue';
import CollectionPoint, { type ICollectionPoint } from "@/entities/CollectionPoint";
import { onMounted, ref } from 'vue';
import ModalCardPoints from '@/components/ModalCardPoints.vue';
import { PlusIcon } from 'lucide-vue-next';

const collectionPointInstance = ref<CollectionPoint>(new CollectionPoint())
const items = ref<ICollectionPoint[]>([])
const isModalOpen = ref<boolean>(false)
const selectedCard = ref<ICollectionPoint>();

const modalMethod = ref<'edit' | 'add'>('add')

const getCollectionPoints = async () => {

  const { data } = await collectionPointInstance.value.get()
  items.value = data.data
}

const openModalFunc = (method: 'edit' | 'add', card: any) => {
  selectedCard.value = card;
  modalMethod.value = method;
  isModalOpen.value = true
};


onMounted(async () => {
  await getCollectionPoints()
})


</script>
<style></style>