<template>
    <ModalScrollBody v-model:open="open" :title="items?.name ?? ''">
        <template #body>

            <div class="flex flex-col gap-y-4">
                <div>
                    <hr>
                    <span class="text-gray-700 text-xl font-medium">Endereço</span>
                </div>
                <ul class="px-2 space-y-1 list-none">
                    <li class="flex justify-between text-gray-700">
                        <span>Rua:</span>
                        <span>{{ items?.address?.street }}</span>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Número:</span>
                        <span>{{ items?.address?.number }}</span>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Bairro:</span>
                        <span>{{ items?.address?.neighborhood }}</span>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Cidade:</span>
                        <span>{{ items?.address?.city }}</span>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Estado:</span>
                        <span>{{ items?.address?.state }}</span>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>CEP:</span>
                        <span>{{ formatCEP(items?.address?.zipcode) }}</span>
                    </li>
                </ul>

                <div>
                    <hr>
                    <span class="text-gray-700 text-xl font-medium">Horários de Funcionamento</span>
                </div>
                <ul class="px-2 space-y-1 list-none">
                    <li v-for="day in weekSchedule" :key="day.name" class="flex justify-between text-gray-700">
                        <span>{{ day.name }}</span>
                        <span>{{ day.period }}</span>
                    </li>
                </ul>
                <div>
                    <hr>
                    <span class="text-gray-700 text-xl font-medium">Caçambas</span>
                </div>
                <div class="space-y-9 px-2">
                    <MapStatus />
                    <div class="flex flex-wrap gap-2">
                        <span v-for="bucket in items?.buckets" :key="bucket.id"
                            :class="['px-2 rounded-2xl text-white', statusClass(bucket.status)]">
                            {{ bucket.type }}
                        </span>
                    </div>
                </div>

                <hr>
                <div class="flex justify-end">
                    <button class="bg-blue-400 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-600 duration-300"
                        @click="$emit('trace', { latitude: items?.latitude, longitude: items?.longitude })">Iniciar Percurso</button>
                </div>
            </div>


        </template>
    </ModalScrollBody>
</template>

<script setup lang="ts">
import ModalScrollBody from './ModalScrollBody.vue';
import MapStatus from './MapStatus.vue';
import { computed } from 'vue'
import type { ICollectionPoint } from '@/entities/CollectionPoint';

interface Props {
    items?: ICollectionPoint
}

const open = defineModel<boolean>('open')

const props = defineProps<Props>()
defineEmits<{
    'update:isModalOpen': [value: boolean]
    'trace': any
}>()

const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

const weekSchedule = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
        const found = props.items?.days.find(d => Number(d.day_of_week) === i)
        return {
            name: daysOfWeek[i],
            period: found ? `${found.opening_hour.slice(0, 5)} - ${found.closing_hour.slice(0, 5)}` : 'Fechado'
        }
    })
)

function statusClass(status: string): string {
    const statusMap: Record<string, string> = {
        "vazia": "status-disponivel",
        "parcial": "status-parcial",
        "lotada": "status-indisponivel",
    }
    return statusMap[status.toLocaleLowerCase()] || ""
}

function formatCEP(cep: string | undefined): string {
    if (!cep) return ''
    const numbers = cep.replace(/\D/g, '')
    return numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

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