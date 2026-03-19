<template>
  <aside class="sidebar">
    <div class="logo">
      <span class="logo-icon">◈</span>
      <span class="logo-text">DASHBOARD</span>
    </div>
    <nav>
      <button
        v-for="item in nav"
        :key="item.label"
        :class="['nav-item', { active: currentSection === item.label }]"
        type="button"
        @click="$emit('change-section', item.label)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </button>
    </nav>
    <div class="sidebar-footer">
      <div class="admin-badge">
        <span class="adm-avatar">AD</span>
        <div>
          <p class="adm-name">Admin</p>
          <p class="adm-role">Super Admin</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  currentSection: {
    type: String,
    required: true,
  },
});

defineEmits(['change-section']);

const nav = [
  { icon: '⬡', label: 'Overview' },
  { icon: '◉', label: 'Usuarios' },
  { icon: '◈', label: 'Analytics' },
  { icon: '◇', label: 'Proyectos' },
  { icon: '○', label: 'Mensajes' },
  { icon: '◻', label: 'Ajustes' },
];
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  position: fixed;
  top: 0;
  left: 0;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 24px 32px;
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 1.2px;
}
.logo-text {
  white-space: nowrap;
}
.logo-icon {
  color: var(--accent);
  font-size: 1.4rem;
}
nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
}
.nav-item {
  background: transparent;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  color: var(--muted);
  text-decoration: none;
  text-align: left;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}
.nav-item:hover {
  background: var(--surface2);
  color: var(--text);
}
.nav-item.active {
  background: #7c6aff2e;
  color: var(--accent);
}
.nav-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}
.sidebar-footer {
  padding: 20px 16px 0;
  border-top: 1px solid var(--border);
}
.admin-badge {
  display: flex;
  align-items: center;
  gap: 10px;
}
.adm-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 700;
}
.adm-name {
  font-size: 0.84rem;
  font-weight: 600;
}
.adm-role {
  font-size: 0.72rem;
  color: var(--muted);
}
</style>
