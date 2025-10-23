<template>
    <ModalScrollBody :title="items?.name ?? ''" :open="isModalOpen" @update:open="$emit('update:isModalOpen', $event)" :enable-footer="true" :enable-input-name="method === 'add'">
        <template #body>
            <div class="flex flex-col gap-y-4">
                <hr>
                <div>
                    <div class="flex gap-x-4 items-center justify-between">
                        <span class="text-gray-700 text-xl font-medium">Endereço</span>
                    </div>
                </div>
                <ul class="px-2 space-y-1 list-none">
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Rua:</span>
                        <input v-model="collectionPointInstance.address.street"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Número:</span>
                        <input v-model="collectionPointInstance.address.number"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-24 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Bairro:</span>
                        <input v-model="collectionPointInstance.address.neighborhood"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-40 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Cidade:</span>
                        <input v-model="collectionPointInstance.address.city"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-44 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Estado:</span>
                        <input v-model="collectionPointInstance.address.state"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-24 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>CEP:</span>
                        <input v-model="collectionPointInstance.address.zipcode"
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-32 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing" />
                    </li>
                </ul>
                <hr>
                <div class="flex gap-x-4 items-center justify-between">
                    <span class="text-gray-700 text-xl font-medium">Horários de Funcionamento</span>
                </div>
                <ul class="mb-4">
                    <li v-for="(item, idx) in collectionPointInstance.days" :key="item.day_of_week"
                        class="flex items-center gap-3 mb-2">
                        <span class="w-32">{{ daysOfWeek[item.day_of_week] }}</span>
                        <span class="w-32 text-end">{{ item.opening_hour.slice(0, 5) }} - {{ item.closing_hour.slice(0,
                            5) }}</span>
                        <button v-if="isEditing" class="ml-2 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700"
                            @click="removeDay(idx)">
                            Remover
                        </button>
                    </li>
                </ul>
                <form v-if="isEditing" @submit.prevent="addDay" class="flex flex-col gap-2">
                    <div class="flex flex-wrap items-center gap-2">
                        <select v-model="newDay.day_of_week" class="border rounded px-2 py-1 flex-1">
                            <option disabled value="">Selecione um dia</option>
                            <option v-for="(label, index) in daysOfWeek" :key="index" :value="index"
                                :disabled="collectionPointInstance.days.some(i => i.day_of_week === String(index))">
                                {{ label }}
                            </option>
                        </select>
                        <input v-model="newDay.opening_hour" type="time" class="border rounded px-2 py-1" required>
                        <span>-</span>
                        <input v-model="newDay.closing_hour" type="time" class="border rounded px-2 py-1" required>
                        <button type="submit"
                            class="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600 disabled:bg-gray-300"
                            :disabled="!newDay.day_of_week">
                            Adicionar
                        </button>
                    </div>
                </form>


                <hr>
                <div class="flex flex-col gap-x-4">
                    <div class="flex gap-x-4 items-center justify-between mb-2">
                        <span class="text-gray-700 text-xl font-medium">Caçambas</span>
                    </div>
                    <div class="flex flex-wrap mb-2 gap-2">
                        <template v-for="(bucket, idx) in collectionPointInstance.buckets" :key="bucket.type">
                            <span :class="[
                                'px-2 py-1 rounded-2xl text-white font-medium',
                                statusClass(bucket.status)
                            ]">
                                {{ bucket.type }}
                            </span>
                            <button class="ml-2 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700"
                                @click="removeBucket(idx)" v-if="isEditing">Remover</button>
                            <span>|</span>
                        </template>
                    </div>
                    <form v-if="isEditing" @submit.prevent="addBucket" class="flex flex-wrap gap-2 items-center mt-2">
                        <select v-model="newBucket.type" class="border rounded px-2 py-1 min-w-[120px]">
                            <option disabled value="">Selecione o tipo</option>
                            <option v-for="type in bucketTypes" :key="type" :value="type"
                                :disabled="collectionPointInstance.buckets.some(b => b.type === type)">{{ type }}
                            </option>
                        </select>

                        <select v-model="newBucket.status" class="border rounded px-2 py-1 min-w-[100px]">
                            <option disabled value="">Status</option>
                            <option value="vazia">Vazia</option>
                            <option value="parcial">Parcial</option>
                            <option value="lotada">Lotada</option>
                        </select>

                        <button type="submit"
                            class="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600 disabled:bg-gray-300"
                            :disabled="!newBucket.type || !newBucket.status">Adicionar</button>
                    </form>
                    <div class="flex gap-7 mt-2">
                        <span class="flex gap-2 items-center text-green-600">
                            <Circle size="12" />Vazia
                        </span>
                        <span class="flex gap-2 items-center text-yellow-500">
                            <Circle size="12" />Parcial
                        </span>
                        <span class="flex gap-2 items-center text-red-500">
                            <Circle size="12" />Lotada
                        </span>
                    </div>
                </div>
            </div>
            
        </template>
        <template #actions>

            <div class="flex justify-end w-full">
                <button
                v-if="isEditing === false"
                class="flex gap-x-3 items-center bg-blue-600 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-700 duration-300"
                    @click="isEditing = !isEditing"> 
                        <Edit class="text-white w-5 h-5"
                            v-if="method === 'edit'" 
                        />
                        Editar
                </button>
                <button 
                v-if="isEditing === true"
                class="flex gap-x-3 items-center bg-green-600 text-white p-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300"
                    @click="isEditing = !isEditing"> 
                        <Save class="text-white w-5 h-5"                             
                        />
                        Salvar
                </button>
            </div>

        </template>
    </ModalScrollBody>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ModalScrollBody from './ModalScrollBody.vue';
