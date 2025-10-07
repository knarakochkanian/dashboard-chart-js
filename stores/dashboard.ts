import { defineStore } from 'pinia'
import type { SaleRecord, DatePeriod, DateRange } from '../types/dashboard'
import salesData from '../data/sales.json'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    allSales: salesData as SaleRecord[],
    selectedPeriod: 'month' as DatePeriod,
    customDateRange: null as DateRange | null,
  }),

  getters: {
    filteredSales: (state): SaleRecord[] => {
      switch (state.selectedPeriod) {
        case 'today':
          const lastDate = state.allSales[state.allSales.length - 1]?.date
          return state.allSales.filter(sale => sale.date === lastDate)
        case 'week':
          return state.allSales.slice(-7)
        case 'month':
          return state.allSales
        case 'custom':
          if (!state.customDateRange) return state.allSales
          return state.allSales.filter(sale => {
            const saleDate = new Date(sale.date + 'T00:00:00')
            const startDate = new Date(state.customDateRange!.start)
            const endDate = new Date(state.customDateRange!.end)
            
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
            
            return saleDate >= startDate && saleDate <= endDate
          })
        default:
          return state.allSales
      }
    },

    categories: (state): string[] => {
      return [...new Set(state.allSales.map(s => s.category))]
    },

    totalRevenue(): number {
      return this.filteredSales.reduce((sum, sale) => sum + sale.amount, 0)
    },

    ordersCount(): number {
      return this.filteredSales.length
    },

    averageCheck(): number {
      if (this.ordersCount === 0) return 0
      return Math.round(this.totalRevenue / this.ordersCount)
    },

    uniqueUsers(): number {
      return Math.ceil(this.ordersCount * 0.6)
    },

    salesByDateAndCategory(): Record<string, Record<string, number>> {
      const result: Record<string, Record<string, number>> = {}
      
      this.filteredSales.forEach(sale => {
        if (!result[sale.date]) {
          result[sale.date] = {}
        }
        if (!result[sale.date][sale.category]) {
          result[sale.date][sale.category] = 0
        }
        result[sale.date][sale.category] += sale.amount
      })

      return result
    },
  },

  actions: {
    setPeriod(period: DatePeriod) {
      this.selectedPeriod = period
      if (period !== 'custom') {
        this.customDateRange = null
      }
    },

    setCustomDateRange(start: Date, end: Date) {
      this.selectedPeriod = 'custom'
      this.customDateRange = { start, end }
      
      console.log('Custom date range set:', {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        filteredCount: this.filteredSales.length
      })
    },
  },
})
