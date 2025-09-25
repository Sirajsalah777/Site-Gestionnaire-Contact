<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';
import type { Contact } from './types';
import { fetchContacts } from './services/api';

const isLoading = ref(false);
const editingContact = ref<Contact | null>(null);
const isEditing = ref(false);
const showForm = ref(true);

const handleEdit = (contact: Contact) => {
  editingContact.value = { ...contact };
  isEditing.value = true;
  showForm.value = true;
  // Scroll to the form
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSave = async () => {
  await refreshContacts();
  resetForm();
};

const handleCancel = () => {
  resetForm();
};

const resetForm = () => {
  editingContact.value = null;
  isEditing.value = false;
};

const refreshContacts = async () => {
  isLoading.value = true;
  try {
    await fetchContacts();
  } catch (error) {
    console.error('Error refreshing contacts:', error);
  } finally {
    isLoading.value = false;
  }
};

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (showForm.value && isEditing.value) {
    resetForm();
  }
};

onMounted(refreshContacts);
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Contact Manager</h1>
      <button class="toggle-form-btn" @click="toggleForm">
        {{ showForm ? 'Hide Form' : 'Add Contact' }}
      </button>
    </header>
    
    <main class="app-content">
      <transition name="slide">
        <div v-if="showForm" class="form-section">
          <ContactForm
            :contact="editingContact"
            :isEditing="isEditing"
            @save="handleSave"
            @cancel="handleCancel"
          />
        </div>
      </transition>
      
      <div class="list-section">
        <ContactList
          @edit="handleEdit"
          @refresh="refreshContacts"
        />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>Contact Manager &copy; 2025</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #3B82F6;
  --primary-hover: #2563EB;
  --success-color: #10B981;
  --warning-color: #F59E0B;
  --error-color: #EF4444;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--gray-50);
  color: var(--gray-800);
  line-height: 1.5;
}

#app {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.toggle-form-btn {
  background-color: white;
  color: var(--primary-color);
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.toggle-form-btn:hover {
  background-color: var(--gray-100);
  transform: translateY(-1px);
}

.toggle-form-btn:active {
  transform: translateY(0);
}

.app-content {
  flex: 1;
  padding: 24px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.form-section {
  margin-bottom: 24px;
}

.app-footer {
  background-color: var(--gray-800);
  color: var(--gray-300);
  padding: 16px;
  text-align: center;
  font-size: 14px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  max-height: 800px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 640px) {
  .app-header {
    padding: 16px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .app-content {
    padding: 16px;
  }
}
</style>