<template>
    <ModalScrollBody v-model:open="open" v-model:name="modalName" :title="items?.name ?? ''" :enable-footer="true"
        :enable-input-name="method === 'add'">
        <template #body>
            <form id="mainForm" ref="mainForm" @submit.prevent="submitForm(method)" class="flex flex-col gap-y-4">
                <hr>
                <div>
                    <div class="flex gap-x-4 items-center justify-between">
                        <span class="text-gray-700 text-xl font-medium">Contato</span>
                    </div>
                    <ul class="px-2 space-y-1 list-none">
                        <li class="flex justify-between items-center text-gray-700">
                            <span>Telefone:</span>
                            <input v-model="collectionPointInstance.phone" required
                                class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                                :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                        </li>
                    </ul>
                </div>

                <hr>
                <div>
                    <div class="flex gap-x-4 items-center justify-between">
                        <span class="text-gray-700 text-xl font-medium">Endereço</span>
                    </div>
                </div>
                <ul class="px-2 space-y-1 list-none">
                    <li class="flex justify-between items-center text-gray-700">
                        <span>CEP:</span>
                        <input v-model="collectionPointInstance.address.zipcode" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Rua:</span>
                        <input v-model="collectionPointInstance.address.street" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Número:</span>
                        <input v-model="collectionPointInstance.address.number" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Bairro:</span>
                        <input v-model="collectionPointInstance.address.neighborhood" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Cidade:</span>
                        <input v-model="collectionPointInstance.address.city" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
                    </li>
                    <li class="flex justify-between items-center text-gray-700">
                        <span>Estado:</span>
                        <input v-model="collectionPointInstance.address.state" required
                            class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 w-48 disabled:bg-gray-100 enabled:bg-white"
                            :disabled="!isEditing || userRole !== 'admin' && userRole !== 'organization'" />
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
                            @click="removeDay(idx, item)">
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
                                @click="removeBucket(idx, bucket)" v-if="isEditing">Remover</button>
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
            </form>

        </template>
        <template #actions>

            <div class="flex justify-end w-full">
                <button v-if="userRole === 'organization'" @click="isModalGestoresOpen = !isModalGestoresOpen; open = !open" form="mainForm"
                    class="flex gap-x-3 items-center bg-gray-300 text-black p-2 mr-2 rounded-sm cursor-pointer hover:bg-gray-400 duration-300">
                    <Users class="text-black w-5 h-5" />
                    Gestores
                </button>
                <button v-if="isEditing === false && method === 'edit'"
                    class="flex gap-x-3 items-center bg-blue-600 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-700 duration-300"
                    @click="isEditing = !isEditing">
                    <Edit class="text-white w-5 h-5" />
                    Editar
                </button>
                <button v-if="isEditing === true || method === 'add'" type="submit" form="mainForm"
                    class="flex gap-x-3 items-center bg-green-600 text-white p-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300">
                    <Save class="text-white w-5 h-5" />
                    Salvar
                </button>

            </div>

        </template>
    </ModalScrollBody>
    <ModalCardColaboradores 
        v-model:open="isModalGestoresOpen"
        @close="isModalGestoresOpen = !isModalGestoresOpen"
        :user-role="userRole"
        :point-id="items?.id"
        />
</template>

<script setup lang="ts">
import CollectionPoint, { type ICollectionPoint, type PointOpeningHour } from '@/entities/CollectionPoint';
import ModalScrollBody from './ModalScrollBody.vue';
import { Edit, Save, Users } from 'lucide-vue-next';
import { ref, watch } from 'vue'
import Buckets, { type Bucket } from '@/entities/Buckets';
import ModalCardColaboradores from './ModalCardColaboradores.vue';

interface Props {
    items?: ICollectionPoint
    userRole?: "admin" | "manager" | "organization"
    method: "add" | "edit"
}

const open = defineModel<boolean>('open')
const modalName = ref('')
const mainForm = ref(null)
const props = defineProps<Props>()
const emit = defineEmits(["close"])
const isModalGestoresOpen = ref<boolean>(false)


