<template>
  <section class="table-section">
    <div class="table-header">
      <h2>Directorio de Usuarios</h2>
      <div class="filter-tabs">
        <button
          v-for="f in filters"
          :key="f"
          :class="['tab', { active: active === f }]"
          @click="active = f"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Ingreso</th>
            <th>Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id" class="row">
            <td>
              <div class="user-cell">
                <div class="avatar" :style="avatarStyle(u.id)">
                  {{ u.avatar }}
                </div>
                <div>
                  <p class="uname">{{ u.country }} {{ u.name }}</p>
                  <p class="uemail">{{ u.email }}</p>
                </div>
              </div>
            </td>
            <td>
              <span class="role-badge" :class="u.role.toLowerCase()">{{
                u.role
              }}</span>
            </td>
            <td>
              <span class="status-dot" :class="statusClass(u.status)">{{
                u.status
              }}</span>
            </td>
            <td class="revenue">${{ u.revenue.toLocaleString() }}</td>
            <td class="date">{{ formatDate(u.joined) }}</td>
            <td>
              <button class="action-btn" @click="$emit('view-user', u)">
                Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['users', 'search']);
defineEmits(['view-user']);

const filters = ['Todos', 'Activo', 'Inactivo', 'Pendiente'];
const active = ref('Todos');

const filtered = computed(() => {
  let list = props.users;
  if (active.value !== 'Todos')
    list = list.filter((u) => u.status === active.value);
  if (props.search)
    list = list.filter(
      (u) =>
        u.name.toLowerCase().includes(props.search.toLowerCase()) ||
        u.email.toLowerCase().includes(props.search.toLowerCase()),
    );
  return list;
});

const colors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)', '#f0c94a'];
const avatarStyle = (id) => ({
  background: colors[id % colors.length] + '33',
  color: colors[id % colors.length],
});
const statusClass = (s) =>
  ({ Activo: 'active', Inactivo: 'inactive', Pendiente: 'pending' })[s];
const formatDate = (d) =>
  new Date(d).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
</script>

<style scoped>
.table-section {
  margin: 24px 36px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}
h2 {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
}
.filter-tabs {
  display: flex;
  gap: 6px;
}
.tab {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}
.tab.active,
.tab:hover {
  background: #4f5de636;
  color: var(--accent);
  border-color: #4f5de670;
}
.table-wrap {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead tr {
  background: var(--surface);
}
th {
  padding: 12px 20px;
  text-align: left;
  font-size: 0.74rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.row {
  border-top: 1px solid var(--border);
  transition: background 0.15s;
}
.row:hover {
  background: #dbe3f1;
}
td {
  padding: 14px 20px;
  font-size: 0.88rem;
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}
.uname {
  font-weight: 500;
  font-size: 0.88rem;
}
.uemail {
  font-size: 0.76rem;
  color: var(--muted);
}
.role-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}
.role-badge.admin {
  background: #4f5de633;
  color: var(--accent);
}
.role-badge.editor {
  background: #1ea99533;
  color: var(--accent3);
}
.role-badge.viewer {
  background: #5f6d8033;
  color: var(--muted);
}
.status-dot {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
}
.status-dot::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.active::before {
  background: var(--accent3);
  box-shadow: 0 0 6px var(--accent3);
}
.status-dot.inactive::before {
  background: var(--muted);
}
.status-dot.pending::before {
  background: #f0c94a;
}
.revenue {
  font-family: var(--font-head);
  font-weight: 700;
  color: var(--accent3);
}
.date {
  color: var(--muted);
  font-size: 0.82rem;
}
.action-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 7px;
  padding: 6px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}
.action-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
