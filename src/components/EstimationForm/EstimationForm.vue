<template>
  <div class="form-container">
    <div class="form-header">
      <h2>Оценка изделия</h2>
      <p>Заполните форму и загрузите фото для предварительного расчета</p>
    </div>

    <div class="form-content">
      <div class="form-group">
        <label>Тип изделия</label>
        <select v-model="formData.type">
          <option value="">Выберите тип</option>
          <option value="Кольцо">Кольцо</option>
          <option value="Серьги">Серьги</option>
          <option value="Браслет">Браслет</option>
          <option value="Кулон">Кулон</option>
          <option value="Цепь">Цепь</option>
          <option value="Колье">Колье</option>
        </select>
      </div>

      <div class="form-group">
        <label>Проба металла</label>
        <select v-model="formData.purity">
          <option value="">Выберите пробу</option>
          <option value="375">375</option>
          <option value="585">585</option>
          <option value="750">750</option>
        </select>
      </div>

      <div class="form-group">
        <label>Наличие вставок</label>
        <div class="radio-group">
          <label class="radio-label"
            ><input type="radio" value="Да" v-model="formData.hasStones" /> Да</label
          >
          <label class="radio-label"
            ><input type="radio" value="Нет" v-model="formData.hasStones" /> Нет</label
          >
        </div>
      </div>

      <div class="form-group">
        <label>Состояние изделия</label>
        <select v-model="formData.condition">
          <option value="">Выберите состояние</option>
          <option value="Как новое">Как новое</option>
          <option value="Среднее">Среднее</option>
          <option value="Плохое">Плохое</option>
        </select>
      </div>

      <div class="form-group">
        <label>Вес (грамм) <span class="optional">— необязательно</span></label>
        <input type="number" step="0.01" v-model="formData.weight" placeholder="Например: 5.2" />
      </div>

      <div class="form-group">
        <label>Фотографии изделия (макс. 5)</label>
        <div class="upload-area" @click="$refs.fileInput.click()">
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileUpload"
            ref="fileInput"
            style="display: none"
          />
          <div class="upload-placeholder">
            <span class="upload-icon">📸</span>
            <p>Нажмите для загрузки фото</p>
            <small>Поддерживаются JPG, PNG (до 5 шт.)</small>
          </div>
        </div>
        <div class="preview-container">
          <div v-for="(preview, index) in previews" :key="index" class="preview">
            <img :src="preview" alt="preview" />
            <button class="remove-btn" @click.stop="removeImage(index)">×</button>
          </div>
        </div>
        <div class="file-counter">{{ previews.length }}/5 фото</div>
      </div>

      <button class="submit-btn" @click="submitForm">Отправить заявку</button>
    </div>

    <ResultPanel :result="analysisResult" />
    <ActionButtons @createDeal="handleCreateDeal" v-if="analysisResult" />
    <WarningModal :visible="showModal" :isReady="analysisReady" @confirm="showResult" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import WarningModal from '@/components/WarningModal/WarningModal.vue'
import ResultPanel from '@/components/ResultPanel/ResultPanel.vue'
import ActionButtons from '@/components/ActionButtons/ActionButtons.vue'

const formData = reactive({
  type: '',
  purity: '',
  hasStones: '',
  condition: '',
  weight: '',
})

const previews = ref([])
const files = ref([])
const fileInput = ref(null)

const showModal = ref(false)
const analysisReady = ref(false)
const analysisResult = ref(null)

const handleFileUpload = (event) => {
  const selectedFiles = Array.from(event.target.files)
  const totalFiles = previews.value.length + selectedFiles.length

  if (totalFiles > 5) {
    alert('Максимум 5 фотографий')
    return
  }

  selectedFiles.forEach((file) => {
    files.value.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previews.value.splice(index, 1)
  files.value.splice(index, 1)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const submitForm = async () => {
  if (!formData.type || !formData.purity || !formData.hasStones || !formData.condition) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  if (files.value.length === 0) {
    alert('Пожалуйста, загрузите хотя бы одно фото')
    return
  }

  showModal.value = true
  analysisReady.value = false

  const imagesBase64 = []
  for (const file of files.value) {
    const base64 = await fileToBase64(file)
    imagesBase64.push(base64)
  }

  try {
    const response = await fetch('http://localhost:8000/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'analyze',
        formData: formData,
        images: imagesBase64,
      }),
    })

    const data = await response.json()

    if (data.success) {
      analysisResult.value = data.result
      analysisReady.value = true
    } else {
      throw new Error(data.error || 'Ошибка при анализе')
    }
  } catch (error) {
    alert('Ошибка при соединении с сервером: ' + error.message)
    showModal.value = false
  }
}

const showResult = () => {
  showModal.value = false
}
const handleCreateDeal = async (dealData: any): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createDeal',
        clientData: {
          fio: dealData.fio,
          phone: dealData.phone,
        },
        calculationResult: analysisResult.value,
        images: previews.value,
      }),
    })

    const data = await response.json()

    if (data.success) {
    } else {
      throw new Error(data.error || 'Ошибка создания сделки')
    }
  } catch (error) {}
}
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(139, 26, 26, 0.1);
  overflow: hidden;
}

.form-header {
  background: #8b1a1a;
  color: white;
  padding: 30px;
  text-align: center;
}

.form-header h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.form-header p {
  margin: 0;
  opacity: 0.9;
}

.form-content {
  padding: 30px;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.optional {
  font-weight: normal;
  font-size: 12px;
  color: #999;
}

select,
input[type='number'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0d0d0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  background: #fefafa;
}

select:focus,
input:focus {
  outline: none;
  border-color: #8b1a1a;
  background: white;
  box-shadow: 0 0 0 2px rgba(139, 26, 26, 0.1);
}

.radio-group {
  display: flex;
  gap: 30px;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
  color: #333;
}

.radio-label input {
  cursor: pointer;
  accent-color: #8b1a1a;
}

.upload-area {
  border: 2px dashed #e0d0d0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #fefafa;
}

.upload-area:hover {
  border-color: #8b1a1a;
  background: #fef5f5;
}

.upload-placeholder {
  color: #666;
}

.upload-icon {
  font-size: 48px;
}

.upload-placeholder p {
  margin: 10px 0;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.preview {
  position: relative;
  width: 80px;
  height: 80px;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #f0e0e0;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #8b1a1a;
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.remove-btn:hover {
  background: #6b1414;
}

.file-counter {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #8b1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #6b1414;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>
