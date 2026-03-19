<template>
  <section class="placeholder">
    <h2>{{ title }}</h2>
    <p>Sección en construcción.</p>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.placeholder {
  margin: 24px 36px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
}
h2 {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
}
p {
  color: var(--muted);
  font-size: 0.9rem;
}
</style>
