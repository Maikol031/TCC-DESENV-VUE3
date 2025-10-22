<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <Alert 
      v-if="alertState.show" 
      :class="[
        'fixed top-4 left-4 right-5 md:left-auto mx-auto md:mx-0 z-50 w-[20rem] md:w-[30rem] max-w-sm md:max-w-md',
        alertState.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' :
        alertState.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
        alertState.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' :
        'bg-gray-50 border-gray-500 text-gray-700'
      ]"
    >
      <component 
        :is="alertIcon" 
        class="w-4 h-4"
        :class="[
          alertState.type === 'error' ? 'text-red-500' :
          alertState.type === 'success' ? 'text-green-500' :
          alertState.type === 'warning' ? 'text-yellow-500' :
          'text-gray-500'
        ]"
      />
      <AlertTitle class="capitalize">{{ getAlertTitle }}</AlertTitle>
      <AlertDescription>
        {{ alertState.message }}
      </AlertDescription>
    </Alert>
  </Transition>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-vue-next";
import { useAlert } from '@/composables/useAlert'
import { computed } from 'vue'

const { alert } = useAlert()
const alertState = computed(() => alert.value)


const alertIcon = computed(() => {
  switch (alertState.value.type) {
    case 'success':
      return CheckCircle2
    case 'error':
      return AlertCircle
    case 'warning':
      return AlertTriangle
    default:
      return AlertCircle
  }
})


const getAlertTitle = computed(() => {
  switch (alertState.value.type) {
    case 'success':
      return 'Sucesso'
    case 'error':
      return 'Erro'
    case 'warning':
      return 'Atenção'
    default:
      return 'Informação'
  }
})
</script>