const collectionPointInstance = ref<CollectionPoint>(new CollectionPoint())
const bucketsInstance = ref<Buckets>(new Buckets())

const isEditing = ref(false)


watch(() => collectionPointInstance.value.address.zipcode, async (cep) => {
    const cleanCep = cep ? cep.replace(/\D/g, '') : ""
    if (cleanCep.length === 8) {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()

        if (!data.erro) {
            collectionPointInstance.value.address.street = data.logradouro || ''
            collectionPointInstance.value.address.neighborhood = data.bairro || ''
            collectionPointInstance.value.address.city = data.localidade || ''
            collectionPointInstance.value.address.state = data.uf || ''
        }

        // Busca latitude/longitude (Nominatim)
        const geoResp = await fetch(
            `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(data.logradouro)}&city=${encodeURIComponent(data.localidade)}&state=${encodeURIComponent(data.uf)}&country=Brasil&postalcode=${cleanCep}&format=json`
        )
        const geoData = await geoResp.json()
        if (geoData.length) {
            collectionPointInstance.value.latitude = geoData[0].lat
            collectionPointInstance.value.longitude = geoData[0].lon
        }
    }
})


const daysOfWeek = ref<Record<string, string>>({
    "0": 'Domingo',
    "1": 'Segunda-feira',
    "2": 'Terça-feira',
    "3": 'Quarta-feira',
    "4": 'Quinta-feira',
    "5": 'Sexta-feira',
    "6": 'Sábado',
})

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

function removeDay(idx: number, item: any) {
    collectionPointInstance.value.days.splice(idx, 1)
}

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
            type: newBucket.value.type,
            status: newBucket.value.status,
        })
        newBucket.value = { type: '', status: '' }
    }
}

const deleteBuckets = ref<Bucket[]>([])
function removeBucket(idx: number, item: any) {
    if (item.id) deleteBuckets.value.push(item.id)

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


function formatDaysHours(days: PointOpeningHour[] = []): PointOpeningHour[] {
    const formatHour = (hour?: string): string =>
        typeof hour === 'string'
            ? hour.length > 5
                ? hour.slice(0, 5)
                : hour
            : '';

    return days.map(day => ({
        ...day,
        opening_hour: formatHour(day.opening_hour),
        closing_hour: formatHour(day.closing_hour),
    }));
}

const submitForm = async (method: "add" | "edit") => {

    if (method === 'add') {
        const { data } = await collectionPointInstance.value.create({ ...collectionPointInstance.value, name: modalName.value })
        for (let bucket of collectionPointInstance.value.buckets) {
            await bucketsInstance.value.createBuckets(data.id, bucket)
        }
        emit("close", true)
        return
    }
    if (method === 'edit') {
        const { data } = await collectionPointInstance.value.update(
            collectionPointInstance.value.id,
            {
                ...collectionPointInstance.value,
                days: collectionPointInstance.value.days.length
                    ? formatDaysHours(collectionPointInstance.value.days)
                    : collectionPointInstance.value.days
            }
        )
        for (let bucket of collectionPointInstance.value.buckets) {
            if (bucket.id) {
                await bucketsInstance.value.updateBuckets(data.id, bucket.id, bucket)
            } else {
                await bucketsInstance.value.createBuckets(data.id, bucket)
            }
        }

        if (deleteBuckets.value.length) {
            for (let id of deleteBuckets.value) {
                await bucketsInstance.value.deleteBuckets(data.id, Number(id))
                deleteBuckets.value.pop()
            }
        }

        emit("close", true)
        return
    }
}

watch(open, (isOpen) => {
    if (isOpen) {
        if (props.method === 'edit') {
            Object.assign(collectionPointInstance.value, props.items)
            isEditing.value = false
        }
        if (props.method === 'add') {
            collectionPointInstance.value = new CollectionPoint()
            isEditing.value = true
        }
    }
})


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
