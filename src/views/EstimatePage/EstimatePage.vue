<template>
  <div class="estimate-page">
    <Header />

    <main class="main">
      <div class="container">
        <router-link to="/" class="back-link"> ← На главную </router-link>

        <EstimationForm />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import EstimationForm from '@/components/EstimationForm/EstimationForm.vue'
</script>

<style scoped>
.estimate-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 40px 20px;
  background: #fdf9f9;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #8b1a1a;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #6b1414;
  text-decoration: underline;
}
</style>
