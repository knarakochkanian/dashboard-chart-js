<template>
  <v-app>
    <v-app-bar color="primary" elevation="2" height="64">
      <template #prepend>
        <v-icon icon="mdi-chart-box" size="32" class="ml-4"></v-icon>
      </template>
      
      <v-app-bar-title class="font-weight-bold">
        Sales Dashboard
      </v-app-bar-title>

      <template #append>
        <v-btn
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
          class="mr-2"
        ></v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-row class="mb-4">
          <v-col cols="12">
            <DashboardDateFilter />
          </v-col>
        </v-row>

        <DashboardMetricsGrid class="mb-6" />

        <v-row>
          <v-col cols="12">
            <DashboardSalesChart />
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <v-footer app class="bg-secondary text-center py-3">
      <div class="text-white w-100">
        <v-icon icon="mdi-copyright" size="16" class="mr-1"></v-icon>
        {{ new Date().getFullYear() }} Sales Dashboard
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'


const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}

useHead({
  title: 'Sales Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Интерактивный дашборд продаж с аналитикой и графиками',
    },
  ],
})
</script>

<style scoped>
.v-main {
  min-height: calc(100vh - 64px - 49px);
}
</style>
