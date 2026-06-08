<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-box">
        <div class="footer-col">
          <div class="footer-info">
          <a href="https://cbr.ru/Reception/" >Ссылка на страницу интернет-приемной Банка России.</a>
          <a href="https://cbr.ru/Reception/" >Информация о праве потребителей финансовых услуг направить обращение финансовому уполномоченному.</a>
          </div>
        </div>


        <div class="footer-col">
          <h3>Контакты</h3>
          <ul class="contacts-list">
            <li>📞 8 (800) 535-55-55</li>
            <li>✉ info@zolotodorogo.ru</li>
            <li>📍 г. Уфа, ул. Примерная, д. 123</li>
          </ul>
          <div class="social-links">
            <a href="#" class="social">📘</a>
            <a href="#" class="social">📷</a>
            <a href="#" class="social">▶</a>
            <a href="#" class="social">💬</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="legal-info">
          <p>© 2026 ООО ЗолотоДорого. Все права защищены.</p>
          <p class="warning-text">
            Расчет является предварительным и выполнен на основании фотографий и предоставленных данных.
            Окончательная оценка изделия определяется специалистом после очного осмотра в подразделении компании.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #ccc;
  margin-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 30px 20px;
}

.footer-box {
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-col h3 {
  color: #8B1A1A;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
}

.footer-col h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: #8B1A1A;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 10px;
}

.footer-col ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-col ul li a:hover {
  color: #8B1A1A;
}
.footer-info {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.contacts-list li {
  margin-bottom: 12px;
  color: #ccc;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social {
  width: 36px;
  height: 36px;
  background: #333;
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 18px;
}

.social:hover {
  background: #8B1A1A;
  color: white;
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 20px;
  text-align: center;
}

.legal-info p {
  font-size: 12px;
  margin-bottom: 10px;
  color: #888;
}

.warning-text {
  font-size: 11px;
  color: #666;
  max-width: 800px;
  margin: 10px auto 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .footer-col h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }
}
</style>
