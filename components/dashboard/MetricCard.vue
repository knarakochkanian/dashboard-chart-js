<template>
  <v-card class="metric-card" elevation="2">
    <v-card-text>
      <div class="d-flex align-center mb-2">
        <v-avatar :color="color" size="40" class="mr-3">
          <v-icon :icon="icon" color="white" size="20"></v-icon>
        </v-avatar>
        <div class="flex-grow-1">
          <div class="text-caption text-grey-darken-1">{{ title }}</div>
          <div class="text-h5 font-weight-bold">{{ formattedValue }}</div>
        </div>
      </div>
      <v-progress-linear
        :model-value="progress"
        :color="color"
        height="4"
        rounded
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormatter } from '../../composables/useDateFormatter'

interface Props {
  title: string
  value: number | string
  icon: string
  color?: string
  progress?: number
  format?: 'number' | 'currency'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  progress: 0,
  format: 'number',
})

const { formatNumber, formatCurrency } = useDateFormatter()

const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  if (props.format === 'currency') return formatCurrency(props.value)
  return formatNumber(props.value)
})
</script>

<style scoped>
.metric-card {
  height: 100%;
  transition: transform 0.2s ease-in-out;
}

.metric-card:hover {
  transform: translateY(-4px);
}
</style>
