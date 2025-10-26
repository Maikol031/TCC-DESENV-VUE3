<template>
    <div class="flex flex-col md:flex-row min-h-[100vh]">
        <aside class="mb-15 md:mb-0">
            <Menu />
        </aside>
        <main class="break-words overflow-x-hidden bg-gray-100 p-4 h-[100vh] w-full">
            <h1 class="font-bold text-3xl md:text-4xl text-gray-700">{{ title }}</h1>
            <router-view class="m-4"></router-view>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Menu from '../components/Menu.vue';
import { useRoute } from 'vue-router';

const title = ref<string>("");
const route = useRoute();

watch(()=> route.meta.title, (value)=> {
    console.log(value)
    title.value = String(value);
});


</script>