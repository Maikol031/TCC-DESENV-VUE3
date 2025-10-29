<template>
    <div class="m-6">
        <span class="text-gray-600 font-medium">Encontre pontos de coleta de reciclagem disponiveis perto de você</span>
    </div>
    <div class="flex flex-col items-center gap-y-3 mb-10">

        <DynamicCarousel @item="openModalFunc($event); closeDestination = !closeDestination" :items="items" />
    </div>
    <div class="flex justify-start md:m-14">
        <Maps :trace="traceRout" 
            :destinations="items"
            :closeDestination="closeDestination"
            :trace-destination="traceTest"
            :current-locale="{ latitude: latitude, longitude: longitude, name: 'Você está aqui' }"
            @traced="resetTrace"
            @see-details="($event)=> openModalFunc(items.find((values) => values.id === $event.id))" 
        />

    </div>

    <ModalCardHome v-model:open="isModalOpen" :items="selectedCard" @trace="trace($event)" />
</template>
<script setup lang="ts">
import CollectionPoint, { type ICollectionPoint } from "@/entities/CollectionPoint";
import DynamicCarousel from '@/components/DynamicCarousel.vue';
import ModalCardHome from '@/components/ModalCardHome.vue';
import Maps from '@/components/Maps.vue';
import { onMounted, ref } from 'vue';

const collectionPointInstance = ref<CollectionPoint>(new CollectionPoint())
const items = ref<ICollectionPoint[]>([])
const closeDestination = ref<boolean>(false)


const latitude = ref<number>(0)
const longitude = ref<number>(0)

const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalização não é suportada pelo navegador.'))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                }
                latitude.value = coords.latitude
                longitude.value = coords.longitude
                resolve(coords)
            },
            (err) => {
                reject(new Error(`Erro ao obter localização: ${err.message}`))
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    })
}


const getCollectionPoints = async () => {
    const { latitude, longitude } = await getCurrentLocation()

    const { data } = await collectionPointInstance.value.get({ latitude, longitude })
    items.value = data.data
}


const selectedCard = ref<ICollectionPoint>();
const isModalOpen = ref<boolean>(false)

const openModalFunc = (card: any) => {
    selectedCard.value = card;
    isModalOpen.value = true
};

const traceRout = ref(false)

const traceTest = ref()

const trace = (values: any) => {
    traceTest.value = values
    traceRout.value = true
    isModalOpen.value = !isModalOpen.value
}

const resetTrace = () => {
    traceRout.value = false
}


onMounted(async () => {
    await getCollectionPoints()
})


</script>