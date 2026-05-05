<template>
  <section class="panel">
    <div class="header">
      <div>
        <p class="eyebrow">Mensajería</p>
        <h2>Mensajes</h2>
        <p class="lead">
          Bandeja simple con lectura, respuesta rápida y estado de atención.
        </p>
      </div>
      <div class="header-pill">
        <strong>{{ unreadCount }}</strong>
        <span>sin leer</span>
      </div>
    </div>

    <div class="layout-grid">
      <section class="box inbox">
        <div class="inbox-tools">
          <button
            v-for="filter in filters"
            :key="filter"
            class="filter-btn"
            :class="{ active: activeFilter === filter }"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <article
          v-for="message in filteredMessages"
          :key="message.id"
          class="message-item"
          :class="{ active: selectedMessage.id === message.id }"
          @click="selectMessage(message)"
        >
          <div class="avatar">{{ message.avatar }}</div>
          <div class="message-copy">
            <div class="message-top">
              <strong>{{ message.from }}</strong>
              <span>{{ message.time }}</span>
            </div>
            <p>{{ message.subject }}</p>
            <small>{{ message.preview }}</small>
          </div>
          <span v-if="!message.read" class="dot"></span>
        </article>
      </section>

      <section class="box thread">
        <div class="box-head">
          <h3>{{ selectedMessage.from }}</h3>
          <span>{{ selectedMessage.channel }}</span>
        </div>
        <p class="detail-copy">{{ selectedMessage.subject }}</p>

        <div class="thread-body">
          <p>{{ selectedMessage.body }}</p>
        </div>

        <label class="reply-box">
          <span>Responder</span>
          <textarea
            v-model="reply"
            rows="5"
            placeholder="Escribe una respuesta breve..."
          ></textarea>
        </label>

        <div class="actions">
          <button class="ghost-btn" @click="markRead(selectedMessage.id)">
            Marcar leída
          </button>
          <button class="primary-btn" @click="sendReply">
            Enviar respuesta
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const filters = ['Todos', 'Soporte', 'Ventas', 'Interno'];
const activeFilter = ref('Todos');
const reply = ref('');

const messages = ref([
  {
    id: 1,
    from: 'Carolina R.',
    avatar: 'CR',
    channel: 'Soporte',
    subject: 'Error al guardar usuario',
    preview: 'Necesito revisar por qué no me deja actualizar el registro...',
    body: 'Hola, estamos viendo un comportamiento raro al intentar guardar un usuario con correo nuevo.',
    time: '09:12',
    read: false,
  },
  {
    id: 2,
    from: 'Equipo Comercial',
    avatar: 'EC',
    channel: 'Ventas',
    subject: 'Solicitud de demo',
    preview: 'Nos pidieron un entorno de demostración para mañana...',
    body: 'Necesitamos compartir un acceso temporal para enseñar el panel con datos de ejemplo.',
    time: '08:40',
    read: true,
  },
  {
    id: 3,
    from: 'Andrés M.',
    avatar: 'AM',
    channel: 'Interno',
    subject: 'Revisión de estilos',
    preview: 'La tipografía ya se ve mejor, pero hay una vista pendiente...',
    body: 'Dejé comentarios sobre los espacios y el contraste. Hay que cerrar el módulo de mensajes.',
    time: 'Ayer',
    read: false,
  },
]);

const selectedMessage = reactive({ ...messages.value[0] });

const filteredMessages = computed(() => {
  if (activeFilter.value === 'Todos') {
    return messages.value;
  }

  return messages.value.filter(
    (message) => message.channel === activeFilter.value,
  );
});

const unreadCount = computed(
  () => messages.value.filter((message) => !message.read).length,
);

const selectMessage = (message) => {
  Object.assign(selectedMessage, message);
  markRead(message.id);
};

const markRead = (messageId) => {
  messages.value = messages.value.map((message) =>
    message.id === messageId ? { ...message, read: true } : message,
  );
};

const sendReply = () => {
  if (!reply.value.trim()) {
    return;
  }

  messages.value = [
    {
      id: Date.now(),
      from: 'Yo',
      avatar: 'YO',
      channel: selectedMessage.channel,
      subject: `Respuesta: ${selectedMessage.subject}`,
      preview: reply.value.slice(0, 42),
      body: reply.value,
      time: 'Ahora',
      read: true,
    },
    ...messages.value,
  ];

  reply.value = '';
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
.header-pill {
  min-width: 110px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px 18px;
  display: grid;
  gap: 4px;
  text-align: center;
}
.header-pill strong {
  font-family: var(--font-head);
  font-size: 1.5rem;
}
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 16px;
}
.box {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
}
.inbox {
  display: grid;
  gap: 12px;
  align-content: start;
  align-items: start;
}
.inbox-tools {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
}
.filter-btn,
.ghost-btn,
.primary-btn {
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 10px 18px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    box-shadow 160ms ease,
    color 120ms ease,
    background 160ms ease;
}
.filter-btn {
  background: transparent;
  color: var(--muted);
  box-shadow: none;
}
.filter-btn:hover {
  color: var(--text);
  border-color: rgba(36, 52, 68, 0.06);
  box-shadow: 0 6px 18px rgba(20, 32, 48, 0.03);
}
.filter-btn:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(79, 93, 230, 0.06);
}
.filter-btn.active {
  background: rgba(79, 93, 230, 0.08);
  color: var(--accent);
  border-color: rgba(79, 93, 230, 0.28);
  box-shadow: 0 12px 30px rgba(79, 93, 230, 0.06);
  font-weight: 700;
}
.message-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: start;
  background: var(--surface);
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 14px;
  cursor: pointer;
}
.message-item.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px #4f5de61a;
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #4f5de61a;
  color: var(--accent);
  font-weight: 700;
  font-size: 0.75rem;
}
.message-copy {
  display: grid;
  gap: 4px;
}
.message-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.message-copy p {
  font-weight: 600;
}
.message-copy small,
.message-top span,
.detail-copy,
.thread-body {
  color: var(--muted);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent2);
  margin-top: 5px;
}
.thread {
  display: grid;
  gap: 14px;
}
.box-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.box h3 {
  font-size: 1rem;
  font-weight: 700;
}
.thread-body {
  background: var(--surface);
  border-radius: 16px;
  padding: 16px;
  min-height: 140px;
}
.reply-box {
  display: grid;
  gap: 8px;
}
.reply-box span {
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  font-weight: 700;
}
textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  padding: 12px 14px;
  color: var(--text);
  font-family: var(--font-body);
  resize: vertical;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}
.ghost-btn {
  background: transparent;
  color: var(--muted);
}
.primary-btn {
  background: var(--accent);
  color: #fff;
  border-color: transparent;
}
@media (max-width: 1100px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}
</style>
