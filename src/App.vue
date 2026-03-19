<template>
  <div class="layout">
    <Sidebar :current-section="currentSection" @change-section="setSection" />
    <main class="main">
      <TopBar
        :section="currentSection"
        @search="search = $event"
        @new-user="openNewUser"
      />
      <template v-if="currentSection === 'Usuarios'">
        <StatsCards />
        <UsersTable
          :users="users"
          :search="search"
          @view-user="selected = $event"
        />
      </template>
      <SectionPlaceholder v-else :title="currentSection" />
    </main>
    <UserModal v-if="selected" :user="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';
import StatsCards from './components/StatsCards.vue';
import UsersTable from './components/UsersTable.vue';
import UserModal from './components/UserModal.vue';
import SectionPlaceholder from './components/SectionPlaceholder.vue';
import { users } from './data/users.js';

const currentSection = ref('Usuarios');
const search = ref('');
const selected = ref(null);

const setSection = (section) => {
  currentSection.value = section;
  search.value = '';
  selected.value = null;
};

const openNewUser = () => {
  if (currentSection.value !== 'Usuarios') {
    return;
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}
.main {
  margin-left: 260px;
  flex: 1;
  background: var(--bg);
}
</style>
