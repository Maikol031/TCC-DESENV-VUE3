<template>
  <main class="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-x-2 gap-y-6">
    <div v-for="item in items" class="w-full h-50 bg-white rounded-xl shadow-sm max-w-full sm:max-w-120 md:max-w-120 xl:max-w-120 2xl:min-w-100 2xl:max-w-140
      flex flex-col">

      <div class="flex flex-col gap-4 flex-1 p-4">

        <div class="flex">
          <div class="flex min-w-0 w-full gap-x-2">
            <Trash2 class="w-6 h-6 md:w-8 md:h-8 text-green-600 shrink-0" />
            <span class="text-xl md:text-2xl text-gray-900 font-medium truncate min-w-0">{{ item.name }}</span>
          </div>

        </div>

        <div class="flex flex-col gap-2 ml-2 min-w-0">

          <div class="flex items-center gap-x-2">
            <MapPinned class="w-6 h-6 text-gray-500 shrink-0" />
            <span class="text-md text-gray-700 font-light truncate min-w-0">{{`${item.address.street}, ${item.address.number} - ${item.address.neighborhood}, ${item.address.city}`}}</span>
          </div>

          <div class="flex items-center gap-x-2 mt-1 md:mt-0">
            <PhoneCall class="w-6 h-6 text-gray-500 shrink-0" />
            <span class="text-md text-gray-700 font-light whitespace-normal">{{ formatPhone(Number(item.phone)) }}</span>
          </div>

        </div>
      </div>
      <div class="flex">
        <button @click="$emit('item', item)"
          class="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-bl-xl transition cursor-pointer">
          <InfoIcon class="w-5 h-5 text-white" />
          Ver Detalhes
        </button>
        <button @click="$emit('delete', item.id)"
          class="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white font-medium py-3 rounded-br-xl transition cursor-pointer">
          <Trash2 class="w-5 h-5 text-white" />
          Excluir
        </button>
      </div>
    </div>


  </main>
</template>
<script setup lang="ts">
import { Trash2, MapPinned, InfoIcon, PhoneCall } from "lucide-vue-next";
import type { ICollectionPoint } from "@/entities/CollectionPoint";


interface Props {
  items: ICollectionPoint[]
}

defineProps<Props>()


function formatPhone(phone: string | number): string {
  const onlyDigits = String(phone).replace(/\D/g, '')
  if (onlyDigits.length === 11) {
    // Celular com DDD: (99) 99999-9999
    return onlyDigits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (onlyDigits.length === 10) {
    // Fixo com DDD: (99) 9999-9999
    return onlyDigits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone ? String(phone) : ''
}


</script>
<style></style>