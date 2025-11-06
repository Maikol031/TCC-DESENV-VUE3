<template>
    <Carousel class="relative w-full max-w-6xl md:max-w-xl lg:max-w-2xl xl:max-w-6xl" :opts="{
        align: 'start',
    }">
        <CarouselContent>
            <CarouselItem v-for="item in items" :key="item.id" class="basis-[85%] md:basis-1/2 lg:basis-[40%]">
                <div class="p-1">
                    <Card class="overflow-hidden">
                        <CardContent class="flex flex-col aspect-square gap-y-2 h-23 px-4 mb-2 md:mb-0">
                            <div class="flex justify-between">
                                <div class="flex min-w-0 w-full gap-x-2">
                                    <Trash2 class="w-6 h-6 md:w-8 md:h-8 text-green-600 shrink-0" />
                                    <span class="text-xl md:text-2xl text-gray-900 font-medium truncate min-w-0">{{
                                        item.name }}</span>
                                </div>

                            </div>
                            <div class="flex flex-col gap-2 ml-2 min-w-0">
                                <div class="flex items-center gap-x-2">
                                    <MapPinned class="w-6 h-6 text-gray-500 shrink-0" />
                                    <span class="text-md text-gray-700 font-light truncate min-w-0">{{`${item.address.street}, ${item.address.number} - ${item.address.neighborhood}, ${item.address.city}`}}</span>
                                </div>
                                <div class="flex items-center gap-x-2 mt-1 md:mt-0">
                                    <LandPlot class="w-6 h-6 text-gray-500 shrink-0" />
                                    <span class="text-md text-gray-700 font-light whitespace-normal">{{
                                        `Você se encontra à ${Number(item.distance_km).toFixed(0)}km de distância.`
                                        }}</span>
                                </div>
                            </div>


                        </CardContent>

                        <CardFooter class="p-0">
                            <button @click="$emit('item', item)"
                                class="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-medium py-3 border-t transition cursor-pointer">
                                <InfoIcon class="w-4 h-4 text-white" />
                                Ver Detalhes
                            </button>
                        </CardFooter>


                    </Card>
                </div>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden md:flex" />
        <CarouselNext class="hidden md:flex" />
    </Carousel>
</template>
<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Trash2, MapPinned, InfoIcon, LandPlot } from "lucide-vue-next";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ICollectionPoint } from "@/entities/CollectionPoint";


interface Props {
    items: ICollectionPoint[]
}

defineProps<Props>()


</script>
