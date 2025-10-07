export const useDateFormatter = () => {
  const formatShortDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    return `${day}.${month}`
  }
  const formatFullDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  const formatNumber = (value: number): string => {
    return value.toLocaleString('ru-RU')
  }
  const formatCurrency = (value: number): string => {
    return `${formatNumber(value)} ₽`
  }
  const getPeriodDates = (period: string): { start: Date; end: Date } => {
    const now = new Date()
    const end = new Date()
    let start = new Date()

    switch (period) {
      case 'today':
        start.setHours(0, 0, 0, 0)
        break
      case 'week':
        start.setDate(now.getDate() - 7)
        break
      case 'month':
        start.setMonth(now.getMonth() - 1)
        break
      default:
        start = new Date(now.setMonth(now.getMonth() - 1))
    }

    return { start, end }
  }

  return {
    formatShortDate,
    formatFullDate,
    formatNumber,
    formatCurrency,
    getPeriodDates,
  }
}
