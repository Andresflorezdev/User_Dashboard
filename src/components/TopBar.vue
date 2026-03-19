<template>
  <header class="topbar">
    <div class="page-title">
      <h1>{{ section }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="isUsersSection" class="topbar-right">
      <div class="search-box">
        <span class="search-icon">⌕</span>
        <input
          v-model="query"
          @input="$emit('search', query)"
          type="text"
          placeholder="Buscar usuario..."
        />
      </div>
      <button class="btn-new" @click="$emit('new-user')">
        + Nuevo Usuario
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  section: {
    type: String,
    default: 'Usuarios',
  },
});

const query = ref('');
defineEmits(['search', 'new-user']);

const isUsersSection = computed(() => props.section === 'Usuarios');
const subtitle = computed(() => {
  const map = {
    Overview: 'Resumen general del panel',
    Usuarios: 'Gestión y control de acceso',
    Analytics: 'Métricas y tendencias',
    Proyectos: 'Seguimiento de iniciativas',
    Mensajes: 'Conversaciones y notificaciones',
    Ajustes: 'Configuración del sistema',
  };

  return map[props.section] ?? 'Panel de administración';
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 36px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
h1 {
  font-family: var(--font-head);
  font-size: 1.6rem;
  font-weight: 800;
}
.subtitle {
  font-size: 0.82rem;
  color: var(--muted);
  margin-top: 2px;
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 14px;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px 14px;
}
.search-icon {
  color: var(--muted);
  font-size: 1.1rem;
}
input {
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.88rem;
  width: 200px;
}
input::placeholder {
  color: var(--muted);
}
.btn-new {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-new:hover {
  opacity: 0.85;
}
</style>
