<template>
        <ModalScrollBody title="Gestores" v-model:open="open" :enable-footer="true">
            <template #body>
                <hr class="mb-4">
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div v-for="user in users" :key="user.id"
                        class="w-full bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
                        <div class="flex items-center gap-3">
                            <div
                                class="bg-green-200 rounded-full w-10 h-10 flex items-center justify-center text-green-700 font-bold text-lg uppercase">
                                <User class="size-5 text-black"/>
                            </div>
                            <div>
                                <div class="text-lg font-semibold text-gray-900 truncate">{{ user.name }}</div>
                                <div class="text-xs text-gray-500 truncate">{{ user.email }}</div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-1 mt-2">
                            <div class="flex items-center text-sm text-gray-700"><span
                                    class="min-w-[70px]">Telefone:</span> <span class="ml-2 font-medium">{{ user.phone
                                    }}</span></div>
                            <div class="flex items-center text-sm text-gray-700"><span
                                    class="min-w-[70px]">Documento:</span> <span class="ml-2 font-medium">{{
                                    user.document }}</span></div>
                        </div>

                        <div class="flex justify-end gap-2 mt-3">
                            <button v-if="userRole === 'admin' || userRole === 'organization'"
                                @click="openModalDelete(user.id)"
                                class="text-black hover:underline text-xs font-semibold cursor-pointer"><Trash2 class="size-5"/></button>
                        </div>
                    </div>
                    <div v-if="!users || users.length === 0" class="col-span-full text-center text-gray-500 py-6">
                        Nenhum gestor encontrado.
                    </div>
                </div>

            </template>
            <template #actions>
                <button v-if="userRole === 'organization'" @click="isOpenModalAdd = !isOpenModalAdd"
                    class="flex gap-x-3 items-center bg-green-600 text-white p-2 mr-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300">
                    <UserRoundPlus class="text-white w-5 h-5" />
                    Adicionar Gestores
                </button>
            </template>

        </ModalScrollBody>
    <ModalConfirmeDelete 
    :is-open="isModalOpenModalDelete"
    @update:is-open="isModalOpenModalDelete = $event"
    @confirm="handleConfirmDelete()"
  />
  <ModalAddColaborador
    :is-open="isOpenModalAdd" 
    :users-check="users"
    :point-id="pointId || 0"
    @update:is-open="isOpenModalAdd = $event" 
    @create="getList()"
  />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import ModalScrollBody from './ModalScrollBody.vue';
import Colaborator from '@/entities/Colaborator';
import { Trash2, UserRoundPlus, User } from 'lucide-vue-next';
import ModalConfirmeDelete from './ModalConfirmeDelete.vue';
import ModalAddColaborador from './ModalAddColaborador.vue';
import { useAlert } from '@/composables/useAlert';

const { showAlert } = useAlert();


defineEmits(["view", "edit", "delete"])
const open = defineModel<boolean>('open')
const colaboratorInstance = ref<Colaborator>(new Colaborator(showAlert))
const isModalOpenModalDelete = ref<boolean>(false)
const users = ref<any>([])
const selectedId = ref<number>()
const isOpenModalAdd = ref<boolean>(false)

interface Props {
    userRole?: "admin" | "manager" | "organization"
    pointId: number | undefined
}

const props = defineProps<Props>()

const getList = async () => {
    const { data } = await colaboratorInstance.value.getList(props.pointId ?? 0)
    users.value = data
}

const openModalDelete = (id: number) => {
  selectedId.value = id;
  isModalOpenModalDelete.value = true;
}

const handleConfirmDelete = async () => {
  if (selectedId.value) await colaboratorInstance.value.delete(props.pointId || 0, selectedId.value);
  isModalOpenModalDelete.value = false;
  await getList();
}

watch(open, async (isOpen) => {
    if (isOpen) {
        await getList()
    }
})


</script>
