<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContactItem from './ContactItem.vue';
import { fetchContacts, deleteContact } from '../services/api';
import type { Contact } from '../types';
import ConfirmDialog from './ConfirmDialog.vue';

interface Emits {
  (e: 'edit', contact: Contact): void;
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();
const contacts = ref<Contact[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const showConfirmDialog = ref(false);
const contactToDelete = ref<Contact | null>(null);

const loadContacts = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await fetchContacts();
    contacts.value = response.data;
  } catch (err) {
    error.value = 'Failed to load contacts. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleEdit = (contact: Contact) => {
  emit('edit', contact);
};

const handleDelete = (contact: Contact) => {
  contactToDelete.value = contact;
  showConfirmDialog.value = true;
};

const confirmDelete = async () => {
  if (!contactToDelete.value || !contactToDelete.value.id) return;
  
  isLoading.value = true;
  
  try {
    await deleteContact(contactToDelete.value.id);
    await loadContacts();
    emit('refresh');
  } catch (err) {
    error.value = 'Failed to delete contact. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
    showConfirmDialog.value = false;
    contactToDelete.value = null;
  }
};

const cancelDelete = () => {
  showConfirmDialog.value = false;
  contactToDelete.value = null;
};

onMounted(loadContacts);
</script>

<template>
  <div class="contacts-container">
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading contacts...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadContacts" class="retry-btn">Retry</button>
    </div>
    
    <div v-else-if="contacts.length === 0" class="empty-state">
      <p>No contacts found. Add your first contact using the form above.</p>
    </div>
    
    <transition-group 
      name="contact-list" 
      tag="div" 
      class="contacts-list"
      v-else
    >
      <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </transition-group>
    
    <ConfirmDialog
      v-if="showConfirmDialog"
      :title="'Delete Contact'"
      :message="`Are you sure you want to delete ${contactToDelete?.name}? This action cannot be undone.`"
      :confirm-label="'Delete'"
      :cancel-label="'Cancel'"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.contacts-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 8px;
  margin: 16px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.3);
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  background-color: #FEF2F2;
  color: #B91C1C;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background-color: #2563EB;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-list-enter-active,
.contact-list-leave-active {
  transition: all 0.3s ease;
}

.contact-list-enter-from,
.contact-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .contacts-container {
    padding: 0 16px;
  }
}
</style>