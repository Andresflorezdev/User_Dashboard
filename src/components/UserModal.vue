<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal" :class="{ 'modal--form': isFormMode }">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <div class="modal-header">
        <div
          class="modal-avatar"
          :style="{ background: 'var(--accent)33', color: 'var(--accent)' }"
        >
          {{ avatarPreview }}
        </div>
        <div>
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2>{{ title }}</h2>
          <p>{{ subtitle }}</p>
        </div>
      </div>

      <form v-if="isFormMode" class="form-grid" @submit.prevent="save">
        <label class="field">
          <span>Nombre</span>
          <input
            v-model="draft.name"
            type="text"
            required
            placeholder="Ej. Laura Torres"
          />
        </label>

        <label class="field">
          <span>Email</span>
          <input
            v-model="draft.email"
            type="email"
            required
            placeholder="correo@dominio.com"
          />
        </label>

        <label class="field">
          <span>Rol</span>
          <select v-model="draft.role">
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </label>

        <label class="field">
          <span>Estado</span>
          <select v-model="draft.status">
            <option>Activo</option>
            <option>Inactivo</option>
            <option>Pendiente</option>
          </select>
        </label>

        <label class="field">
          <span>Ingreso</span>
          <input v-model="draft.joined" type="date" required />
        </label>

        <label class="field">
          <span>Ingresos</span>
          <input
            v-model.number="draft.revenue"
            type="number"
            min="0"
            step="1"
          />
        </label>

        <label class="field">
          <span>País</span>
          <input
            v-model="draft.country"
            type="text"
            maxlength="4"
            placeholder="🇨🇴"
          />
        </label>

        <label class="field">
          <span>Avatar</span>
          <input
            v-model="draft.avatar"
            type="text"
            maxlength="3"
            placeholder="Auto"
          />
        </label>

        <div class="form-actions">
          <button type="button" class="ghost-btn" @click="$emit('close')">
            Cancelar
          </button>
          <button
            v-if="mode === 'edit'"
            type="button"
            class="danger-btn"
            @click="$emit('delete', { ...draft })"
          >
            Eliminar
          </button>
          <button type="submit" class="primary-btn">
            {{ mode === 'create' ? 'Crear usuario' : 'Guardar cambios' }}
          </button>
        </div>
      </form>

      <template v-else>
        <div class="modal-grid">
          <div class="info-item" v-for="item in info" :key="item.label">
            <span class="info-label">{{ item.label }}</span>
            <span class="info-value">{{ item.value }}</span>
          </div>
        </div>

        <div class="modal-actions">
          <button class="ghost-btn" @click="$emit('close')">Cerrar</button>
          <button class="secondary-btn" @click="$emit('edit', user)">
            Editar
          </button>
          <button class="danger-btn" @click="$emit('delete', user)">
            Eliminar
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: 'view',
  },
});

const emit = defineEmits(['close', 'save', 'edit', 'delete']);

const isFormMode = computed(
  () => props.mode === 'create' || props.mode === 'edit',
);

const createDraft = (user = {}) => ({
  id: user.id ?? null,
  name: user.name ?? '',
  email: user.email ?? '',
  role: user.role ?? 'Viewer',
  status: user.status ?? 'Pendiente',
  joined: user.joined ?? new Date().toISOString().slice(0, 10),
  avatar: user.avatar ?? '',
  revenue: user.revenue ?? 0,
  country: user.country ?? '🌎',
});

const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'US';

const draft = reactive(createDraft(props.user));

watch(
  [() => props.user, () => props.mode],
  () => {
    Object.assign(draft, createDraft(props.user));
  },
  { immediate: true },
);

const avatarPreview = computed(() => {
  const source = isFormMode.value
    ? draft.avatar || initials(draft.name)
    : props.user.avatar;
  return source || initials(isFormMode.value ? draft.name : props.user.name);
});

const eyebrow = computed(() => {
  if (props.mode === 'create') {
    return 'Nuevo registro';
  }

  if (props.mode === 'edit') {
    return 'Edición activa';
  }

  return 'Ficha de usuario';
});

const title = computed(() => {
  if (props.mode === 'create') {
    return 'Crear usuario';
  }

  if (props.mode === 'edit') {
    return 'Editar usuario';
  }

  return props.user.name;
});

const subtitle = computed(() => {
  if (isFormMode.value) {
    return 'Completa los datos y guarda los cambios en el navegador.';
  }

  return props.user.email;
});

const info = computed(() => [
  { label: 'Rol', value: props.user.role },
  { label: 'Estado', value: props.user.status },
  { label: 'País', value: props.user.country },
  {
    label: 'Registro',
    value: new Date(props.user.joined).toLocaleDateString('es-CO'),
  },
  {
    label: 'Ingresos',
    value: '$' + Number(props.user.revenue || 0).toLocaleString(),
  },
  { label: 'ID', value: '#' + String(props.user.id).padStart(4, '0') },
]);

const save = () => {
  emit('save', {
    ...draft,
    name: draft.name.trim(),
    email: draft.email.trim(),
    avatar: draft.avatar?.trim() || initials(draft.name),
    country: draft.country.trim() || '🌎',
    revenue: Number(draft.revenue) || 0,
  });
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: #00000088;
  display: grid;
  place-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  padding: 16px;
}
.modal {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  width: min(400px, calc(100vw - 32px));
  position: relative;
  animation: pop 0.2s ease;
}
.modal--form {
  width: min(620px, calc(100vw - 32px));
}
@keyframes pop {
  from {
    transform: scale(0.92);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1rem;
  cursor: pointer;
}
.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.modal-avatar {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  font-weight: 700;
}
.eyebrow {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 4px;
}
h2 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
}
p {
  font-size: 0.82rem;
  color: var(--muted);
  margin-top: 2px;
}
.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.info-item {
  background: var(--surface);
  border-radius: 10px;
  padding: 14px;
}
.info-label {
  display: block;
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.info-value {
  font-weight: 600;
  font-size: 0.92rem;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field span {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  font-weight: 700;
}
input,
select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  padding: 11px 12px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
}
input:focus,
select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px #4f5de61f;
}
.form-actions,
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}
.ghost-btn,
.secondary-btn,
.danger-btn,
.primary-btn {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}
.ghost-btn {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}
.secondary-btn {
  background: #4f5de61f;
  color: var(--accent);
}
.danger-btn {
  background: #e85d821f;
  color: var(--accent2);
}
.primary-btn {
  background: var(--accent);
  color: #fff;
}
.ghost-btn:hover,
.secondary-btn:hover,
.danger-btn:hover,
.primary-btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}
</style>
