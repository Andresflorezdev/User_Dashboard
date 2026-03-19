<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="close-btn" @click="$emit('close')">✕</button>
      <div class="modal-header">
        <div class="modal-avatar" :style="{ background: 'var(--accent)33', color: 'var(--accent)' }">
          {{ user.avatar }}
        </div>
        <div>
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div class="modal-grid">
        <div class="info-item" v-for="item in info" :key="item.label">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['user'])
defineEmits(['close'])

const info = [
  { label: 'Rol', value: props.user.role },
  { label: 'Estado', value: props.user.status },
  { label: 'País', value: props.user.country },
  { label: 'Registro', value: new Date(props.user.joined).toLocaleDateString('es-CO') },
  { label: 'Ingresos', value: '$' + props.user.revenue.toLocaleString() },
  { label: 'ID', value: '#' + String(props.user.id).padStart(4, '0') },
]
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: #00000088;
  display: grid; place-items: center; z-index: 100;
  backdrop-filter: blur(4px);
}
.modal {
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 20px; padding: 32px; width: 400px;
  position: relative; animation: pop 0.2s ease;
}
@keyframes pop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.close-btn {
  position: absolute; top: 16px; right: 16px;
  background: none; border: none; color: var(--muted);
  font-size: 1rem; cursor: pointer;
}
.modal-header { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
.modal-avatar {
  width: 60px; height: 60px; border-radius: 16px;
  display: grid; place-items: center; font-size: 1.1rem; font-weight: 700;
}
h2 { font-family: var(--font-head); font-size: 1.2rem; font-weight: 800; }
p { font-size: 0.82rem; color: var(--muted); margin-top: 2px; }
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.info-item { background: var(--surface); border-radius: 10px; padding: 14px; }
.info-label { display: block; font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.info-value { font-weight: 600; font-size: 0.92rem; }
</style>