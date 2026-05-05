<template>
  <section class="panel">
    <div class="header">
      <div>
        <p class="eyebrow">Portafolio</p>
        <h2>Proyectos</h2>
        <p class="lead">
          Estado de iniciativas activas con progreso, prioridad y fecha de
          entrega.
        </p>
      </div>
      <button class="primary-btn" @click="advanceProject">
        Avanzar proyecto activo
      </button>
    </div>

    <div class="layout-grid">
      <section class="box project-list">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          :class="{ active: selectedProjectId === project.id }"
          @click="selectedProjectId = project.id"
        >
          <div class="card-top">
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.owner }} · {{ project.priority }}</p>
            </div>
            <span class="pill" :class="project.statusClass">{{
              project.status
            }}</span>
          </div>
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: project.progress + '%' }"
            ></div>
          </div>
          <div class="card-bottom">
            <span>{{ project.progress }}%</span>
            <span>{{ project.deadline }}</span>
          </div>
        </article>
      </section>

      <section class="box detail-box">
        <div class="box-head">
          <h3>Detalle</h3>
          <span>{{ selectedProject.name }}</span>
        </div>
        <p class="detail-copy">{{ selectedProject.description }}</p>
        <div class="detail-list">
          <div>
            <span>Responsable</span>
            <strong>{{ selectedProject.owner }}</strong>
          </div>
          <div>
            <span>Hito</span>
            <strong>{{ selectedProject.milestone }}</strong>
          </div>
          <div>
            <span>Prioridad</span>
            <strong>{{ selectedProject.priority }}</strong>
          </div>
          <div>
            <span>Entrega</span>
            <strong>{{ selectedProject.deadline }}</strong>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

const projects = ref([
  {
    id: 1,
    name: 'Rediseño del portal',
    owner: 'UX Team',
    priority: 'Alta',
    status: 'En curso',
    statusClass: 'progress',
    progress: 72,
    deadline: '14 May',
    milestone: 'UI aprobada',
    description:
      'Evolución visual del panel principal con nuevos módulos y métricas.',
  },
  {
    id: 2,
    name: 'Automatización de reportes',
    owner: 'Data Ops',
    priority: 'Media',
    status: 'En revisión',
    statusClass: 'review',
    progress: 48,
    deadline: '22 May',
    milestone: 'Exportación CSV',
    description:
      'Pipeline interno para generar reportes semanales sin trabajo manual.',
  },
  {
    id: 3,
    name: 'Programa de onboarding',
    owner: 'People',
    priority: 'Baja',
    status: 'Planificado',
    statusClass: 'planned',
    progress: 28,
    deadline: '30 May',
    milestone: 'Guías base',
    description:
      'Secuencia de bienvenida para nuevos usuarios y administradores.',
  },
]);

const selectedProjectId = ref(1);

const selectedProject = computed(
  () =>
    projects.value.find((project) => project.id === selectedProjectId.value) ??
    projects.value[0],
);

const advanceProject = () => {
  projects.value = projects.value.map((project) => {
    if (project.id !== selectedProjectId.value) {
      return project;
    }

    const nextProgress = Math.min(100, project.progress + 5);

    return {
      ...project,
      progress: nextProgress,
      status: nextProgress >= 100 ? 'Completado' : project.status,
      statusClass: nextProgress >= 100 ? 'done' : project.statusClass,
    };
  });
};
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
.primary-btn {
  border: none;
  border-radius: 12px;
  padding: 11px 16px;
  background: var(--accent);
  color: #fff;
  font-family: var(--font-body);
  font-weight: 700;
  cursor: pointer;
}
.layout-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;
}
.box {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
}
.project-list {
  display: grid;
  gap: 12px;
}
.project-card {
  background: var(--surface);
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
}
.project-card.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px #4f5de61a;
}
.card-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
  margin-bottom: 12px;
}
.card-top h3,
.box h3,
.detail-list strong {
  font-family: var(--font-head);
}
.card-top p,
.detail-copy,
.detail-list span {
  color: var(--muted);
}
.pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}
.pill.progress {
  background: #4f5de61f;
  color: var(--accent);
}
.pill.review {
  background: #e85d821f;
  color: var(--accent2);
}
.pill.planned {
  background: #f0c94a2a;
  color: #8d6a00;
}
.pill.done {
  background: #1ea9951f;
  color: var(--accent3);
}
.progress-track {
  height: 10px;
  border-radius: 999px;
  background: #dce3ee;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.84rem;
  color: var(--muted);
}
.detail-box {
  display: grid;
  gap: 16px;
}
.box-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.detail-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.detail-list div {
  background: var(--surface);
  border-radius: 14px;
  padding: 14px;
  display: grid;
  gap: 4px;
}
@media (max-width: 1100px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}
</style>
