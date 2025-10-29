<template>
  <GoogleMap
    ref="mapRef"
    api-key="AIzaSyAaA7VPVW9AJT6HyjHmbfn1s1-JWLyISnk"
    map-id="94f9bc657aab89503ae332e8"
    :center="center"
    :zoom="14"
    style="height: 500px; width: 100%"
  >
    <AdvancedMarker v-if="center" :options="{ position: center }">
      <template #content>
        <div style="position: relative;">
          <!-- Card acima do marcador -->
          <div
            style="
              position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-8px);
              background: white; border-radius: 6px; padding: 7px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);
              font-size: 14px; font-weight: bold; color: #333; white-space: nowrap;
            "
          >
            {{ currentLocale?.name }}
          </div>
          <!-- Marcador customizado: círculo branco com borda azul -->
          <div
            style="
              width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
              background: transparent;
            "
          >
            <div
              style="
                width: 24px; height: 24px; background: blue; border-radius: 50%; border: 2px solid #0050c8;
                box-shadow: 0 2px 6px rgba(0,0,0,0.08); display: flex; align-items: center; justify-content: center;
              "
            >
              <div
                style="
                  width: 12px; height: 12px; border-radius: 50%; background: white;
                "
              ></div>
            </div>
          </div>
        </div>
      </template>
    </AdvancedMarker>

    <AdvancedMarker
      v-for="(dest, index) in destinations"
      :key="index"
      :options="{ position: { lat: dest.lat, lng: dest.lng }, title: dest.name }"
      @click="onMarkerClick(dest)"
    />
  </GoogleMap>

  <div
    v-if="selectedDestination"
    class="absolute bottom-5 right-2.5 bg-white p-2.5 rounded-lg max-w-[300px] custom-shadow space-y-2"
  >
    <h3 class="font-semibold">Destino Selecionado: {{ pointName }}</h3>
    <p class="font-light">
      Lat: {{ selectedDestination.lat.toFixed(6) }}, Lng:
      {{ selectedDestination.lng.toFixed(6) }}
    </p>
    <div class="flex justify-center">
      <button
        @click="emit('seeDetails', selectedDestination)"
        class="bg-blue-500 hover:bg-blue-600 p-2 rounded-sm text-white cursor-pointer"
      >
        Ver detalhes
      </button>
      <button
        @click="selectedDestination = null"
        style="margin-left: 10px;"
        class="bg-red-500 hover:bg-red-600 p-2 rounded-sm text-white cursor-pointer"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
import type { ICollectionPoint } from '@/entities/CollectionPoint'

interface Props {
  trace: boolean
  destinations: Array<Pick<ICollectionPoint, 'latitude' | 'longitude' | 'name' | 'id'>>
  traceDestination: Pick<ICollectionPoint, 'latitude' | 'longitude' | 'name'>,
  currentLocale: { latitude: number; longitude: number; name: string },
  closeDestination: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['traced', 'seeDetails'])

const mapRef = ref<any>(null)
const center = ref<{ lat: number; lng: number } | null>(null)
let directionsRenderer: any
let directionsService: any
const selectedDestination = ref<{ lat: number; lng: number; name?: string; id: number } | null>()
const pointName = ref<string>('')


watch(()=> props.closeDestination, ()=> {
  selectedDestination.value = null
})

// Valida e define center apenas se latitude e longitude forem números válidos
if (
  typeof props.currentLocale.latitude === 'number' &&
  !Number.isNaN(props.currentLocale.latitude) &&
  typeof props.currentLocale.longitude === 'number' &&
  !Number.isNaN(props.currentLocale.longitude)
) {
  center.value = {
    lat: props.currentLocale.latitude,
    lng: props.currentLocale.longitude,
  }
} else {
  center.value = null
}

// Processa destinos garantindo lat/lng válidos
const destinations = ref<{ lat: number; lng: number; name: string; id: number }[]>([]);

watch(
  () => props.destinations,
  (newVal) => {
    destinations.value = (newVal || [])
      .map(dest => ({
        lat: Number(dest.latitude),
        lng: Number(dest.longitude),
        name: dest.name,
        id: dest.id
      }))
      .filter(dest => !isNaN(dest.lat) && !isNaN(dest.lng));
  },
  { immediate: true }
);

watch(()=> props.traceDestination, ()=> {
  traceRouteTo({lat: Number(props.traceDestination.latitude), lng: Number(props.traceDestination.longitude) })
})


function traceRouteTo(destination: { lat: number; lng: number }) {
  console.log(destination)
  if (!center.value || !destination || !directionsService || !directionsRenderer) return

  directionsService.route(
    {
      origin: center.value,
      destination,
      travelMode: 'DRIVING',
    },
    (response: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response)
      } else {
        console.error('Erro ao traçar a rota:', status)
      }
    }
  )
}

function onMarkerClick(dest: { lat: number; lng: number; name?: string; id: number }) {
  selectedDestination.value = dest
  pointName.value = dest.name ?? ''
  traceRouteTo(dest)
}

function routeToSelected() {
  if (!center.value) return
  
  const origin = `${center.value.lat},${center.value.lng}`
  const destination = selectedDestination.value ? `${selectedDestination.value.lat},${selectedDestination.value.lng}` : `${props.traceDestination.latitude},${props.traceDestination.longitude}`
  console.log(destination)
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
  window.open(url, '_blank')
}

watch(() => props.currentLocale, () => {
  center.value = {lat: props.currentLocale.latitude, lng: props.currentLocale.longitude}
})


watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (ready) {
      const api = mapRef.value.api
      const map = mapRef.value.map
      directionsService = new api.DirectionsService()
      directionsRenderer = new api.DirectionsRenderer()
      directionsRenderer.setMap(map)
    }
  }
)

watch(
  () => props.trace,
  (newValue) => {
    if (newValue) {
      routeToSelected()
      emit('traced')
    }
  }
)
</script>
