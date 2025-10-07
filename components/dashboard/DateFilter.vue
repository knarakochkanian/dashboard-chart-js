<template>
  <v-card elevation="2">
    <v-card-text>
      <div class="d-flex flex-wrap align-center ga-3">
        <div class="flex-grow-1">
          <v-btn-toggle
            v-model="selectedPeriodLocal"
            color="primary"
            variant="outlined"
            divided
            mandatory
          >
            <v-btn value="today" size="small">
              <v-icon start icon="mdi-calendar-today"></v-icon>
              Сегодня
            </v-btn>
            <v-btn value="week" size="small">
              <v-icon start icon="mdi-calendar-week"></v-icon>
              Неделя
            </v-btn>
            <v-btn value="month" size="small">
              <v-icon start icon="mdi-calendar-month"></v-icon>
              Месяц
            </v-btn>
            <v-btn value="custom" size="small">
              <v-icon start icon="mdi-calendar-range"></v-icon>
              Произвольный
            </v-btn>
          </v-btn-toggle>
        </div>

        <!-- Календарь для произвольного диапазона -->
        <div v-if="selectedPeriodLocal === 'custom'" class="d-flex ga-2 flex-wrap">
          <v-text-field
            v-model="startDate"
            type="date"
            label="От"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 180px"
          ></v-text-field>
          <v-text-field
            v-model="endDate"
            type="date"
            label="До"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 180px"
          ></v-text-field>
          <v-btn
            color="primary"
            variant="flat"
            @click="applyCustomRange"
            :disabled="!startDate || !endDate"
          >
            Применить
          </v-btn>
        </div>

        <!-- Информация о выбранном периоде -->
        <v-chip
          v-if="periodInfo"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-information"
        >
          {{ periodInfo }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { DatePeriod } from '../../types/dashboard'
import { useDashboardStore } from '../../stores/dashboard'
import { useDateFormatter } from '../../composables/useDateFormatter'

const dashboardStore = useDashboardStore()
const { formatFullDate } = useDateFormatter()

const selectedPeriodLocal = ref<DatePeriod>(dashboardStore.selectedPeriod)
const startDate = ref<string>('2024-06-01')
const endDate = ref<string>('2024-06-15')

watch(selectedPeriodLocal, (newPeriod) => {
  if (newPeriod !== 'custom') {
    dashboardStore.setPeriod(newPeriod)
    startDate.value = ''
    endDate.value = ''
  } else {
    if (startDate.value && endDate.value) {
      applyCustomRange()
    }
  }
})

const applyCustomRange = () => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    
    if (start > end) {
      alert('Дата начала не может быть больше даты окончания')
      return
    }
    
    dashboardStore.setCustomDateRange(start, end)
  }
}

const periodInfo = computed(() => {
  if (dashboardStore.selectedPeriod === 'custom' && dashboardStore.customDateRange) {
    return `${formatFullDate(dashboardStore.customDateRange.start)} - ${formatFullDate(dashboardStore.customDateRange.end)}`
  }
  
  const periodNames: Record<DatePeriod, string> = {
    today: 'За сегодня',
    week: 'За последние 7 дней',
    month: 'За последний месяц',
    custom: '',
  }
  
  return periodNames[dashboardStore.selectedPeriod]
})
</script>
