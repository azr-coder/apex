<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const isHome = computed(() => route.path === '/')

function handleScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div class="blog-app">
    <header :class="['blog-header', { scrolled, 'transparent': isHome && !scrolled }]">
      <div class="header-inner">
        <div class="brand" @click="router.push('/')">
          <span class="brand-icon">⛊</span>
          <span class="brand-text">
            安章瑞<span class="brand-accent">·APEX</span>
          </span>
        </div>

        <nav class="desktop-nav">
          <router-link to="/" class="nav-link" active-class="active" exact>首页</router-link>
          <router-link to="/?category=basics" class="nav-link">基础入门</router-link>
          <router-link to="/?category=aim" class="nav-link">枪法进阶</router-link>
          <router-link to="/?category=movement" class="nav-link">身法秘籍</router-link>
          <router-link to="/?category=tactics" class="nav-link">战术意识</router-link>
          <router-link to="/about" class="nav-link" active-class="active">关于我</router-link>
        </nav>

        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span :class="{ bar: true, open: mobileMenuOpen }"></span>
          <span :class="{ bar: true, open: mobileMenuOpen }"></span>
          <span :class="{ bar: true, open: mobileMenuOpen }"></span>
        </button>
      </div>

      <Transition name="slide">
        <nav v-if="mobileMenuOpen" class="mobile-nav">
          <router-link to="/" @click="mobileMenuOpen = false">首页</router-link>
          <router-link to="/?category=basics" @click="mobileMenuOpen = false">基础入门</router-link>
          <router-link to="/?category=aim" @click="mobileMenuOpen = false">枪法进阶</router-link>
          <router-link to="/?category=movement" @click="mobileMenuOpen = false">身法秘籍</router-link>
          <router-link to="/?category=tactics" @click="mobileMenuOpen = false">战术意识</router-link>
          <router-link to="/about" @click="mobileMenuOpen = false">关于我</router-link>
        </nav>
      </Transition>
    </header>

    <main class="blog-main">
      <router-view />
    </main>

    <footer class="blog-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-icon">⛊</span>
          <span>安章瑞的APEX大师之路</span>
        </div>
        <div class="footer-links">
          <a href="#">Bilibili</a>
          <a href="#">Douyu</a>
          <a href="#">GitHub</a>
        </div>
        <p class="footer-copy">© 2026 安章瑞 | 成为APEX大师的路上，你我同行</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.blog-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
  color: #e0e0e0;
}

.blog-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0 24px;
  height: 64px;
}

.blog-header.transparent {
  background: transparent;
}

.blog-header.scrolled {
  background: rgba(10, 10, 15, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 94, 26, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.brand-icon {
  font-size: 28px;
  color: #FF5E1A;
  filter: drop-shadow(0 0 8px rgba(255, 94, 26, 0.5));
}

.brand-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
}

.brand-accent {
  color: #FF5E1A;
}

.desktop-nav {
  display: flex;
  gap: 4px;
}

.nav-link {
  color: #aaa;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 94, 26, 0.1);
}

.nav-link.active {
  color: #FF5E1A;
  background: rgba(255, 94, 26, 0.12);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  gap: 5px;
  z-index: 1001;
}

.bar {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  transition: all 0.3s;
}

.bar.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.bar.open:nth-child(2) {
  opacity: 0;
}

.bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-nav {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.97);
  backdrop-filter: blur(16px);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid rgba(255, 94, 26, 0.2);
}

.mobile-nav a {
  color: #ccc;
  text-decoration: none;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
}

.mobile-nav a:hover {
  color: #FF5E1A;
  background: rgba(255, 94, 26, 0.08);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.blog-main {
  flex: 1;
  margin-top: 0;
}

.blog-footer {
  border-top: 1px solid rgba(255, 94, 26, 0.1);
  background: rgba(10, 10, 15, 0.8);
  padding: 40px 24px 24px;
  margin-top: auto;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ccc;
  margin-bottom: 16px;
}

.footer-brand .brand-icon {
  font-size: 22px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-links a {
  color: #888;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #FF5E1A;
}

.footer-copy {
  color: #555;
  font-size: 12px;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-toggle {
    display: flex;
  }
}
</style>
