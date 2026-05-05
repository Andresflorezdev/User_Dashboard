<template>
  <section class="panel">
    <div class="header">
      <div>
        <p class="eyebrow">Analítica viva</p>
        <h2>Analytics</h2>
        <p class="lead">
          Distribución de usuarios por eje seleccionado usando los datos reales
          del directorio.
        </p>
      </div>
      <div class="segments">
        <button
          v-for="item in segments"
          :key="item"
          class="segment"
          :class="{ active: segment === item }"
          @click="segment = item"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div class="grid">
      <section class="box chart-box">
        <div class="box-head">
          <h3>{{ segment }}</h3>
          <span>{{ chartItems.length }} categorías</span>
        </div>

        <div class="bars">
          <article v-for="item in chartItems" :key="item.label" class="bar-row">
            <div class="bar-meta">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
            <div class="bar-track">
              <div
                class="bar-fill"
                :style="{ width: item.percent + '%' }"
              ></div>
            </div>
          </article>
        </div>
      </section>

      <section class="box stats-box">
        <div class="box-head">
          <h3>Resumen</h3>
          <span>En tiempo real</span>
        </div>
        <div class="stat-card" v-for="stat in summary" :key="stat.label">
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
});

const segments = ['Roles', 'Estados', 'Países'];
const segment = ref('Roles');

const chartItems = computed(() => {
  const source = {
    Roles: ['Admin', 'Editor', 'Viewer'],
    Estados: ['Activo', 'Inactivo', 'Pendiente'],
    Países: [...new Set(props.users.map((user) => user.country))],
  }[segment.value];

  const total = props.users.length || 1;

  return source
    .map((label) => {
      const value = props.users.filter((user) => {
        if (segment.value === 'Roles') return user.role === label;
        if (segment.value === 'Estados') return user.status === label;
        return user.country === label;
      }).length;

      return {
        label,
        value,
        percent: Math.max(8, Math.round((value / total) * 100)),
      };
    })
    .sort((a, b) => b.value - a.value);
});

const summary = computed(() => [
  { label: 'Usuarios', value: props.stats.totalUsers },
  { label: 'Activos', value: props.stats.activeUsers },
  { label: 'Ingresos', value: '$' + props.stats.revenue.toLocaleString() },
  { label: 'Crecimiento', value: props.stats.growth + '%' },
]);
</script>

<style scoped>
.panel {
  padding: 24px 36px 36px;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: end;
  margin-bottom: 20px;
}
.eyebrow {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 8px;
}
h2 {
  font-family: var(--font-head);
  font-size: 1.55rem;
  letter-spacing: -0.04em;
}
.lead {
  margin-top: 6px;
  color: var(--muted);
  max-width: 60ch;
}
.segments {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.segment {
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--muted);
  border-radius: 999px;
  padding: 9px 14px;
  font-family: var(--font-body);
  font-size: 0.84rem;
  cursor: pointer;
}
.segment.active {
  border-color: var(--accent);
  color: var(--accent);
  background: #4f5de61a;
}
.grid {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 16px;
}
.box {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
}
.box-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.box h3 {
  font-size: 1rem;
  font-weight: 700;
}
.bars {
  display: grid;
  gap: 14px;
}
.bar-row {
  display: grid;
  gap: 8px;
}
.bar-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.bar-meta span {
  font-weight: 600;
}
.bar-meta strong,
.stat-card strong {
  font-family: var(--font-head);
}
.bar-track {
  height: 12px;
  border-radius: 999px;
  background: var(--surface);
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent3));
}
.stats-box {
  display: grid;
  gap: 12px;
}
.stat-card {
  background: var(--surface);
  border-radius: 14px;
  padding: 14px 16px;
  display: grid;
  gap: 4px;
}
.stat-card span {
  color: var(--muted);
  font-size: 0.8rem;
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
