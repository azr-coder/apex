<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts, categories } from '../data/posts'
import { legends, weapons } from '../data/game-data'

const route = useRoute()
const router = useRouter()
const activeCategory = computed(() => (route.query.category as string) || 'all')
const heroLegend = ref(legends[0])
const mouseX = ref(0)
const mouseY = ref(0)
let heroTimer: number

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts
  const cat = categories.find(c => c.slug === activeCategory.value)
  return cat ? posts.filter(p => p.category === cat.name) : posts
})

const featuredPosts = computed(() => posts.filter(p => p.featured))

const difficultyLabel: Record<string, string> = { beginner: '入门', intermediate: '进阶', advanced: '高级', master: '大师' }
const difficultyColor: Record<string, string> = { beginner: '#4CAF50', intermediate: '#2196F3', advanced: '#FF9800', master: '#FF5E1A' }

const sWeapons = computed(() => weapons.filter(w => w.tier === 'S'))
const aWeapons = computed(() => weapons.filter(w => w.tier === 'A'))

function goToPost(id: string) { router.push(`/post/${id}`) }
function setCategory(slug: string) { router.push({ query: slug === 'all' ? {} : { category: slug } }) }

function handleMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  heroTimer = window.setInterval(() => {
    heroLegend.value = legends[Math.floor(Math.random() * legends.length)]
  }, 4000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(heroTimer)
})

const classLabel: Record<string, string> = {
  assault: '突击', skirmisher: '散兵', recon: '侦察', controller: '控制', support: '支援'
}
</script>

