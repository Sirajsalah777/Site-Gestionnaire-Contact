<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}

interface Emits {
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleCancel();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div class="dialog-overlay" @click="handleCancel">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="dialog-body">
        <p>{{ message }}</p>
      </div>
      <div class="dialog-footer">
        <button class="cancel-btn" @click="handleCancel">
          {{ cancelLabel }}
        </button>
        <button class="confirm-btn" @click="handleConfirm">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.2s ease-out;
}

.dialog-container {
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideIn 0.2s ease-out;
}

.dialog-header {
  padding: 16px 24px;
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
}

.dialog-header h3 {
  margin: 0;
  color: #1F2937;
  font-size: 18px;
}

.dialog-body {
  padding: 24px;
  color: #4B5563;
  font-size: 16px;
}

.dialog-body p {
  margin: 0;
}

.dialog-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #E5E7EB;
}

button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #F3F4F6;
  color: #4B5563;
  border: 1px solid #D1D5DB;
}

.cancel-btn:hover {
  background-color: #E5E7EB;
}

.confirm-btn {
  background-color: #EF4444;
  color: white;
  border: none;
}

.confirm-btn:hover {
  background-color: #DC2626;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>