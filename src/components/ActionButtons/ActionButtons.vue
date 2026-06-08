<template>
  <div class="action-buttons">
    <button class="action-btn branch-btn" @click="selectBranch">🏢 Выбрать подразделение</button>
    <button class="action-btn callback-btn" @click="orderCallback">
      📞 Заказать обратный звонок
    </button>

    <div v-if="showBranchModal" class="modal-overlay" @click.self="closeBranchModal">
      <div class="modal-container branch-modal">
        <h3>Выберите подразделение</h3>
        <div class="branches-list">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="branch-item"
            :class="{ selected: selectedBranch?.id === branch.id }"
            @click="selectBranchItem(branch)"
          >
            <div class="branch-name">{{ branch.name }}</div>
            <div class="branch-address">{{ branch.address }}</div>
            <div class="branch-phone">📞 {{ branch.phone }}</div>
          </div>
        </div>

        <button class="visit-btn" :disabled="!selectedBranch" @click="showBranchForm">
          Посетить это подразделение
        </button>
        <button class="close-btn" @click="closeBranchModal">Отмена</button>
      </div>
    </div>

    <div v-if="showContactForm" class="modal-overlay" @click.self="closeContactForm">
      <div class="modal-container contact-form">
        <h3>{{ contactFormTitle }}</h3>
        <div class="form-group">
          <label>ФИО *</label>
          <input type="text" v-model="contactData.fio" placeholder="Иванов Иван Иванович" />
        </div>
        <div class="form-group">
          <label>Номер телефона *</label>
          <input type="tel" v-model="contactData.phone" placeholder="+7 (999) 123-45-67" />
        </div>
        <button class="submit-contact-btn" @click="submitContact">Отправить</button>
        <button class="close-btn" @click="closeContactForm">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Branch {
  id: number
  name: string
  address: string
  phone: string
}

interface ContactData {
  fio: string
  phone: string
}

interface DealData {
  fio: string
  phone: string
  branch: Branch | null
  type: 'callback' | 'visit'
}

const emit = defineEmits<{
  (e: 'createDeal', data: DealData): void
}>()

const showBranchModal = ref(false)
const showContactForm = ref(false)
const selectedBranch = ref<Branch | null>(null)
const contactFormTitle = ref('')
const contactData = ref<ContactData>({
  fio: '',
  phone: '',
})

const branches = ref<Branch[]>([
  {
    id: 1,
    name: 'Головной офис',
    address: 'г. Уфа, ул. Ленина, д. 50',
    phone: '+7 (347) 222-33-44',
  },
  {
    id: 2,
    name: 'Подразделение "Северный"',
    address: 'г. Уфа, ул. Победы, д. 15',
    phone: '+7 (347) 333-44-55',
  },
  {
    id: 3,
    name: 'Подразделение "Южный"',
    address: 'г. Уфа, ул. Салавата, д. 78',
    phone: '+7 (347) 444-55-66',
  },
  {
    id: 4,
    name: 'Подразделение "Западный"',
    address: 'г. Уфа, пр. Октября, д. 120',
    phone: '+7 (347) 555-66-77',
  },
])

const selectBranch = (): void => {
  showBranchModal.value = true
}

const orderCallback = (): void => {
  contactFormTitle.value = 'Заказать обратный звонок'
  showContactForm.value = true
}

const selectBranchItem = (branch: Branch): void => {
  selectedBranch.value = branch
}

const showBranchForm = (): void => {
  if (!selectedBranch.value) return
  const branch = selectedBranch.value
  closeBranchModal()
  contactFormTitle.value = `Посетить подразделение: ${branch.name}`
  showContactForm.value = true
}

const submitContact = (): void => {
  if (!contactData.value.fio || !contactData.value.phone) {
    alert('Пожалуйста, заполните ФИО и номер телефона')
    return
  }

  emit('createDeal', {
    fio: contactData.value.fio,
    phone: contactData.value.phone,
    branch: selectedBranch.value,
    type: contactFormTitle.value.includes('звонок') ? 'callback' : 'visit',
  })

  contactData.value = { fio: '', phone: '' }
  selectedBranch.value = null
  closeContactForm()
  alert('Заявка отправлена! Специалист свяжется с вами в ближайшее время.')
}

const closeBranchModal = (): void => {
  showBranchModal.value = false
  selectedBranch.value = null
}

const closeContactForm = (): void => {
  showContactForm.value = false
  contactData.value = { fio: '', phone: '' }
  selectedBranch.value = null
}
</script>

<style scoped>
.action-buttons {
  max-width: 700px;
  margin: 20px auto 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 200px;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.branch-btn {
  background: white;
  color: #8b1a1a;
  border: 2px solid #8b1a1a;
}

.branch-btn:hover {
  background: #8b1a1a;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.3);
}

.callback-btn {
  background: #8b1a1a;
  color: white;
}

.callback-btn:hover {
  background: #6b1414;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.3);
}

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
}

.modal-container {
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.branch-modal h3,
.contact-form h3 {
  color: #8b1a1a;
  margin-bottom: 20px;
  font-size: 22px;
}

.branches-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.branch-item {
  padding: 15px;
  border: 2px solid #e0d0d0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.branch-item:hover {
  border-color: #8b1a1a;
  background: #fef5f5;
}

.branch-item.selected {
  border-color: #8b1a1a;
  background: #fef5f5;
  box-shadow: 0 2px 8px rgba(139, 26, 26, 0.2);
}

.branch-name {
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.branch-address {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.branch-phone {
  font-size: 13px;
  color: #8b1a1a;
}

.visit-btn,
.submit-contact-btn {
  width: 100%;
  padding: 12px;
  background: #8b1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
}

.visit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.close-btn {
  width: 100%;
  padding: 10px;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0d0d0;
  border-radius: 8px;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #8b1a1a;
}
</style>
