<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-6">
        <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg mx-auto">
            <button @click="goHome"
                class="w-10 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-all border border-gray-300 cursor-pointer">
                <Undo2 class="w-5 h-5" />
            </button>
            <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                Login<br />
                <span class="text-green-600">EcoPonto</span>
            </h1>


            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                        E-mail
                    </label>
                    <input v-model="authInstance.email" id="email" type="email" placeholder="seuemail@exemplo.com"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required />
                </div>

                <div class="mb-6 relative">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="password">
                        Senha
                    </label>
                    <input v-model="authInstance.password" :type="showPassword ? 'text' : 'password'" id="password"
                        placeholder="••••••••"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                        required />
                    <button type="button" @click="showPassword = !showPassword"
                        class="absolute right-3 top-[34px] text-gray-600 hover:text-gray-900 focus:outline-none"
                        aria-label="Alternar visibilidade da senha">
                        <span v-if="showPassword">
                            <Eye />
                        </span>
                        <span v-else>
                            <EyeOffIcon />
                        </span>
                    </button>
                </div>

                <button type="submit"
                    class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all cursor-pointer">
                    Entrar
                </button>
            </form>

            <p class="text-center text-sm text-gray-500 mt-4">
                Acesso restrito a administradores
            </p>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOffIcon, Home, Undo2 } from 'lucide-vue-next';
import Auth, { type IAuth } from '@/entities/Auth';
import { useAlert } from '@/composables/useAlert'
import { router } from '@/routes';

const { showAlert } = useAlert()
const showPassword = ref(false)
const authInstance = ref<Auth>(new Auth(showAlert, router))

const login = async () => {
    await authInstance.value.login(authInstance.value)
}

const goHome = () => {
    router.push({ name: 'home' })
}

</script>
