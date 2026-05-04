<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { posts, categories } from '../data/posts'
import { legends, weapons, HERO_KEY_ART } from '../data/game-data'

const route = useRoute()
const router = useRouter()
const heroLegend = ref(legends[0])
let heroTimer: number

const activeCategory = computed(() => (route.query.category as string) || 'all')
const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts
  const cat = categories.find(c => c.slug === activeCategory.value)
  return cat ? posts.filter(p => p.category === cat.name) : posts
})

const difficultyLabel: Record<string, string> = { beginner: '入门', intermediate: '进阶', advanced: '高级', master: '大师' }
const difficultyColor: Record<string, string> = { beginner: '#4CAF50', intermediate: '#2196F3', advanced: '#FF9800', master: '#FF5E1A' }

const classLabel: Record<string, string> = {
  assault: '突击', skirmisher: '散兵', recon: '侦察', controller: '控制', support: '支援'
}

const tierWeapons = computed(() => {
  const groups: Record<string, typeof weapons> = { S: [], A: [], B: [], C: [] }
  weapons.forEach(w => groups[w.tier].push(w))
  return groups
})

function goToPost(id: string) { router.push(`/post/${id}`) }
function setCategory(slug: string) { router.push({ query: slug === 'all' ? {} : { category: slug } }) }

onMounted(() => {
  heroTimer = window.setInterval(() => {
    heroLegend.value = legends[Math.floor(Math.random() * legends.length)]
  }, 4000)
})
onUnmounted(() => clearInterval(heroTimer))
</script>

