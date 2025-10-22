
<template>
  <AppLayout/>
  <DynamicAlert />
</template>

<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
import DynamicAlert from './components/DynamicAlert.vue';
import { provideAlert } from '@/composables/useAlert'


provideAlert()


</script>
