import type { ChartOptions } from 'chart.js'
export const CHART_COLORS = {
  primary: '#6366F1', 
  secondary: '#8B5CF6', 
  accent: '#06B6D4',
  success: '#3B82F6',
  warning: '#F59E0B', 
} as const
export const CATEGORY_COLORS: Record<string, { border: string; bg: string }> = {
  'Электроника': {
    border: CHART_COLORS.primary,
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  'Одежда': {
    border: CHART_COLORS.secondary,
    bg: 'rgba(139, 92, 246, 0.1)',
  },
  'Книги': {
    border: CHART_COLORS.accent,
    bg: 'rgba(6, 182, 212, 0.1)',
  },
}

export const useChartConfig = () => {
  const getLineChartOptions = (): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        borderColor: CHART_COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        padding: 16,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
          weight: '500',
        },
        callbacks: {
          title: (context) => {
            return `📅 ${context[0].label}`
          },
          label: (context) => {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            const percentage = context.parsed.y > 0 ? 
              ((context.parsed.y / context.chart.data.datasets.reduce((sum, ds) => 
                sum + ds.data[context.dataIndex], 0)) * 100).toFixed(1) : 0
            return [
              `📊 ${label}`,
              `💰 ${value.toLocaleString('ru-RU')} ₽`,
              `📈 ${percentage}% от общего`
            ]
          },
          footer: (tooltipItems) => {
            const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0)
            return `💎 Итого: ${total.toLocaleString('ru-RU')} ₽`
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value) => {
            return `${value.toLocaleString('ru-RU')} ₽`
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutCubic',
      onProgress: (animation) => {
        const progress = animation.currentStep / animation.numSteps
        return progress
      },
      onComplete: () => {
        console.log('Chart animation completed')
      },
    },
    transitions: {
      show: {
        animation: {
          duration: 500,
          easing: 'easeInOutQuart',
        },
      },
      hide: {
        animation: {
          duration: 300,
          easing: 'easeInOutQuart',
        },
      },
    },
  })
  const getCategoryColor = (category: string, type: 'border' | 'bg' = 'border') => {
    const colors = CATEGORY_COLORS[category]
    if (!colors) {
      return type === 'border' ? CHART_COLORS.primary : 'rgba(99, 102, 241, 0.1)'
    }
    return type === 'border' ? colors.border : colors.bg
  }

  return {
    getLineChartOptions,
    getCategoryColor,
    CHART_COLORS,
  }
}
