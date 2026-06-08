<template>
  <div class="home-page">
    <Header />

    <main class="main">
      <section class="hero">
        <div class="hero-content">
          <h1>Оцените золото онлайн за 2 минуты</h1>
          <p>Получите предварительную сумму займа и выкупа без визита в офис</p>
          <router-link to="/estimate" class="hero-btn"> Перейти к оценке → </router-link>
        </div>
      </section>

      <section class="how-it-works">
        <div class="container">
          <h2>Как это работает</h2>
          <div class="steps">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-icon">📸</div>
              <h3>Загрузите фото</h3>
              <p>Сделайте 3-5 качественных фото изделия</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-icon">🤖</div>
              <h3>ИИ-анализ</h3>
              <p>Искусственный интеллект оценит состояние</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-icon">💰</div>
              <h3>Получите деньги</h3>
              <p>Посетите подразделение или закажите звонок</p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsCarousel />

      <section class="faq">
        <div class="container">
          <h2>Частые вопросы</h2>
          <div class="faq-list">
            <div class="faq-item">
              <button class="faq-question" @click="toggleFaq(0)">
                <span>Как долго длится оценка?</span>
                <span class="faq-icon">{{ openFaqs[0] ? '−' : '+' }}</span>
              </button>
              <div v-show="openFaqs[0]" class="faq-answer">
                Предварительная оценка занимает 2-3 минуты. Окончательная оценка специалистом — 5-10
                минут при очном визите.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" @click="toggleFaq(1)">
                <span>Что если не согласен с предварительной суммой?</span>
                <span class="faq-icon">{{ openFaqs[1] ? '−' : '+' }}</span>
              </button>
              <div v-show="openFaqs[1]" class="faq-answer">
                Предварительная оценка является ознакомительной. Окончательная сумма определяется
                специалистом после осмотра.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" @click="toggleFaq(2)">
                <span>Нужно ли платить за оценку?</span>
                <span class="faq-icon">{{ openFaqs[2] ? '−' : '+' }}</span>
              </button>
              <div v-show="openFaqs[2]" class="faq-answer">
                Нет, оценка абсолютно бесплатна как онлайн, так и в подразделениях компании.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import ReviewsCarousel from '@/components/ReviewsCarousel/ReviewsCarousel.vue'

const openFaqs = ref([false, false, false])

const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

.hero {
  background: linear-gradient(135deg, #8b1a1a 0%, #6b1414 100%);
  color: white;
  text-align: center;
  padding: 80px 20px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.hero-btn {
  display: inline-block;
  background: white;
  color: #8b1a1a;
  padding: 14px 32px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.how-it-works {
  padding: 60px 20px;
  background: #fdf9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.how-it-works h2 {
  text-align: center;
  font-size: 32px;
  color: #8b1a1a;
  margin-bottom: 40px;
}

.steps {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.step-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 4px 20px rgba(139, 26, 26, 0.08);
  transition: transform 0.3s;
  position: relative;
}

.step-card:hover {
  transform: translateY(-5px);
}

.step-number {
  position: absolute;
  top: -12px;
  left: 20px;
  background: #8b1a1a;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.step-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.step-card h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.step-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.faq {
  padding: 60px 20px;
  background: white;
}

.faq h2 {
  text-align: center;
  font-size: 32px;
  color: #8b1a1a;
  margin-bottom: 40px;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e0d0d0;
  margin-bottom: 15px;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  text-align: left;
}

.faq-question:hover {
  color: #8b1a1a;
}

.faq-icon {
  font-size: 24px;
  color: #8b1a1a;
}

.faq-answer {
  padding: 0 0 20px 0;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .steps {
    flex-direction: column;
    align-items: center;
  }

  .step-card {
    max-width: 300px;
  }
}
</style>
