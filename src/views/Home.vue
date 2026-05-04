<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts, categories } from '../data/posts'

const route = useRoute()
const router = useRouter()

const activeCategory = computed(() => (route.query.category as string) || 'all')

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts
  const cat = categories.find(c => c.slug === activeCategory.value)
  if (!cat) return posts
  return posts.filter(p => p.category === cat.name)
})

const featuredPosts = computed(() => posts.filter(p => p.featured))

const difficultyLabel: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
  master: '大师'
}

const difficultyColor: Record<string, string> = {
  beginner: '#4CAF50',
  intermediate: '#2196F3',
  advanced: '#FF9800',
  master: '#FF5E1A'
}

function goToPost(id: string) {
  router.push(`/post/${id}`)
}

function setCategory(slug: string) {
  router.push({ query: slug === 'all' ? {} : { category: slug } })
}
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">APEX LEGENDS MASTERY</div>
        <h1 class="hero-title">
          <span class="hero-name">安章瑞</span>
          <span class="hero-divider">—</span>
          <span class="hero-sub">成为APEX大师的修炼之路</span>
        </h1>
        <p class="hero-desc">
          从枪法到身法，从单排到组队，从青铜到猎杀。<br />
          系统化的APEX攻略体系，助你登顶竞技场。
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">{{ posts.length }}</span>
            <span class="stat-label">深度攻略</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">2000+</span>
            <span class="stat-label">游戏时长(h)</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">猎杀</span>
            <span class="stat-label">最高段位</span>
          </div>
        </div>
      </div>
      <div class="hero-angle"></div>
    </section>

    <section class="category-bar">
      <div class="category-inner">
        <button
          :class="['cat-btn', { active: activeCategory === 'all' }]"
          @click="setCategory('all')"
        >
          全部文章
        </button>
        <button
          v-for="cat in categories"
          :key="cat.slug"
          :class="['cat-btn', { active: activeCategory === cat.slug }]"
          @click="setCategory(cat.slug)"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>
    </section>

    <section v-if="featuredPosts.length && activeCategory === 'all'" class="featured-section">
      <div class="section-container">
        <h2 class="section-title">
          <span class="title-accent">✦</span> 精选推荐
        </h2>
        <div class="featured-grid">
          <article
            v-for="post in featuredPosts"
            :key="post.id"
            class="featured-card"
            @click="goToPost(post.id)"
          >
            <div class="fc-image">
              <span class="fc-emoji">
                {{ post.category === '基础入门' ? '🚀' : post.category === '枪法进阶' ? '🎯' : '🏆' }}
              </span>
              <span class="fc-badge" :style="{ background: difficultyColor[post.difficulty] }">
                {{ difficultyLabel[post.difficulty] }}
              </span>
            </div>
            <div class="fc-body">
              <span class="fc-category">{{ post.category }}</span>
              <h3 class="fc-title">{{ post.title }}</h3>
              <p class="fc-excerpt">{{ post.excerpt }}</p>
              <div class="fc-meta">
                <span>{{ post.date }}</span>
                <span>·</span>
                <span>{{ post.readTime }} 分钟阅读</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="posts-section">
      <div class="section-container">
        <h2 class="section-title">
          <span class="title-accent">⌖</span>
          {{ activeCategory === 'all' ? '全部文章' : categories.find(c => c.slug === activeCategory)?.name || '文章列表' }}
        </h2>
        <div class="posts-grid">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="post-card"
            @click="goToPost(post.id)"
          >
            <div class="pc-top">
              <div class="pc-category-badge" :style="{ background: difficultyColor[post.difficulty] }">
                {{ difficultyLabel[post.difficulty] }}
              </div>
            </div>
            <div class="pc-body">
              <span class="pc-category">{{ post.category }}</span>
              <h3 class="pc-title">{{ post.title }}</h3>
              <p class="pc-excerpt">{{ post.excerpt }}</p>
            </div>
            <div class="pc-footer">
              <div class="pc-tags">
                <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="pc-tag">{{ tag }}</span>
              </div>
              <div class="pc-meta">
                <span>{{ post.date }}</span>
                <span>{{ post.readTime }}分钟</span>
              </div>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="empty-state">
          <p>该分类下暂无文章，敬请期待。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 80px;
}

.hero {
  position: relative;
  min-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(255, 94, 26, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(255, 165, 0, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(0, 180, 255, 0.06) 0%, transparent 40%),
    linear-gradient(180deg, #0d0d1a 0%, #0a0a0f 100%);
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 1;
  padding: 64px 24px;
}

.hero-badge {
  display: inline-block;
  padding: 4px 16px;
  border: 1px solid rgba(255, 94, 26, 0.4);
  border-radius: 3px;
  font-size: 11px;
  letter-spacing: 4px;
  color: #FF5E1A;
  margin-bottom: 24px;
  clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
}

.hero-title {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  margin: 0 0 20px;
  line-height: 1.3;
}

.hero-name {
  color: #FF5E1A;
  text-shadow: 0 0 40px rgba(255, 94, 26, 0.3);
}

.hero-divider {
  color: #444;
  margin: 0 8px;
}

.hero-sub {
  color: #ddd;
}

.hero-desc {
  font-size: 16px;
  color: #999;
  line-height: 1.8;
  margin-bottom: 32px;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 28px;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: #FF5E1A;
  font-family: 'Courier New', monospace;
}

.stat-label {
  font-size: 12px;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.08);
}

.hero-angle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #0a0a0f;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 48px);
}

.category-bar {
  position: sticky;
  top: 64px;
  z-index: 100;
  background: rgba(10, 10, 15, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0 24px;
}

.category-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 10px 0;
}

.cat-btn {
  white-space: nowrap;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: #999;
  transition: all 0.2s;
}

.cat-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.cat-btn.active {
  background: rgba(255, 94, 26, 0.15);
  color: #FF5E1A;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 28px;
  color: #ddd;
}

.title-accent {
  color: #FF5E1A;
  font-size: 18px;
  margin-right: 6px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.featured-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.featured-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 94, 26, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.fc-image {
  height: 140px;
  background: linear-gradient(135deg, rgba(255, 94, 26, 0.15), rgba(255, 165, 0, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fc-emoji {
  font-size: 48px;
}

.fc-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.fc-body {
  padding: 18px;
}

.fc-category {
  font-size: 11px;
  color: #FF5E1A;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.fc-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  margin: 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fc-excerpt {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fc-meta {
  font-size: 12px;
  color: #666;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.post-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.post-card:hover {
  border-color: rgba(255, 94, 26, 0.2);
  background: rgba(255, 94, 26, 0.03);
  transform: translateY(-2px);
}

.pc-top {
  height: 4px;
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}

.pc-category-badge {
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
}

.pc-body {
  padding: 0 20px;
}

.pc-category {
  font-size: 12px;
  color: #FF5E1A;
  letter-spacing: 1px;
}

.pc-title {
  font-size: 18px;
  font-weight: 700;
  color: #eee;
  margin: 8px 0;
  line-height: 1.4;
}

.pc-excerpt {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pc-footer {
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pc-tags {
  display: flex;
  gap: 6px;
}

.pc-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  color: #888;
}

.pc-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #666;
}

@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
