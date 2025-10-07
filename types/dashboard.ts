/**
 * Типы данных для дашборда
 */

export interface SaleRecord {
  date: string
  amount: number
  category: string
}

export interface MetricData {
  totalRevenue: number
  ordersCount: number
  averageCheck: number
  uniqueUsers: number
}

export type DatePeriod = 'today' | 'week' | 'month' | 'custom'

export interface DateRange {
  start: Date
  end: Date
}

export interface ChartDataset {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
  tension: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}