<template>
  <div class="home-page">
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section">
      <div class="hero-particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{
          left: Math.random() * 100 + '%',
          '--dx': (Math.random() - 0.5) * 200 + 'px',
          '--dy': -(Math.random() * 200 + 50) + 'px',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: 4 + Math.random() * 6 + 's',
          width: 2 + Math.random() * 3 + 'px',
          height: 2 + Math.random() * 3 + 'px',
          background: Math.random() > 0.5 ? 'var(--accent)' : 'var(--gold)',
        }"></span>
      </div>

      <div class="hero-grid-lines"></div>

      <div class="hero-content" :style="{ transform: `translate(${mouseX * 0.03}px, ${mouseY * 0.03}px)` }">
        <div class="hero-badge-pill">
          <span class="badge-dot"></span>
          APEX LEGENDS MASTERY
          <span class="badge-dot"></span>
        </div>

        <h1 class="hero-title">
          <span class="ht-line1">成为<span class="neon-text">APEX</span>大师</span>
          <span class="ht-line2">的修炼之路</span>
        </h1>

        <p class="hero-subtitle">
          系统化的枪法、身法、战术攻略体系<br />
          <span class="sub-accent">从青铜到猎杀，每一步都有章可循</span>
        </p>

        <div class="hero-stats-bar">
          <div class="stat-block">
            <span class="sb-num">6</span>
            <span class="sb-label">深度攻略</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-block">
            <span class="sb-num">6</span>
            <span class="sb-label">传奇详解</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-block">
            <span class="sb-num">12</span>
            <span class="sb-label">武器评测</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-block">
            <span class="sb-num">猎杀</span>
            <span class="sb-label">最高段位</span>
          </div>
        </div>
      </div>

      <div class="hero-legend-preview" :style="{ transform: `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)` }">
        <Transition name="legend-swap" mode="out-in">
          <div :key="heroLegend.name" class="legend-preview-card">
            <span class="lpc-icon" :style="{ color: heroLegend.color }">{{ heroLegend.icon }}</span>
            <span class="lpc-name">{{ heroLegend.name }}</span>
            <span class="lpc-class">{{ classLabel[heroLegend.class] }}</span>
          </div>
        </Transition>
      </div>

      <div class="hero-angular-bottom"></div>
    </section>

    <!-- ===== CATEGORY BAR ===== -->
    <section class="category-bar">
      <div class="category-inner">
        <button :class="['cat-btn', { active: activeCategory === 'all' }]" @click="setCategory('all')">
          全部文章
        </button>
        <button v-for="cat in categories" :key="cat.slug" :class="['cat-btn', { active: activeCategory === cat.slug }]" @click="setCategory(cat.slug)">
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>
    </section>

    <div class="main-content">
      <!-- ===== LEGEND SHOWCASE ===== -->
      <section v-if="activeCategory === 'all'" class="legends-showcase">
        <div class="section-header">
          <div class="section-accent-line"></div>
          <h2 class="section-title">
            <span class="title-icon">⚔️</span> 传奇英雄
          </h2>
          <p class="section-desc">深入了解每位英雄的技能机制与定位</p>
        </div>

        <div class="legends-grid">
          <div v-for="legend in legends" :key="legend.name" class="legend-card glass-card apex-corner">
            <div class="lc-header" :style="{ background: `linear-gradient(135deg, ${legend.color}22, ${legend.color}08)` }">
              <span class="lc-icon" :style="{ color: legend.color, textShadow: `0 0 20px ${legend.color}44` }">
                {{ legend.icon }}
              </span>
              <span class="lc-diff" :style="{ color: legend.color }">
                {{ '★'.repeat(legend.difficulty) }}{{ '☆'.repeat(3 - legend.difficulty) }}
              </span>
            </div>
            <div class="lc-body">
              <h3 class="lc-name">{{ legend.name }}</h3>
              <span class="lc-class-tag" :style="{ background: legend.color + '22', color: legend.color, borderColor: legend.color + '44' }">
                {{ classLabel[legend.class] }}
              </span>
              <p class="lc-desc">{{ legend.description }}</p>
              <div class="lc-abilities">
                <div v-for="ab in legend.abilities" :key="ab.name" class="lc-ability">
                  <span class="lca-type" :class="ab.type">{{ ab.type === 'passive' ? '被动' : ab.type === 'tactical' ? '战术' : '绝招' }}</span>
                  <span class="lca-name">{{ ab.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== WEAPON TIER MAP ===== -->
      <section v-if="activeCategory === 'all'" class="weapon-section">
        <div class="section-header">
          <div class="section-accent-line"></div>
          <h2 class="section-title">
            <span class="title-icon">🎯</span> 武器梯队
          </h2>
          <p class="section-desc">当前版本主流武器强度排名</p>
        </div>

        <div class="weapon-tier-grid">
          <div class="tier-column">
            <div class="tier-header s-tier">S</div>
            <div v-for="w in sWeapons" :key="w.name" class="weapon-row">
              <span class="wr-icon">{{ w.icon }}</span>
              <div class="wr-info">
                <span class="wr-name">{{ w.name }}</span>
                <span class="wr-type">{{ w.type }} · {{ w.ammo }}弹药</span>
              </div>
            </div>
          </div>
          <div class="tier-column">
            <div class="tier-header a-tier">A</div>
            <div v-for="w in aWeapons" :key="w.name" class="weapon-row">
              <span class="wr-icon">{{ w.icon }}</span>
              <div class="wr-info">
                <span class="wr-name">{{ w.name }}</span>
                <span class="wr-type">{{ w.type }} · {{ w.ammo }}弹药</span>
              </div>
            </div>
          </div>
          <div class="tier-column">
            <div class="tier-header b-tier">B</div>
            <div v-for="w in weapons.filter(x => x.tier === 'B')" :key="w.name" class="weapon-row">
              <span class="wr-icon">{{ w.icon }}</span>
              <div class="wr-info">
                <span class="wr-name">{{ w.name }}</span>
                <span class="wr-type">{{ w.type }} · {{ w.ammo }}弹药</span>
              </div>
            </div>
            <div class="tier-header c-tier">C</div>
            <div v-for="w in weapons.filter(x => x.tier === 'C')" :key="w.name" class="weapon-row">
              <span class="wr-icon">{{ w.icon }}</span>
              <div class="wr-info">
                <span class="wr-name">{{ w.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FEATURED POSTS ===== -->
      <section v-if="featuredPosts.length && activeCategory === 'all'" class="featured-section">
        <div class="section-header">
          <div class="section-accent-line"></div>
          <h2 class="section-title">
            <span class="title-icon">✦</span> 精选推荐
          </h2>
        </div>
        <div class="featured-grid">
          <article v-for="(post, i) in featuredPosts" :key="post.id" :class="['featured-card', 'glow-hover', `stagger-${i + 1}`]" @click="goToPost(post.id)">
            <div class="fc-image" :style="{
              background: `linear-gradient(135deg, ${difficultyColor[post.difficulty]}18, ${difficultyColor[post.difficulty]}05)`
            }">
              <span class="fc-emoji">
                {{ post.category === '基础入门' ? '🚀' : post.category === '枪法进阶' ? '🎯' : post.category === '身法进阶' ? '💨' : post.category === '英雄解析' ? '⚡' : post.category === '战术意识' ? '🧠' : '🏆' }}
              </span>
              <span class="fc-badge" :style="{ background: difficultyColor[post.difficulty] }">
                {{ difficultyLabel[post.difficulty] }}
              </span>
              <div class="fc-shine"></div>
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
      </section>

      <!-- ===== ALL POSTS ===== -->
      <section class="posts-section">
        <div class="section-header" v-if="activeCategory !== 'all'">
          <div class="section-accent-line"></div>
          <h2 class="section-title">
            {{ categories.find(c => c.slug === activeCategory)?.icon }}
            {{ categories.find(c => c.slug === activeCategory)?.name || '文章列表' }}
          </h2>
        </div>

        <div class="posts-grid">
          <article v-for="post in filteredPosts" :key="post.id" class="post-card glow-hover" @click="goToPost(post.id)">
            <div class="pc-top-bar" :style="{ background: difficultyColor[post.difficulty] }"></div>
            <div class="pc-body">
              <div class="pc-header-row">
                <span class="pc-category-badge" :style="{ background: difficultyColor[post.difficulty] + '18', color: difficultyColor[post.difficulty], borderColor: difficultyColor[post.difficulty] + '33' }">
                  {{ difficultyLabel[post.difficulty] }}
                </span>
                <span class="pc-cat-name">{{ post.category }}</span>
              </div>
              <h3 class="pc-title">{{ post.title }}</h3>
              <p class="pc-excerpt">{{ post.excerpt }}</p>
            </div>
            <div class="pc-footer">
              <div class="pc-tags">
                <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="pc-tag">{{ tag }}</span>
              </div>
              <div class="pc-meta">{{ post.date }} · {{ post.readTime }}分钟</div>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="empty-state">
          <span class="empty-icon">📭</span>
          <p>该分类下暂无文章，敬请期待。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== HERO SECTION ===== */
.hero-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 30% 40%, rgba(255, 94, 26, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(255, 165, 0, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(0, 180, 255, 0.04) 0%, transparent 40%),
    linear-gradient(180deg, #06060f 0%, #0a0a0f 100%);
}

.hero-particles {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  animation: particle-drift var(--duration, 5s) ease-out infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes particle-drift {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.3; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
}

.hero-grid-lines {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 94, 26, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 94, 26, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask: radial-gradient(ellipse at center, black 40%, transparent 70%);
}

.hero-content {
  position: relative; z-index: 2;
  text-align: center; padding: 60px 24px 40px;
  transition: transform 0.1s ease-out;
}

.hero-badge-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 5px 20px;
  border: 1px solid rgba(255, 94, 26, 0.35);
  border-radius: 3px;
  font-size: 11px; letter-spacing: 5px;
  color: #FF5E1A; margin-bottom: 28px;
  clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
  animation: border-glow 3s infinite;
}

.badge-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #FF5E1A;
  box-shadow: 0 0 8px var(--accent-glow);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 800; margin: 0 0 20px;
  line-height: 1.15; display: flex;
  flex-direction: column; gap: 4px;
}

.ht-line1 { color: #fff; }
.ht-line2 { color: #ccc; font-size: 0.8em; }

.neon-text {
  color: #FF5E1A;
  text-shadow: 0 0 10px rgba(255, 94, 26, 0.5), 0 0 30px rgba(255, 94, 26, 0.2), 0 0 60px rgba(255, 94, 26, 0.1);
}

.hero-subtitle {
  font-size: 16px; color: #999; line-height: 1.8; margin-bottom: 32px;
}

.sub-accent { color: #FF5E1A; font-weight: 500; }

.hero-stats-bar {
  display: inline-flex; align-items: center;
  gap: 0; background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px; padding: 4px;
}

.stat-block {
  display: flex; flex-direction: column; gap: 2px;
  padding: 10px 24px;
}

.sb-num {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 700;
  color: #FF5E1A;
}

.sb-label { font-size: 11px; color: #777; letter-spacing: 1px; }

.stat-sep {
  width: 1px; height: 36px;
  background: rgba(255, 255, 255, 0.06);
}

/* Legend Preview */
.hero-legend-preview {
  position: absolute; right: 8%; top: 50%;
  transform: translateY(-50%); z-index: 1;
  transition: transform 0.15s ease-out;
}

.legend-preview-card {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 24px; background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px; min-width: 100px;
}

.lpc-icon { font-size: 56px; transition: all 0.3s; }
.lpc-name { font-size: 18px; font-weight: 700; color: #ddd; }
.lpc-class { font-size: 12px; color: #888; }

.legend-swap-enter-active,
.legend-swap-leave-active { transition: all 0.4s ease; }
.legend-swap-enter-from { opacity: 0; transform: translateY(12px) scale(0.95); }
.legend-swap-leave-to { opacity: 0; transform: translateY(-12px) scale(0.95); }

.hero-angular-bottom {
  position: absolute; bottom: -1px; left: 0; right: 0; height: 40px;
  background: #0a0a0f;
  clip-path: polygon(0 40px, 30% 0, 70% 0, 100% 40px, 100% 100%, 0 100%);
}

/* ===== CATEGORY BAR ===== */
.category-bar {
  position: sticky; top: 64px; z-index: 100;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 94, 26, 0.08);
  padding: 0 24px;
}

.category-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; gap: 2px; overflow-x: auto;
  padding: 8px 0;
}

.cat-btn {
  white-space: nowrap; padding: 7px 16px;
  border: 1px solid transparent; border-radius: 6px;
  font-size: 13px; font-weight: 500;
  cursor: pointer; background: transparent;
  color: #999; transition: all 0.2s;
}

.cat-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.04); }
.cat-btn.active {
  background: rgba(255, 94, 26, 0.12);
  color: #FF5E1A;
  border-color: rgba(255, 94, 26, 0.2);
}

/* ===== MAIN CONTENT ===== */
.main-content { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.section-header { margin-bottom: 24px; }
.section-accent-line {
  width: 32px; height: 3px; background: #FF5E1A;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  margin-bottom: 14px;
}

.section-title { font-size: 20px; font-weight: 700; color: #ddd; display: flex; align-items: center; gap: 8px; margin: 0 0 6px; }
.title-icon { font-size: 18px; }
.section-desc { font-size: 13px; color: #777; margin: 0; }

/* ===== LEGEND SHOWCASE ===== */
.legends-showcase { padding: 48px 0 32px; }

.legends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.legend-card { padding: 0; overflow: hidden; }

.lc-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 18px 12px;
}

.lc-icon { font-size: 44px; transition: transform 0.3s; }
.legend-card:hover .lc-icon { transform: scale(1.15) rotate(-5deg); }

.lc-diff { font-size: 11px; letter-spacing: 2px; }

.lc-body { padding: 0 18px 18px; }

.lc-name { font-size: 17px; font-weight: 700; color: #eee; margin: 0 0 8px; }

.lc-class-tag {
  display: inline-block; padding: 2px 10px;
  border-radius: 3px; font-size: 11px;
  border: 1px solid; margin-bottom: 10px;
}

.lc-desc { font-size: 12px; color: #888; line-height: 1.5; margin-bottom: 14px; }

.lc-abilities { display: flex; flex-direction: column; gap: 6px; }

.lc-ability { display: flex; align-items: center; gap: 8px; font-size: 12px; }

.lca-type {
  padding: 1px 6px; border-radius: 2px;
  font-size: 10px; font-weight: 600;
  min-width: 32px; text-align: center;
}

.lca-type.passive { background: rgba(100, 180, 255, 0.15); color: #64b5f6; }
.lca-type.tactical { background: rgba(255, 180, 50, 0.15); color: #ffb432; }
.lca-type.ultimate { background: rgba(255, 94, 26, 0.15); color: #FF5E1A; }

.lca-name { color: #bbb; }

/* ===== WEAPON SECTION ===== */
.weapon-section { padding: 32px 0 48px; }

.weapon-tier-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tier-column { display: flex; flex-direction: column; gap: 4px; }

.tier-header {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 700;
  padding: 10px; text-align: center;
  border-radius: 6px; margin-bottom: 8px;
  clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
}

.tier-header.s-tier { background: linear-gradient(135deg, #FF5E1A, #ff3d00); color: #fff; }
.tier-header.a-tier { background: linear-gradient(135deg, #FF9800, #e68900); color: #fff; }
.tier-header.b-tier { background: linear-gradient(135deg, #888, #666); color: #fff; }
.tier-header.c-tier { background: linear-gradient(135deg, #555, #444); color: #aaa; margin-top: 8px; }

.weapon-row {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 4px; transition: all 0.2s;
}

.weapon-row:hover { background: rgba(255, 94, 26, 0.05); border-color: rgba(255, 94, 26, 0.15); }

.wr-icon { font-size: 22px; }
.wr-info { display: flex; flex-direction: column; }
.wr-name { font-size: 13px; font-weight: 600; color: #ddd; }
.wr-type { font-size: 11px; color: #777; }

/* ===== HOVER GLOW ===== */
.glow-hover { transition: all 0.3s ease; }
.glow-hover:hover {
  box-shadow: 0 0 20px rgba(255, 94, 26, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* ===== FEATURED CARDS ===== */
.featured-section { padding: 32px 0; }

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.featured-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px; overflow: hidden;
  cursor: pointer; opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.featured-card:hover { transform: translateY(-4px); }

.fc-image {
  height: 150px; display: flex; align-items: center;
  justify-content: center; position: relative;
  overflow: hidden;
}

.fc-emoji { font-size: 52px; position: relative; z-index: 1; }

.fc-shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.featured-card:hover .fc-shine { transform: translateX(100%); }

.fc-badge {
  position: absolute; top: 12px; right: 12px;
  padding: 3px 10px; border-radius: 3px;
  font-size: 11px; font-weight: 600; color: #fff;
}

.fc-body { padding: 18px; }

.fc-category { font-size: 11px; color: #FF5E1A; text-transform: uppercase; letter-spacing: 1.5px; }
.fc-title {
  font-size: 17px; font-weight: 700; color: #fff;
  margin: 8px 0; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.fc-excerpt {
  font-size: 13px; color: #888; line-height: 1.6;
  margin-bottom: 12px; display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.fc-meta { font-size: 12px; color: #666; }

/* ===== ALL POSTS ===== */
.posts-section { padding: 32px 0 64px; }

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.post-card {
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px; overflow: hidden;
  cursor: pointer; transition: all 0.3s;
}

.post-card:hover { transform: translateY(-2px); border-color: rgba(255, 94, 26, 0.2); }

.pc-top-bar { height: 3px; }

.pc-body { padding: 20px 20px 0; }

.pc-header-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }

.pc-category-badge {
  padding: 2px 10px; border-radius: 3px;
  font-size: 11px; font-weight: 600; border: 1px solid;
}

.pc-cat-name { font-size: 12px; color: #FF5E1A; letter-spacing: 1px; }

.pc-title { font-size: 18px; font-weight: 700; color: #eee; margin: 0 0 8px; line-height: 1.4; }

.pc-excerpt {
  font-size: 13px; color: #888; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.pc-footer {
  padding: 14px 20px; display: flex;
  justify-content: space-between; align-items: center;
}

.pc-tags { display: flex; gap: 6px; }
.pc-tag {
  font-size: 10px; padding: 2px 8px; border-radius: 3px;
  background: rgba(255, 255, 255, 0.04); color: #888;
}

.pc-meta { font-size: 11px; color: #666; }

.empty-state { text-align: center; padding: 80px 0; color: #666; }
.empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }

/* ===== RESPONSIVE ===== */
@media (max-width: 960px) {
  .hero-legend-preview { display: none; }
  .legends-grid { grid-template-columns: repeat(2, 1fr); }
  .weapon-tier-grid { grid-template-columns: 1fr 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .posts-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .legends-grid { grid-template-columns: 1fr; }
  .weapon-tier-grid { grid-template-columns: 1fr; }
  .hero-stats-bar { flex-wrap: wrap; justify-content: center; }
  .stat-sep:nth-child(6) { display: none; }
}
</style>
