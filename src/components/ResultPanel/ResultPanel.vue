<template>
  <div v-if="result" class="result-panel">
    <div class="result-header">
      <h3>📊 Результат предварительной оценки</h3>
      <div class="warning-badge">⚠️ Расчет является предварительным</div>
    </div>

    <div class="result-content">
      <div class="result-grid">
        <div class="result-card">
          <div class="result-label">💰 Предварительная сумма займа</div>
          <div class="result-value">{{ formatNumber(result.loanAmount) }} ₽</div>
        </div>

        <div class="result-card">
          <div class="result-label">💵 Предварительная сумма выкупа</div>
          <div class="result-value">{{ formatNumber(result.buyoutAmount) }} ₽</div>
        </div>

        <div class="result-card">
          <div class="result-label">📈 Вероятность принятия</div>
          <div class="result-value probability" :class="probabilityClass">
            {{ result.probability }}
          </div>
        </div>
      </div>

      <div class="result-details">
        <div class="detail-row">
          <span class="detail-label">Тип изделия:</span>
          <span class="detail-value">{{ result.type }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Наличие вставок:</span>
          <span class="detail-value">{{ result.hasStones }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Состояние:</span>
          <span class="detail-value">{{ result.condition }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Выявленные дефекты:</span>
          <span class="detail-value">{{ result.defects }}</span>
        </div>
      </div>

      <div class="result-warning">
        ⚠️ Окончательная оценка изделия определяется специалистом после очного осмотра в
        подразделении компании.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface AnalysisResult {
  loanAmount: number
  buyoutAmount: number
  probability: string
  defects: string
  type: string
  hasStones: string
  condition: string
}

interface Props {
  result: AnalysisResult | null
}

const props = defineProps<Props>()

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num)
}

const probabilityClass = computed(() => {
  if (!props.result) return ''
  const prob = props.result.probability
  if (prob === 'Высокая') return 'probability-high'
  if (prob === 'Средняя') return 'probability-medium'
  if (prob === 'Низкая') return 'probability-low'
  return ''
})
</script>

<style scoped>
.result-panel {
  max-width: 700px;
  margin: 30px auto 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(139, 26, 26, 0.1);
  overflow: hidden;
  animation: slideUp 0.5s ease;
}

.result-header {
  background: #8b1a1a;
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.result-header h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.warning-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.result-content {
  padding: 30px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.result-card {
  background: #fefafa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #f0e0e0;
}

.result-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.result-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.probability-high {
  color: #2e7d32;
}

.probability-medium {
  color: #ed6c02;
}

.probability-low {
  color: #d32f2f;
}

.result-details {
  background: #f8f3f3;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0d0d0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #555;
}

.detail-value {
  color: #333;
}

.result-warning {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
  padding: 15px;
  border-radius: 8px;
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .result-header {
    flex-direction: column;
    text-align: center;
  }

  .result-value {
    font-size: 22px;
  }

  .detail-row {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
