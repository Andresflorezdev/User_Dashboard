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
        <StatsCards :stats="stats" />
        <UsersTable
          :users="users"
          :search="search"
          @view-user="openUser"
          @edit-user="openEditUser"
          @delete-user="deleteUser"
        />
      </template>
      <OverviewPanel
        v-else-if="currentSection === 'Overview'"
        :users="users"
        :stats="stats"
      />
      <AnalyticsPanel
        v-else-if="currentSection === 'Analytics'"
        :users="users"
        :stats="stats"
      />
      <ProjectsPanel v-else-if="currentSection === 'Proyectos'" />
      <MessagesPanel v-else-if="currentSection === 'Mensajes'" />
    </main>
    <UserModal
      v-if="modalState"
      :mode="modalState.mode"
      :user="modalState.user"
      @close="closeModal"
      @save="saveUser"
      @edit="openEditUser"
      @delete="deleteUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';
import StatsCards from './components/StatsCards.vue';
import UsersTable from './components/UsersTable.vue';
import UserModal from './components/UserModal.vue';
import { createBlankUser, useUsersStore } from './composables/useUsersStore.js';
import OverviewPanel from './components/views/OverviewPanel.vue';
import AnalyticsPanel from './components/views/AnalyticsPanel.vue';
import ProjectsPanel from './components/views/ProjectsPanel.vue';
import MessagesPanel from './components/views/MessagesPanel.vue';

const { users, stats, saveUser: persistUser, deleteUserById } = useUsersStore();

const currentSection = ref('Usuarios');
const search = ref('');
const modalState = ref(null);

const setSection = (section) => {
  currentSection.value = section;
  search.value = '';
  modalState.value = null;
};

const openNewUser = () => {
  if (currentSection.value !== 'Usuarios') {
    return;
  }

  modalState.value = {
    mode: 'create',
    user: createBlankUser(),
  };
};

const openUser = (user) => {
  modalState.value = {
    mode: 'view',
    user: { ...user },
  };
};

const openEditUser = (user) => {
  modalState.value = {
    mode: 'edit',
    user: { ...user },
  };
};

const closeModal = () => {
  modalState.value = null;
};

const saveUser = (payload) => {
  persistUser(payload, modalState.value?.mode ?? 'edit');
  closeModal();
};

const deleteUser = (user) => {
  const confirmed = window.confirm(
    `¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`,
  );

  if (!confirmed) {
    return;
  }

  deleteUserById(user.id);
  closeModal();
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
