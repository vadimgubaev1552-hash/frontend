<template>
  <div class="reviews-section">
    <div class="container">
      <h2>Отзывы клиентов</h2>

      <div class="carousel-container">
        <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
          ←
        </button>

        <div class="carousel-track">
          <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="review in reviews" :key="review.id" class="review-card">
              <div class="stars">
                <span v-for="star in 5" :key="star" class="star">
                  {{ star <= review.rating ? '★' : '☆' }}
                </span>
              </div>
              <p class="review-text">"{{ review.text }}"</p>
              <div class="review-author">
                <strong>{{ review.name }}</strong>
                <span>{{ review.city }}</span>
              </div>
              <div class="review-date">{{ formatDate(review.date) }}</div>
            </div>
          </div>
        </div>

        <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex === maxIndex">
          →
        </button>
      </div>

      <div class="dots">
        <button
          v-for="(_, idx) in reviews"
          :key="idx"
          class="dot"
          :class="{ active: currentIndex === idx }"
          @click="currentIndex = idx"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import dataReview from '@/public/reviews.json'
interface Review {
  id: number
  name: string
  city: string
  text: string
  rating: number
  date: string
}

const reviews = ref<Review[]>([])
const currentIndex = ref(0)
const autoPlayInterval = ref<ReturnType<typeof setInterval> | null>(null)

const maxIndex = computed(() => reviews.value.length - 1)

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = maxIndex.value
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

onMounted(async () => {
  try {
    reviews.value = dataReview
    startAutoPlay()
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error)
  }
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.reviews-section {
  padding: 60px 20px;
  background: #fefafa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.reviews-section h2 {
  text-align: center;
  font-size: 32px;
  color: #8b1a1a;
  margin-bottom: 40px;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
}

.carousel-track {
  flex: 1;
  overflow: hidden;
  border-radius: 16px;
}

.carousel-slide {
  display: flex;
  transition: transform 0.5s ease;
}

.review-card {
  flex: 0 0 100%;
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(139, 26, 26, 0.08);
}

.stars {
  margin-bottom: 15px;
}

.star {
  font-size: 20px;
  color: #ffc107;
  margin: 0 2px;
}

.review-text {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}

.review-author {
  margin-bottom: 8px;
}

.review-author strong {
  color: #8b1a1a;
  font-size: 16px;
}

.review-author span {
  color: #666;
  font-size: 14px;
  margin-left: 8px;
}

.review-date {
  color: #999;
  font-size: 12px;
}

.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #8b1a1a;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover:not(:disabled) {
  background: #6b1414;
  transform: scale(1.05);
}

.carousel-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #8b1a1a;
  width: 24px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .review-text {
    font-size: 14px;
  }
}
</style>
