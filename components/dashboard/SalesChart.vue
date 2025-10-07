<template>
  <v-card elevation="2">
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon icon="mdi-chart-line" class="mr-2"></v-icon>
        Динамика продаж по категориям
      </div>
      <v-chip
        v-if="totalSales > 0"
        color="primary"
        variant="tonal"
        size="small"
      >
        {{ totalSales }} продаж
      </v-chip>
    </v-card-title>
    
    <v-card-text>
      <div class="chart-container">
        <Line v-if="chartDataReady" :data="chartData" :options="chartOptions" />
        <div v-else class="d-flex align-center justify-center" style="height: 400px">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </div>
      
      <!-- Статистика по категориям -->
      <v-row class="mt-4" v-if="categoryStats.length > 0">
        <v-col
          v-for="stat in categoryStats"
          :key="stat.category"
          cols="12"
          sm="4"
        >
          <v-card variant="tonal" :color="getCategoryColor(stat.category, 'border')">
            <v-card-text class="text-center">
              <div class="text-h6 font-weight-bold">{{ stat.category }}</div>
              <div class="text-h5 mt-1">{{ formatCurrency(stat.total) }}</div>
              <div class="text-caption text-grey">{{ stat.count }} продаж</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { ChartData } from '../../types/dashboard'
import { useDashboardStore } from '../../stores/dashboard'
import { useChartConfig } from '../../composables/useChartConfig'
import { useDateFormatter } from '../../composables/useDateFormatter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const dashboardStore = useDashboardStore()
const { getLineChartOptions, getCategoryColor } = useChartConfig()
const { formatShortDate, formatCurrency } = useDateFormatter()

const chartDataReady = ref(true)

const totalSales = computed(() => dashboardStore.ordersCount)

const categoryStats = computed(() => {
  const stats: Array<{ category: string; total: number; count: number }> = []
  
  dashboardStore.categories.forEach(category => {
    const categorySales = dashboardStore.filteredSales.filter(sale => sale.category === category)
    const total = categorySales.reduce((sum, sale) => sum + sale.amount, 0)
    const count = categorySales.length
    
    stats.push({ category, total, count })
  })
  
  return stats.sort((a, b) => b.total - a.total)
})

const chartData = computed<ChartData>(() => {
  const salesByDate = dashboardStore.salesByDateAndCategory
  const dates = Object.keys(salesByDate).sort()
  const categories = dashboardStore.categories

  const datasets = categories.map(category => ({
    label: category,
    data: dates.map(date => salesByDate[date][category] || 0),
    borderColor: getCategoryColor(category, 'border'),
    backgroundColor: getCategoryColor(category, 'bg'),
    borderWidth: 3,
    tension: 0.4,
    fill: true,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointBackgroundColor: '#fff',
    pointBorderWidth: 3,
    pointHoverBackgroundColor: getCategoryColor(category, 'border'),
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2,
    fill: {
      target: 'origin',
      above: getCategoryColor(category, 'bg'),
    },
  }))

  return {
    labels: dates.map(date => formatShortDate(date)),
    datasets,
  }
})

const chartOptions = getLineChartOptions()

let animationTimeout: NodeJS.Timeout | null = null

const debouncedAnimation = (callback: () => void, delay: number = 300) => {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
  animationTimeout = setTimeout(callback, delay)
}

onMounted(() => {
  if (process.client) {
    chartDataReady.value = false
    debouncedAnimation(() => {
      chartDataReady.value = true
    }, 400)
  }
})

watch(() => dashboardStore.selectedPeriod, () => {
  if (process.client) {
    chartDataReady.value = false
    debouncedAnimation(() => {
      chartDataReady.value = true
    }, 200)
  }
}, { flush: 'post' })
onUnmounted(() => {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.chart-container:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.1);
}

:deep(.chartjs-render-monitor) {
  border-radius: 8px;
}

.chart-container {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
