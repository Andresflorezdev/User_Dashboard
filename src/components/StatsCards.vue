<template>
  <section class="stats-grid">
    <div
      v-for="card in cards"
      :key="card.label"
      class="stat-card"
      :style="{ '--card-color': card.color }"
    >
      <div class="stat-top">
        <span class="stat-label">{{ card.label }}</span>
        <span class="stat-icon">{{ card.icon }}</span>
      </div>
      <p class="stat-value">{{ card.value }}</p>
      <p class="stat-sub">{{ card.trend }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const cards = computed(() => {
  const activeShare = props.stats.totalUsers
    ? `${((props.stats.activeUsers / props.stats.totalUsers) * 100).toFixed(1)}% del total`
    : 'Sin actividad';

  return [
    {
      label: 'Total Usuarios',
      value: props.stats.totalUsers.toLocaleString(),
      icon: '◉',
      color: 'var(--accent)',
      trend: 'Persistido en localStorage',
    },
    {
      label: 'Usuarios Activos',
      value: props.stats.activeUsers.toLocaleString(),
      icon: '⬡',
      color: 'var(--accent3)',
      trend: activeShare,
    },
    {
      label: 'Ingresos (USD)',
      value: '$' + props.stats.revenue.toLocaleString(),
      icon: '◈',
      color: 'var(--accent2)',
      trend: 'Suma del directorio actual',
    },
    {
      label: 'Crecimiento',
      value: props.stats.growth + '%',
      icon: '◇',
      color: '#f0c94a',
      trend: 'Actividad relativa del panel',
    },
  ];
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  padding: 28px 36px 0;
}
.stat-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 28px;
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
  color: var(--card-color, var(--accent));
}
.stat-value {
  font-family: var(--font-head);
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 4px;
  padding-left: 28px;
  min-width: 64px;
  display: inline-block;
}
.stat-sub {
  font-size: 0.78rem;
  color: var(--card-color, var(--muted));
}
</style>
