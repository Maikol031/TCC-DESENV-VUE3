<template>
  <div class="pt-2 bg-white p-4 rounded-md">
    <h3 class="text-green-700 font-semibold">Horários de Funcionamento</h3>
    <p class="text-sm text-green-700 mb-2">
      Adicione os dias e horários em que o ponto está aberto.
    </p>

    <div class="space-y-2">
      <div
        v-for="(s, idx) in schedules"
        :key="s.id"
        class="flex flex-col space-y-3"
      >
        <div>
          <div class="text-sm text-green-700 mb-2">Dias</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="d in daysOfWeek"
              :key="d"
              type="button"
              :disabled="isDayDisabled(d, s.id)"
              @click="toggleDay(s.id, d)"
              :class="[
                'py-1 px-3 rounded-full text-sm',
                isDayDisabled(d, s.id)
                  ? 'opacity-40 cursor-not-allowed bg-green-700'
                  : isActiveDay(d, s.days)
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-green-700 text-green-700'
              ]"
            >
              {{ d.slice(0, 3) }}
            </button>
          </div>
          <p v-if="errors[`schedule_days_${idx}`]" class="text-sm text-red-400 mt-1">
            {{ errors[`schedule_days_${idx}`] }}
          </p>
        </div>

        <div class="flex gap-2">
          <input
            type="time"
            class="bg-white border border-green-700 rounded-xl py-2 px-3 text-green-700 w-full"
            :value="s.open"
            @input="e => updateSchedule(s.id, 'open', e.target.value)"
          />
          <span class="text-green-700 self-center">a</span>
          <input
            type="time"
            class="bg-white border border-green-700 rounded-xl py-2 px-3 text-green-700 w-full"
            :value="s.close"
            @input="e => updateSchedule(s.id, 'close', e.target.value)"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="text-sm text-red-600 hover:text-red-800"
            @click="removeSchedule(s.id)"
          >
            Remover
          </button>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button
          type="button"
          @click="addSchedule"
          class="bg-green-700 text-white font-semibold py-2 px-4 rounded hover:bg-green-800"
        >
          Adicionar Horário
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const daysOfWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

const schedules = reactive([
  {
    id: 1,
    days: ['Segunda-feira', 'Terça-feira'],
    open: '08:00',
    close: '18:00'
  },
  {
    id: 2,
    days: ['Quarta-feira'],
    open: '09:00',
    close: '17:00'
  }
])

const errors = reactive<Record<string, string>>({})

let nextId = ref(3)

function isDayDisabled(day: string, scheduleId: number) {
  const usedByOther = schedules.some(
    s => s.id !== scheduleId && s.days.includes(day)
  )
  return usedByOther
}

function isActiveDay(day: string, scheduleDays: string[]) {
  return scheduleDays.includes(day)
}

function toggleDay(scheduleId: number, day: string) {
  const schedule = schedules.find(s => s.id === scheduleId)
  if (!schedule) return
  const usedByOther = schedules.some(
    s => s.id !== scheduleId && s.days.includes(day)
  )
  if (usedByOther) return

  const dayIndex = schedule.days.indexOf(day)
  if (dayIndex >= 0) {
    schedule.days.splice(dayIndex, 1)
  } else {
    schedule.days.push(day)
  }
}

function updateSchedule(scheduleId: number, field: 'open' | 'close', value: string) {
  const schedule = schedules.find(s => s.id === scheduleId)
  if (schedule) {
    schedule[field] = value
  }
}

function removeSchedule(scheduleId: number) {
  const index = schedules.findIndex(s => s.id === scheduleId)
  if (index !== -1) {
    schedules.splice(index, 1)
  }
}

function addSchedule() {
  schedules.push({
    id: nextId.value++,
    days: [],
    open: '08:00',
    close: '18:00'
  })
}
</script>
