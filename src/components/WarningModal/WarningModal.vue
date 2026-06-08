<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-icon">⚠️</div>
      <h3>Внимание! Предварительный расчёт</h3>
      <p class="modal-text">
        Расчет является предварительным и выполнен на основании фотографий и предоставленных данных.
        Окончательная оценка изделия определяется специалистом после очного осмотра в подразделении
        компании.
      </p>
      <button class="modal-btn" :class="{ ready: isReady }" @click="confirm" :disabled="!isReady">
        {{ isReady ? 'Показать результат' : 'Идёт анализ...' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean
  isReady: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const confirm = (): void => {
  if (props.isReady) {
    emit('confirm')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.modal-container h3 {
  font-size: 24px;
  color: #8b1a1a;
  margin-bottom: 15px;
  font-weight: 700;
}

.modal-text {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
}

.modal-btn {
  background: #d3d3d3;
  color: #666;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-btn.ready {
  background: #8b1a1a;
  color: white;
}

.modal-btn.ready:hover {
  background: #6b1414;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.3);
}

.modal-btn.ready:active {
  transform: translateY(0);
}

.modal-btn:disabled {
  cursor: not-allowed;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
