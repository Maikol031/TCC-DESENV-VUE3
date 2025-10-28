<template>
  <div class="relative">
    <input
      :id="id"
      :type="realInputType"
      v-model="inputValue"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="placeholder ? ' ' : ''"
      :class="[
        'peer w-full rounded-md border px-3 pt-3 pb-2 text-gray-900 focus:outline-none',
        borderClasses
      ]"
      :required="required"
      v-bind="$attrs"
    />
    <label
      :for="id"
      :class="[
        'absolute left-3 bg-white py-0 transition-all select-none cursor-text',
        (inputValue || isFocused)
          ? 'top-[-10px] text-sm text-green-600'
          : 'top-3 text-gray-500 text-base'
      ]"
    >
      {{ label }}
    </label>

    <!-- Ícone do olho para senha -->
    <button
      v-if="isPasswordField"
      type="button"
      class="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
      @click="togglePasswordVisibility"
      tabindex="-1"
      aria-label="Mostrar/ocultar senha"
    >
      <span v-if="showPassword">
        <Eye />
      </span>
      <span v-else>
        <EyeOffIcon />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import { Eye, EyeOffIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: String,
  label: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, default: 'text' }, // Use 'password' para ativar o olho
  placeholder: { type: Boolean, default: true },
  required: { type: Boolean, default: false },
  borderClasses: { type: String, default: 'border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500' }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue ?? '')
const isFocused = ref(false)
// Controle do olho para senha
const showPassword = ref(false)
const isPasswordField = computed(() => props.type === 'password')
const realInputType = computed(() =>
  isPasswordField.value ? (showPassword.value ? 'text' : 'password') : props.type
)

function onFocus() { isFocused.value = true }
function onBlur() { isFocused.value = false }
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

watch(() => props.modelValue, (newVal) => {
  if (newVal !== inputValue.value) {
    inputValue.value = newVal ?? ''
  }
})
watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
