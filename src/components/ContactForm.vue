<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { Contact } from '../types';
import { createContact, updateContact } from '../services/api';

interface Props {
  contact?: Contact | null;
  isEditing?: boolean;
}

interface Emits {
  (e: 'save', contact: Contact): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  contact: null,
  isEditing: false
});

const emit = defineEmits<Emits>();

const initialFormState = {
  name: '',
  email: '',
  phone: ''
};

const form = reactive<Contact>({ ...initialFormState });
const errors = reactive({
  name: '',
  email: '',
  phone: ''
});
const isSubmitting = ref(false);
const serverError = ref('');

// Update form when contact prop changes
watch(() => props.contact, (newContact) => {
  if (newContact) {
    Object.assign(form, { ...newContact });
  } else {
    Object.assign(form, { ...initialFormState });
  }
  // Clear errors when form changes
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  serverError.value = '';
}, { immediate: true });

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset errors
  errors.name = '';
  errors.email = '';
  errors.phone = '';
  
  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }
  
  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate phone
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  serverError.value = '';
  
  try {
    let response;
    
    if (props.isEditing && props.contact?.id) {
      // Update existing contact
      response = await updateContact({ ...form, id: props.contact.id });
    } else {
      // Create new contact
      response = await createContact(form);
    }
    
    emit('save', response.data);
    resetForm();
  } catch (error) {
    console.error('Error saving contact:', error);
    serverError.value = 'Failed to save contact. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(form, { ...initialFormState });
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  serverError.value = '';
};

const handleCancel = () => {
  resetForm();
  emit('cancel');
};
</script>

<template>
  <div class="contact-form-container">
    <h2 class="form-title">{{ isEditing ? 'Edit Contact' : 'Add New Contact' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Enter full name"
          :class="{ 'has-error': errors.name }"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email address"
          :class="{ 'has-error': errors.email }"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="Enter phone number"
          :class="{ 'has-error': errors.phone }"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>
      
      <div v-if="serverError" class="server-error">
        {{ serverError }}
      </div>
      
      <div class="form-actions">
        <button 
          type="button" 
          class="cancel-btn" 
          @click="handleCancel"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="save-btn" 
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="button-spinner"></span>
          <span v-else>{{ isEditing ? 'Update' : 'Save' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-form-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.form-title {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 20px;
  color: #1F2937;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
}

input {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

input.has-error {
  border-color: #EF4444;
}

.error-message {
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
}

.server-error {
  padding: 12px;
  background-color: #FEF2F2;
  border-radius: 6px;
  color: #B91C1C;
  font-size: 14px;
  text-align: center;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.cancel-btn {
  background-color: #F3F4F6;
  color: #4B5563;
  border: 1px solid #D1D5DB;
}

.cancel-btn:hover {
  background-color: #E5E7EB;
}

.save-btn {
  background-color: #3B82F6;
  color: white;
  border: none;
}

.save-btn:hover {
  background-color: #2563EB;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .contact-form-container {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>