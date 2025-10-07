# 📊 Sales Dashboard

Интерактивный дашборд для анализа продаж с фильтрацией по периодам и визуализацией данных.

## 🚀 Быстрый старт

```bash
# Требуется Node.js 20+
nvm use 20

# Установка и запуск
npm install
npm run dev
```

Откройте http://localhost:3000

## 🏗️ Архитектура

```
board/
├── types/dashboard.ts           # TypeScript типы
├── data/sales.json             # Mock данные
├── stores/dashboard.ts         # Pinia store
├── composables/                # Переиспользуемая логика
│   ├── useChartConfig.ts       # Конфигурация Chart.js
│   └── useDateFormatter.ts     # Форматирование дат
├── components/dashboard/       # Компоненты дашборда
│   ├── MetricCard.vue          # Карточка метрики
│   ├── DateFilter.vue          # Фильтр периодов
│   ├── SalesChart.vue          # График продаж
│   └── MetricsGrid.vue         # Сетка метрик
├── plugins/vuetify.ts          # Конфигурация Vuetify
└── app.vue                     # Главная страница
```

## 🎯 Функциональность

- **Фильтрация**: Сегодня, Неделя, Месяц, Произвольный диапазон
- **Графики**: Линейный график динамики продаж по категориям
- **Метрики**: Общий доход, Заказы, Средний чек, Пользователи
- **Темы**: Светлая/темная тема с переключением
- **Адаптивность**: Корректное отображение на всех устройствах

## 🛠️ Технологии

- **Vue 3** + **Nuxt 3** - Основа приложения
- **Vuetify 3** - UI-библиотека Material Design
- **Chart.js** - Графики и визуализация
- **Pinia** - Управление состоянием
- **TypeScript** - Типизация

## 🎨 Кастомизация

### Цветовая палитра
```typescript
// composables/useChartConfig.ts
export const CHART_COLORS = {
  primary: '#6366F1',   // Indigo
  secondary: '#8B5CF6', // Violet
  accent: '#06B6D4',    // Cyan
}

## 📱 Адаптивность

- **Десктоп**: 4 метрики в ряд
- **Планшет**: 2 метрики в ряд  
- **Мобильный**: особо ничего не видно много инфы
