<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-6">

        <div class="w-full max-w-sm rounded-2xl bg-white px-6 py-3 shadow-lg mx-auto space-y-6">

            <header class="w-full text-center flex flex-col items-center">
                <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                    Registrar-se<br />
                    <span class="text-green-600">EcoPonto</span>
                </h1>
                <div v-if="code" class="bg-slate-100 w-30 p-4 rounded-md">
                    <span class="font-bold text-xl text-gray-700">{{ code }}</span>
                </div>
            </header>

            <section>
                <form action="/action_page.php" method="post" id="mainForm" ref="mainForm" @submit.prevent="submitForm()" 
                    class="w-full max-w-sm bg-white pt-2 mx-auto space-y-6 max-h-[55vh] pb-3 md:max-h-[60vh] overflow-y-auto  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">


                    <div class="space-y-4">
                        <InputField v-model="userInstance.name" label="Nome" id="nome" required />
                        <InputField v-model="userInstance.email" label="E-mail" id="email" required  />
                        <InputField v-model="userInstance.document" label="CPF/CNPJ" id="documento" required  />
                        <InputField v-model="userInstance.phone" label="Telefone" id="telefone"  required />
                    </div>

                    <div class="flex items-baseline">
                        <h2 class="text-xl font-semibold text-gray-500 whitespace-nowrap">Endereço</h2>
                        <hr class="flex-grow border-gray-300">
                    </div>

                    <div class="space-y-4">
                        <InputField v-model="userInstance.address.zipcode" label="CEP" id="cep" required />
                        <InputField v-model="userInstance.address.state" label="Estado" id="estado" required />
                        <InputField v-model="userInstance.address.city" label="Cidade" id="cidade" required />
                        <InputField v-model="userInstance.address.neighborhood" label="Bairro" id="bairro" required />
                        <InputField v-model="userInstance.address.street" label="Rua" id="rua" required  />
                        <InputField v-model="userInstance.address.number" label="Número" id="numero" required  />
                        <InputField v-model="userInstance.password" label="Senha" id="password" type="password" required  />
                    </div>



                </form>

            </section>

            <div class="h-10 flex items-center justify-end">
                <button
                    type="submit"
                    form="mainForm"
                    class="bg-green-600 hover:bg-green-700 transition text-white p-2 rounded-sm w-full cursor-pointer">
                    Registrar
                </button>
            </div>



        </div>

    </div>
</template>
<script setup lang="ts">
import InputField from '@/components/InputField.vue';
import { useRoute } from 'vue-router';
import User from '../entities/User';
import { router } from '@/routes';
import { ref, watch } from 'vue';

const route = useRoute();
const code = route.query.code as string;
const userInstance = ref<User>(new User());
const mainForm = ref(null);



async function buscarEnderecoPorCep(valorCep: string) {
  const cepSemFormatacao = valorCep.replace(/\D/g, '');
  if (cepSemFormatacao.length !== 8) {
    return
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepSemFormatacao}/json/`);
    const data = await response.json();
    if (!data.erro) {
      userInstance.value.address.state = data.uf ?? '';
      userInstance.value.address.city = data.localidade ?? '';
      userInstance.value.address.neighborhood = data.bairro ?? '';
      userInstance.value.address.street = data.logradouro ?? '';
    }
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
  }
}


watch(()=> userInstance.value?.address?.zipcode, (novoCep: string) => {
  if (novoCep.length >= 8) {
    buscarEnderecoPorCep(novoCep)
  } else {
    userInstance.value.address.state = '';
    userInstance.value.address.city = '';
    userInstance.value.address.neighborhood = '';
    userInstance.value.address.street = '';
  }
});

const submitForm = async () => {
    await userInstance.value.create({...userInstance.value, access_code: code })
    router.push({ name: 'login' })
}



</script>