import CollectionPoint, { type ICollectionPoint } from '@/entities/CollectionPoint';
import { Edit, Save } from 'lucide-vue-next';

interface Props {
    isModalOpen: boolean
    items?: ICollectionPoint
    method: "add" | "edit"
}

const props = defineProps<Props>()
defineEmits<{
    'update:isModalOpen': [value: boolean]
    'trace': any
}>()

const collectionPointInstance = ref<CollectionPoint>(new CollectionPoint())

const isEditing = ref(false)

// function toggleEdit() {
//     isEditing.value = !isEditing.value
// }

const daysOfWeek = ref<Record<string, string>>({
    "0": 'Domingo',
    "1": 'Segunda-feira',
    "2": 'Terça-feira',
    "3": 'Quarta-feira',
    "4": 'Quinta-feira',
    "5": 'Sexta-feira',
    "6": 'Sábado',

})

// function statusClass(status: string): string {
//     const statusMap: Record<string, string> = {
//         "vazia": "status-disponivel",
//         "parcial": "status-parcial",
//         "lotada": "status-indisponivel",
//     }
//     return statusMap[status.toLocaleLowerCase()] || ""
// }

const newDay = ref<{ day_of_week: string | "", opening_hour: string, closing_hour: string }>({
    day_of_week: "",
    opening_hour: "",
    closing_hour: "",
})

function addDay() {
    if (
        newDay.value.day_of_week !== "" &&
        !collectionPointInstance.value.days.some(item => item.day_of_week === String(newDay.value.day_of_week))
    ) {
        collectionPointInstance.value.days.push({
            day_of_week: String(newDay.value.day_of_week),
            opening_hour: String(newDay.value.opening_hour),
            closing_hour: String(newDay.value.closing_hour),
        })
        newDay.value = { day_of_week: "", opening_hour: "", closing_hour: "" }
    }
}


function removeDay(idx: number) {
    collectionPointInstance.value.days.splice(idx, 1)
}

// function formatCEP(cep: string | undefined): string {
//     if (!cep) return ''
//     const numbers = cep.replace(/\D/g, '')
//     return numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2')
// }


const bucketTypes = [
    'plástico',
    'papel',
    'vidro',
    'metal',
]

const newBucket = ref({
    type: '',
    status: '',
})

function addBucket() {
    if (
        newBucket.value.type &&
        newBucket.value.status &&
        !collectionPointInstance.value.buckets.some(b => b.type === newBucket.value.type)
    ) {
        collectionPointInstance.value.buckets.push({
            id: 0, // ou null, backend vai criar
            point_id: collectionPointInstance.value.id || 0,
            type: newBucket.value.type,
            status: newBucket.value.status,
            created_at: '',
            updated_at: '',
        })
        newBucket.value = { type: '', status: '' }
    }
}

function removeBucket(idx: number) {
    collectionPointInstance.value.buckets.splice(idx, 1)
}

function statusClass(status: string): string {
    const statusMap: Record<string, string> = {
        'vazia': 'bg-green-600',
        'parcial': 'bg-yellow-400',
        'lotada': 'bg-red-500',
    }
    return statusMap[status] || 'bg-gray-400'
}

watch(() => props.isModalOpen, () => {
    if (props.method === "edit") {
        Object.assign(collectionPointInstance.value, props.items)
        return
    }

    collectionPointInstance.value = new CollectionPoint()
    isEditing.value = true
}, { immediate: true, deep: true })

</script>

<style>
.status-disponivel {
    background: #39C46E;
}

.status-indisponivel {
    background: #F74D4D;
}

.status-parcial {
    background: #e0de4d;
}
</style>
