<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <MetricCard
        title="Общий доход"
        :value="dashboardStore.totalRevenue"
        icon="mdi-currency-rub"
        color="indigo"
        :progress="revenueProgress"
        format="currency"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <MetricCard
        title="Количество заказов"
        :value="dashboardStore.ordersCount"
        icon="mdi-cart"
        color="purple"
        :progress="ordersProgress"
        format="number"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <MetricCard
        title="Средний чек"
        :value="dashboardStore.averageCheck"
        icon="mdi-calculator"
        color="cyan"
        :progress="averageCheckProgress"
        format="currency"
      />
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <MetricCard
        title="Уникальные пользователи"
        :value="dashboardStore.uniqueUsers"
        icon="mdi-account-group"
        color="green"
        :progress="usersProgress"
        format="number"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboard'

const dashboardStore = useDashboardStore()

const revenueProgress = computed(() => {
  const max = 100000
  return Math.min((dashboardStore.totalRevenue / max) * 100, 100)
})

const ordersProgress = computed(() => {
  const max = 50
  return Math.min((dashboardStore.ordersCount / max) * 100, 100)
})

const averageCheckProgress = computed(() => {
  const max = 3000
  return Math.min((dashboardStore.averageCheck / max) * 100, 100)
})

const usersProgress = computed(() => {
  const max = 30
  return Math.min((dashboardStore.uniqueUsers / max) * 100, 100)
})
</script>
