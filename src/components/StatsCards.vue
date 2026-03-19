<template>
  <section class="stats-grid">
    <div v-for="card in cards" :key="card.label" class="stat-card">
      <div class="stat-top">
        <span class="stat-label">{{ card.label }}</span>
        <span class="stat-icon" :style="{ color: card.color }">{{
          card.icon
        }}</span>
      </div>
      <p class="stat-value">{{ card.value }}</p>
      <p class="stat-sub" :style="{ color: card.color }">{{ card.trend }}</p>
    </div>
  </section>
</template>

<script setup>
import { stats } from '../data/users.js';

const cards = [
  {
    label: 'Total Usuarios',
    value: stats.totalUsers.toLocaleString(),
    icon: '◉',
    color: 'var(--accent)',
    trend: '+124 este mes',
  },
  {
    label: 'Usuarios Activos',
    value: stats.activeUsers.toLocaleString(),
    icon: '⬡',
    color: 'var(--accent3)',
    trend: '73.7% del total',
  },
  {
    label: 'Ingresos (USD)',
    value: '$' + stats.revenue.toLocaleString(),
    icon: '◈',
    color: 'var(--accent2)',
    trend: '+18.4% vs anterior',
  },
  {
    label: 'Crecimiento',
    value: stats.growth + '%',
    icon: '◇',
    color: '#f0c94a',
    trend: 'Tendencia al alza',
  },
];
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 28px 36px 0;
}
.stat-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 22px;
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
  border-color: #c7d6f8;
}
.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.stat-icon {
  font-size: 1.1rem;
}
.stat-value {
  font-family: var(--font-head);
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 4px;
}
.stat-sub {
  font-size: 0.78rem;
}
</style>