<template>
  <div class="home-page">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-img"><img :src="HERO_KEY_ART" alt="APEX Legends" loading="eager" /></div>
      <div class="hero-shade"></div>
      <div class="hero-body">
        <div class="hero-pill">APEX LEGENDS MASTERY</div>
        <h1 class="hero-title">
          成为<span class="hl">APEX</span>大师
        </h1>
        <p class="hero-sub">系统化枪法 · 身法 · 战术攻略 — 从青铜到猎杀的完整路径</p>
        <div class="hero-nums">
          <div class="hn"><b>6</b><span>攻略</span></div>
          <div class="hn"><b>6</b><span>传奇</span></div>
          <div class="hn"><b>12</b><span>武器</span></div>
          <div class="hn"><b>猎杀</b><span>段位</span></div>
        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <div class="hero-legend" :key="heroLegend.name">
          <span class="hl-icon" :style="{ color: heroLegend.color }">{{ heroLegend.icon }}</span>
          <span class="hl-name">{{ heroLegend.name }}</span>
          <span class="hl-class">{{ classLabel[heroLegend.class] }}</span>
        </div>
      </Transition>
    </section>

    <!-- ===== CATEGORY BAR ===== -->
    <nav class="cat-bar">
      <div class="cat-bar-inner">
        <button :class="['cb', { on: activeCategory === 'all' }]" @click="setCategory('all')">全部</button>
        <button v-for="c in categories" :key="c.slug" :class="['cb', { on: activeCategory === c.slug }]" @click="setCategory(c.slug)">{{ c.icon }} {{ c.name }}</button>
      </div>
    </nav>

    <div class="main">
      <!-- ===== LEGENDS ===== -->
      <section v-if="activeCategory === 'all'" class="sec">
        <div class="sec-head">
          <h2>传奇英雄</h2>
          <p>了解每位英雄的技能机制与定位，选对英雄赢在起跑线</p>
        </div>
        <div class="legends-grid">
          <div v-for="leg in legends" :key="leg.name" class="lg-card">
            <div class="lg-img"><img :src="leg.banner" :alt="leg.name" loading="lazy" /></div>
            <div class="lg-overlay" :style="{ background: `linear-gradient(0deg, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.3) 60%, rgba(5,5,8,0.1) 100%)` }"></div>
            <div class="lg-body">
              <span class="lg-icon" :style="{ color: leg.color }">{{ leg.icon }}</span>
              <h3 class="lg-name">{{ leg.name }}</h3>
              <span class="lg-tag" :style="{ background: leg.color + '20', color: leg.color, borderColor: leg.color + '33' }">{{ classLabel[leg.class] }}</span>
              <div class="lg-abs">
                <span v-for="a in leg.abilities" :key="a.name" class="lg-ab">
                  <b :class="a.type">{{ a.type === 'passive' ? 'P' : a.type === 'tactical' ? 'T' : 'U' }}</b>
                  {{ a.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== WEAPONS ===== -->
      <section v-if="activeCategory === 'all'" class="sec">
        <div class="sec-head">
          <h2>武器梯队</h2>
          <p>当前版本主流武器强度排名，选择对的枪赢一半</p>
        </div>
        <div class="weapon-cols">
          <div v-for="tier in ['S', 'A', 'B', 'C']" :key="tier" class="wcol">
            <div :class="['wcol-head', `t${tier}`]">{{ tier }}</div>
            <div v-for="w in tierWeapons[tier]" :key="w.name" class="wrow">
              <span class="wr-icon">{{ w.icon }}</span>
              <span class="wr-name">{{ w.name }}</span>
              <span class="wr-type">{{ w.type }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== POSTS ===== -->
      <section class="sec">
        <div class="sec-head" v-if="activeCategory !== 'all'">
          <h2>{{ categories.find(c => c.slug === activeCategory)?.icon }} {{ categories.find(c => c.slug === activeCategory)?.name }}</h2>
        </div>

        <div class="posts-grid">
          <article v-for="post in filteredPosts" :key="post.id" class="post-card" @click="goToPost(post.id)">
            <div class="pc-bar" :style="{ background: difficultyColor[post.difficulty] }"></div>
            <div class="pc-body">
              <div class="pc-top">
                <span class="pc-badge" :style="{ color: difficultyColor[post.difficulty], background: difficultyColor[post.difficulty] + '12', borderColor: difficultyColor[post.difficulty] + '22' }">{{ difficultyLabel[post.difficulty] }}</span>
                <span class="pc-cat">{{ post.category }}</span>
              </div>
              <h3 class="pc-title">{{ post.title }}</h3>
              <p class="pc-excerpt">{{ post.excerpt }}</p>
            </div>
            <div class="pc-foot">
              <span class="pc-date">{{ post.date }} · {{ post.readTime }} 分钟</span>
              <span class="pc-arrow">→</span>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="empty">暂无文章，敬请期待</div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== HERO ===== */
.hero {
  position: relative; min-height: 460px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; background: #050508;
}

.hero-img {
  position: absolute; inset: 0;
}

.hero-img img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 35%;
  animation: fadeInSlow 1.5s ease;
}

@keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }

.hero-shade {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, #0a0a0f 0%, rgba(10,10,15,0.7) 30%, rgba(5,5,8,0.3) 100%);
}

.hero-body { position: relative; text-align: center; padding: 80px 24px 40px; z-index: 1; }

.hero-pill {
  display: inline-block; padding: 4px 18px;
  border: 1px solid rgba(255,94,26,0.3);
  border-radius: 3px; font-size: 10px;
  letter-spacing: 4px; color: #FF5E1A;
  margin-bottom: 20px; clip-path: polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 900; color: #fff; margin: 0 0 12px;
}

.hl {
  color: #FF5E1A;
  text-shadow: 0 0 12px rgba(255,94,26,0.3), 0 0 30px rgba(255,94,26,0.1);
}

.hero-sub {
  font-size: 15px; color: #aaa; margin: 0 0 24px;
}

.hero-nums {
  display: inline-flex; gap: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; overflow: hidden;
}

.hn {
  display: flex; flex-direction: column; gap: 2px;
  padding: 10px 20px; text-align: center;
}

.hn b {
  font-family: var(--font-display);
  font-size: 20px; color: #FF5E1A; font-weight: 700;
}

.hn span { font-size: 10px; color: #777; letter-spacing: 1px; }

.hn + .hn { border-left: 1px solid rgba(255,255,255,0.05); }

.hero-legend {
  position: absolute; right: 6%; top: 50%;
  transform: translateY(-50%); z-index: 1;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 20px 16px; background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;
  backdrop-filter: blur(8px);
}

.hl-icon { font-size: 44px; }
.hl-name { font-size: 16px; font-weight: 700; color: #fff; }
.hl-class { font-size: 11px; color: #888; }

.fade-enter-active, .fade-leave-active { transition: all 0.35s ease; }
.fade-enter-from { opacity: 0; transform: translateY(8px); }
.fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ===== CATEGORY BAR ===== */
.cat-bar {
  position: sticky; top: 64px; z-index: 100;
  background: rgba(10,10,15,0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,94,26,0.06);
}
.cat-bar-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; gap: 2px; padding: 6px 24px;
  overflow-x: auto;
}
.cb {
  white-space: nowrap; padding: 6px 14px;
  border: none; border-radius: 6px;
  font-size: 13px; color: #999;
  background: transparent; cursor: pointer;
  transition: all 0.15s;
}
.cb:hover { color: #ddd; background: rgba(255,255,255,0.04); }
.cb.on { color: #FF5E1A; background: rgba(255,94,26,0.1); }

/* ===== MAIN ===== */
.main { max-width: 1200px; margin: 0 auto; padding: 0 24px 64px; }

.sec { padding-top: 48px; }

.sec-head { margin-bottom: 24px; text-align: center; }
.sec-head h2 {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700; color: #ddd; margin: 0 0 6px;
  letter-spacing: 1px;
}
.sec-head p { font-size: 13px; color: #777; margin: 0; }

/* ===== LEGEND CARDS ===== */
.legends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.lg-card {
  position: relative; overflow: hidden;
  border-radius: 10px; height: 280px;
  cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
}

.lg-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }

.lg-img {
  position: absolute; inset: 0;
}

.lg-img img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 20%;
  transition: transform 0.5s;
}

.lg-card:hover .lg-img img { transform: scale(1.05); }

.lg-overlay { position: absolute; inset: 0; }

.lg-body {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 16px; display: flex; flex-direction: column;
  align-items: flex-start; gap: 4px;
}

.lg-icon { font-size: 28px; }
.lg-name { font-size: 17px; font-weight: 700; color: #fff; margin: 0; }

.lg-tag {
  display: inline-block; padding: 1px 8px;
  border-radius: 3px; font-size: 10px; border: 1px solid;
  margin-bottom: 8px;
}

.lg-abs { display: flex; flex-direction: column; gap: 3px; width: 100%; }

.lg-ab {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: #bbb;
}

.lg-ab b {
  font-size: 10px; padding: 0 4px; border-radius: 2px;
  min-width: 16px; text-align: center; font-weight: 700;
}

.lg-ab b.passive { background: rgba(100,180,255,0.2); color: #64b5f6; }
.lg-ab b.tactical { background: rgba(255,180,50,0.2); color: #ffb432; }
.lg-ab b.ultimate { background: rgba(255,94,26,0.2); color: #FF5E1A; }

/* ===== WEAPONS ===== */
.weapon-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.wcol {
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 8px; overflow: hidden;
}

.wcol-head {
  text-align: center; padding: 10px;
  font-family: var(--font-display);
  font-size: 20px; font-weight: 700; color: #fff;
}

.wcol-head.tS { background: linear-gradient(135deg, #FF5E1A, #E64A00); }
.wcol-head.tA { background: linear-gradient(135deg, #FF9800, #E68900); }
.wcol-head.tB { background: linear-gradient(135deg, #888, #666); }
.wcol-head.tC { background: linear-gradient(135deg, #555, #444); color: #aaa; }

.wrow {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.02);
  transition: background 0.15s;
}

.wrow:hover { background: rgba(255,94,26,0.04); }

.wr-icon { font-size: 18px; }
.wr-name { font-size: 12px; color: #ddd; font-weight: 500; flex: 1; }
.wr-type { font-size: 10px; color: #666; }

/* ===== POST CARDS ===== */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.post-card {
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; overflow: hidden;
  cursor: pointer; transition: all 0.25s;
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255,94,26,0.2);
  box-shadow: 0 8px 28px rgba(0,0,0,0.3), 0 0 16px rgba(255,94,26,0.06);
}

.pc-bar { height: 3px; }

.pc-body { padding: 20px 20px 12px; }

.pc-top { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }

.pc-badge {
  padding: 2px 8px; border-radius: 3px;
  font-size: 10px; font-weight: 600; border: 1px solid;
}

.pc-cat { font-size: 11px; color: #FF5E1A; letter-spacing: 0.5px; }

.pc-title {
  font-size: 17px; font-weight: 700; color: #eee;
  margin: 0 0 8px; line-height: 1.4;
}

.pc-excerpt {
  font-size: 13px; color: #888; line-height: 1.5; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.pc-foot {
  padding: 10px 20px; display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(255,255,255,0.03);
}

.pc-date { font-size: 12px; color: #666; }
.pc-arrow { font-size: 14px; color: #555; transition: all 0.2s; }
.post-card:hover .pc-arrow { color: #FF5E1A; transform: translateX(3px); }

.empty { text-align: center; padding: 80px 0; color: #666; }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero-legend { display: none; }
  .legends-grid { grid-template-columns: repeat(2, 1fr); }
  .weapon-cols { grid-template-columns: repeat(2, 1fr); }
  .posts-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .legends-grid { grid-template-columns: 1fr; }
  .weapon-cols { grid-template-columns: 1fr; }
  .hero-nums { flex-wrap: wrap; }
}
</style>
