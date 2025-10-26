<template>
  <div class="w-70 h-full relative bg-green-700 hidden md:block">
    <!-- Título -->
    <div class="w-full flex gap-x-2 text-center border-b border-green-600 p-3">
      <Recycle class="w-8 h-8 text-white" />
      <h1 class="text-white font-bold text-3xl">Eco Ponto</h1>
    </div>

    <!-- Itens do menu -->
    <div class="flex flex-col items-center gap-2 mt-4">
      <router-link v-for="item in rotas" :key="item.name" :to="item.name === 'login' ? '' : { name: item.name }" :class="[
        'flex items-center justify-start gap-3 p-6 w-64 rounded-md h-10 font-medium text-white px-4 transform transition-all duration-200 hover:scale-105 ',
        route.name === item.name ? 'bg-white/30 scale-102 shadow-xl' : ''
      ]" @click="item.label === 'logout' ? openModalConfirmLogout() : openModalPreLogin(item.name)">
        <component :is="item.icon" class="w-5 h-5 text-white shrink-0" />
        <span class="capitalize">{{ item.label }}</span>
      </router-link>
    </div>
  </div>
  <!-- Navbar Mobile -->
  <div class="bg-green-700 md:hidden p-3 flex w-full fixed items-center justify-between text-white">
    <div class="flex gap-x-2">
      <Recycle class="w-8 h-8" />
      <h1 class="text-3xl font-bold">Eco Ponto</h1>
    </div>

    <!-- Botão hambúrguer -->
    <button @click="menuAberto = !menuAberto" class="focus:outline-none">
      <svg v-if="!menuAberto" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <!-- Ícone de fechar -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Menu dropdown mobile -->
  <transition name="slide-down">
    <div v-if="menuAberto" class="fixed z-50 top-13 left-0 w-full bg-green-700 flex flex-col items-center md:hidden">
      <router-link v-for="item in rotas" :key="item.name" :to="item.name === 'login' ? '' : { name: item.name }" class="flex items-center justify-start w-full h-12 font-medium text-white px-4
               transform transition-all duration-200 hover:scale-105 border-b-1 border-gray-200 gap-x-2"
        @click="item.label === 'logout' ? openModalConfirmLogout() : openModalPreLogin(item.name)">
        <component :is="item.icon" class="w-5 h-5 text-white" />
        <span class="capitalize">{{ item.label }}</span>
      </router-link>
    </div>
  </transition>
    <ModalPreLogin 
    v-model:is-open="isOpenModal"
    @update:is-open="isOpenModal = $event"
    @continue="handleContinue()"
    />
    <ModalConfirmLogout
      v-model:is-open="isOpenModalLogout"
      @update:is-open="isOpenModalLogout = $event"
      @confirm="handleConfirmLogout()"
    />


</template>

<script setup lang="ts">
import { House, ClipboardPenLine, LogIn, Recycle, LogOut } from "lucide-vue-next";
import ModalConfirmLogout from "./ModalConfirmLogout.vue";
import { useRoute, useRouter } from 'vue-router';
import ModalPreLogin from "./ModalPreLogin.vue";
import { computed, ref } from "vue";
import Auth from "@/entities/Auth";


const route = useRoute();
const isOpenModal = ref<boolean>(false)
const isOpenModalLogout = ref<boolean>(false)
const router = useRouter(); 
const menuAberto = ref(false);
const authInstance = ref<Auth>(new Auth(undefined, router))


const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token')
})


const rotas = computed(() => [
  ...(!(menuAberto.value && route.name === 'home') ? [{
      label: "home",
      name: "home",
      icon: House,
    }] : []),
 ...(isAuthenticated.value ? [{
      label: "gerenciar pontos de coleta",
      name: "register",
      icon: ClipboardPenLine,
    }] : []),
  {
    label: isAuthenticated.value ? "logout" : "login",
    name: "login",
    icon: isAuthenticated.value ? LogOut : LogIn ,
  },
]);


const handleContinue = () => {
  isOpenModal.value = false;
  router.push({ name: 'login' });
};

const openModalConfirmLogout = () => {
  isOpenModalLogout.value = true
}

const handleConfirmLogout = () => {
  authInstance.value.logout()
}


const openModalPreLogin = (name: string, deviceType?: "mobile" | "desktop"): void => {

  if(deviceType === 'mobile') {
    menuAberto.value = false
  }
  if(name === 'login') {
    isOpenModal.value = true
    return
  }
  return
}

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
