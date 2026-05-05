<template>
  <section class="panel">
    <div class="hero">
      <div>
        <p class="eyebrow">Resumen operativo</p>
        <h2>Overview</h2>
        <p class="lead">
          Un vistazo rápido al estado actual del directorio con datos reales del
          panel.
        </p>
      </div>
      <div class="hero-metric">
        <span>Usuarios activos</span>
        <strong>{{ stats.activeUsers }}</strong>
        <small>de {{ stats.totalUsers }} totales</small>
      </div>
    </div>

    <div class="cards">
      <button
        v-for="card in cards"
        :key="card.label"
        class="card"
        :class="{ active: selectedFilter === card.label }"
        @click="selectedFilter = card.label"
      >
        <div class="card-body">
          <div class="card-text">
            <span class="card-label">{{ card.label }}</span>
            <small>{{ card.helper }}</small>
          </div>
          <strong class="card-value">{{ card.value }}</strong>
        </div>
      </button>
    </div>

    <div class="content-grid">
      <section class="box">
        <div class="box-head">
          <h3>Actividad reciente</h3>
          <span>{{ visibleUsers.length }} registros</span>
        </div>
        <div class="activity-list">
          <article
            v-for="user in visibleUsers"
            :key="user.id"
            class="activity-item"
          >
            <div class="avatar">{{ user.avatar }}</div>
            <div>
              <p>{{ user.name }}</p>
              <span>{{ user.role }} · {{ user.status }}</span>
            </div>
            <strong>${{ user.revenue.toLocaleString() }}</strong>
          </article>
        </div>
      </section>

      <section class="box insights">
        <div class="box-head">
          <h3>Indicadores</h3>
          <span>Actualizado ahora</span>
        </div>
        <div class="insight-row">
          <span>Ingresos totales</span>
          <strong>${{ stats.revenue.toLocaleString() }}</strong>
        </div>
        <div class="insight-row">
          <span>Crecimiento</span>
          <strong>{{ stats.growth }}%</strong>
        </div>
        <div class="insight-row">
          <span>Pendientes</span>
          <strong>{{ pendingUsers }}</strong>
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

const selectedFilter = ref('Todos');

const cards = computed(() => [
  {
    label: 'Todos',
    value: props.stats.totalUsers,
    helper: 'Ver el directorio completo',
  },
  {
    label: 'Activo',
    value: props.users.filter((user) => user.status === 'Activo').length,
    helper: 'Usuarios operativos',
  },
  {
    label: 'Pendiente',
    value: props.users.filter((user) => user.status === 'Pendiente').length,
    helper: 'Pendientes por revisar',
  },
  {
    label: 'Inactivo',
    value: props.users.filter((user) => user.status === 'Inactivo').length,
    helper: 'Cuentas pausadas',
  },
]);

const visibleUsers = computed(() => {
  if (selectedFilter.value === 'Todos') {
    return props.users.slice(0, 5);
  }

  return props.users
    .filter((user) => user.status === selectedFilter.value)
    .slice(0, 5);
});

const pendingUsers = computed(
  () => props.users.filter((user) => user.status === 'Pendiente').length,
);
</script>

<style scoped>
.panel {
  padding: 24px 36px 36px;
}
.hero {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
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
.hero-metric {
  min-width: 180px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px 20px;
  display: grid;
  gap: 4px;
}
.hero-metric span,
.hero-metric small,
.card small,
.box-head span,
.activity-item span,
.insight-row span {
  color: var(--muted);
}
.hero-metric strong,
.card strong,
.insight-row strong {
  font-family: var(--font-head);
  font-size: 1.5rem;
}
.cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}
.card {
  text-align: left;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px 18px;
  color: var(--text);
  cursor: pointer;
}
.card.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px #4f5de61f;
}
.card-label {
  display: block;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 18px;
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.card-text {
  min-width: 0; /* allow truncation */
}
.card-value {
  font-family: var(--font-head);
  font-size: 1.5rem;
  color: var(--text);
  min-width: 56px;
  text-align: right;
}
.content-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
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
.activity-list {
  display: grid;
  gap: 10px;
}
.activity-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  background: var(--surface);
  border-radius: 14px;
  padding: 12px 14px;
}
.avatar {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #4f5de61a;
  color: var(--accent);
  font-weight: 700;
  font-size: 0.75rem;
}
.activity-item p {
  font-weight: 600;
}
.activity-item strong {
  font-family: var(--font-head);
}
.insights {
  display: grid;
  gap: 10px;
}
.insight-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border-radius: 14px;
  padding: 14px 16px;
}
@media (max-width: 1100px) {
  .cards,
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 760px) {
  .panel,
  .hero {
    padding-left: 16px;
    padding-right: 16px;
  }
  .hero,
  .content-grid {
    grid-template-columns: 1fr;
    display: grid;
    align-items: start;
  }
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
