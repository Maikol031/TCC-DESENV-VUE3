<template>
  <div class="w-60 h-full relative bg-green-700 hidden md:block">
    <!-- Título -->
    <div class="w-full flex gap-x-2 text-center border-b border-green-600 p-3">
      <Recycle class="w-8 h-8 text-white"/>
      <h1 class="text-white font-bold text-3xl">Eco Ponto</h1>
    </div>

    <!-- Itens do menu -->
   <div class="flex flex-col items-center gap-2 mt-4">
    <router-link
      v-for="item in rotas"
      :key="item.name"
      :to="{ name: item.name }"
      :class="[
        'flex items-center justify-start gap-3 w-56 rounded-md h-10 font-medium text-white px-4 transform transition-all duration-200 hover:scale-105 ',
        route.name === item.name ? 'bg-white/30 scale-102 shadow-xl' : ''
      ]"
    >
      <component :is="item.icon" class="w-5 h-5 text-white" />
      <span class="capitalize">{{ item.label }}</span>
    </router-link>
  </div>
  </div>
     <!-- Navbar Mobile -->
  <div class="bg-green-700 md:hidden p-3 flex items-center justify-between text-white">
    <div class="flex gap-x-2">
      <Recycle class="w-8 h-8"/>
      <h1 class="text-3xl font-bold">Eco Ponto</h1>
    </div>

    <!-- Botão hambúrguer -->
    <button @click="menuAberto = !menuAberto" class="focus:outline-none">
      <svg
        v-if="!menuAberto"
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <!-- Ícone de fechar -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>  

  <!-- Menu dropdown mobile -->
  <transition name="slide-down">
    <div
      v-if="menuAberto"
      class="absolute z-50 top-13 left-0 w-full bg-green-700 flex flex-col items-center md:hidden"
    >
      <router-link
        v-for="item in rotas"
        :key="item.name"
        :to="{ name: item.name }"
        class="flex items-center justify-start w-full h-12 font-medium text-white px-4
               transform transition-all duration-200 hover:scale-105 border-b-1 border-gray-200 gap-x-2"
        @click="menuAberto = false"
      >
        <component :is="item.icon" class="w-5 h-5 text-white" />
        <span class="capitalize">{{ item.label }}</span>
      </router-link>
    </div>
  </transition>


</template>

<script setup lang="ts">
import { ref } from "vue";
import { House, ClipboardPenLine, LogIn, Recycle } from "lucide-vue-next";
import { useRoute } from 'vue-router';

const route = useRoute();


const menuAberto = ref(false);

const rotas = ref([
  {
    label: "home",
    name: "home",
    icon: House,
  },
  {
    label: "register",
    name: "register",
    icon: ClipboardPenLine,
  },
  {
    label: "login",
    name: "login",
    icon: LogIn,
  },
]);
</script>
<style>
/* animação suave para o menu mobile */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
