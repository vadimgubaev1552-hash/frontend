<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <div class="logo-icon">⭐</div>
        <div class="logo-text">
          <h1>ООО ЗолотоДорого</h1>
          <p>Не состоит в государственном реестре ломбардов</p>
        </div>
      </div>

      <div class="contact-info">
        <div class="phone">
          <span class="phone-icon">📞</span>
          <span>8 (800) 535-55-55</span>
        </div>
        <button class="callback-btn">Заказать звонок</button>
      </div>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['callback'])

const requestCallback = () => {
  emit('callback')
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #f0e0e0;
  box-shadow: 0 2px 10px rgba(139, 26, 26, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  font-size: 32px;
  color: #8B1A1A;
}

.logo-text h1 {
  color: #8B1A1A;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.logo-text p {
  color: #666;
  font-size: 16px;
  margin-top: 4px;
}

.contact-info {
  text-align: right;
}

.phone {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.phone-icon {
  font-size: 20px;
}

.callback-btn {
  background: #8B1A1A;
  color: white;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.callback-btn:hover {
  background: #6B1414;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 26, 26, 0.3);
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    text-align: center;
  }

  .contact-info {
    text-align: center;
  }

  .phone {
    justify-content: center;
  }
}
</style>
