<template>
  <div id="app">
    <Header />

    <div class="main-content">
      <EstimationForm />
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import './assets/reset.css'
import EstimationForm from '@/components/EstimationForm/EstimationForm.vue'
import Footer from '@/components/Footer/Footer.vue'
import Header from '@/components/Header/Header.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: white;
}
</style>
