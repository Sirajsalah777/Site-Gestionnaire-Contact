<script setup lang="ts">
import { computed } from 'vue';
import type { Contact } from '../types';

interface Props {
  contact: Contact;
}

interface Emits {
  (e: 'edit', contact: Contact): void;
  (e: 'delete', contact: Contact): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const editContact = () => {
  emit('edit', props.contact);
};

const deleteContact = () => {
  emit('delete', props.contact);
};

const initials = computed(() => {
  if (!props.contact.name) return '??';
  
  const parts = props.contact.name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});
</script>

<template>
  <div class="contact-card">
    <div class="contact-avatar">
      <span>{{ initials }}</span>
    </div>
    <div class="contact-info">
      <h3>{{ contact.name }}</h3>
      <p>
        <span class="icon">✉️</span>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </p>
      <p>
        <span class="icon">📞</span>
        <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
      </p>
    </div>
    <div class="contact-actions">
      <button 
        class="edit-btn" 
        @click="editContact" 
        title="Edit contact"
      >
        ✏️
      </button>
      <button 
        class="delete-btn" 
        @click="deleteContact" 
        title="Delete contact"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #3B82F6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-right: 16px;
}

.contact-info {
  flex: 1;
}

.contact-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #1F2937;
}

.contact-info p {
  margin: 4px 0;
  display: flex;
  align-items: center;
  color: #4B5563;
  font-size: 14px;
}

.icon {
  margin-right: 8px;
}

.contact-info a {
  color: #3B82F6;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #E5E7EB;
}

.delete-btn:hover {
  background-color: #FEE2E2;
}
</style>