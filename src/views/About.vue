<script setup lang="ts">
import { posts, categories } from '../data/posts'
import { legends, RED_GRIT_BG } from '../data/game-data'

const mainLegends = legends.slice(0, 3)
</script>

<template>
  <div class="about-page">
    <!-- Hero -->
    <div class="about-hero">
      <div class="about-hero-bg" :style="{ backgroundImage: `url(${RED_GRIT_BG})` }"></div>
      <div class="about-hero-overlay"></div>
      <div class="about-hero-inner">
        <div class="avatar-ring">
          <div class="avatar-inner">
            <span class="avatar-icon">⛊</span>
          </div>
        </div>

        <h1 class="about-name">安章瑞</h1>

        <div class="about-badges">
          <span class="ab-badge">
            <span class="abb-dot"></span>猎杀段位
          </span>
          <span class="ab-badge">
            <span class="abb-dot"></span>2000+h
          </span>
          <span class="ab-badge">
            <span class="abb-dot"></span>APEX 教练
          </span>
        </div>

        <p class="about-hero-desc">
          从2020年开始APEX之旅，经历了青铜的挣扎、白金的瓶颈、钻石的迷茫，<br />
          最终通过系统训练打上猎杀。<strong>好方法比天赋更重要。</strong>
        </p>
      </div>
      <div class="about-hero-angle"></div>
    </div>

    <!-- Main content -->
    <div class="about-body">
      <div class="about-grid">
        <!-- Stats -->
        <section class="about-section">
          <div class="as-header">
            <div class="as-accent-line"></div>
            <h2>战斗数据</h2>
          </div>
          <div class="stats-grid">
            <div v-for="(stat, i) in [
              { value: '猎杀', label: '最高段位', color: '#FF5E1A' },
              { value: '2.8', label: '综合K/D', color: '#FFA500' },
              { value: '2000+', label: '游戏时长(h)', color: '#00BFFF' },
              { value: '850+', label: '场均伤害', color: '#4CAF50' }
            ]" :key="i" class="stat-card glass-card">
              <span class="sc-value" :style="{ color: stat.color }">{{ stat.value }}</span>
              <span class="sc-label">{{ stat.label }}</span>
            </div>
          </div>
        </section>

        <!-- Main Legends -->
        <section class="about-section">
          <div class="as-header">
            <div class="as-accent-line"></div>
            <h2>主力英雄</h2>
          </div>
          <div class="main-legends">
            <div v-for="l in mainLegends" :key="l.name" class="main-legend-card glass-card">
              <span class="mlc-icon" :style="{ color: l.color, textShadow: `0 0 20px ${l.color}44` }">{{ l.icon }}</span>
              <div class="mlc-info">
                <span class="mlc-name">{{ l.name }}</span>
                <span class="mlc-desc">{{ l.description.slice(0, 30) }}...</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Stats -->
        <section class="about-section">
          <div class="as-header">
            <div class="as-accent-line"></div>
            <h2>博客数据</h2>
          </div>
          <div class="blog-stats-row">
            <div class="bsr-item">
              <span class="bsr-num neon-text">{{ posts.length }}</span>
              <span class="bsr-label">深度攻略</span>
            </div>
            <div class="bsr-sep"></div>
            <div class="bsr-item">
              <span class="bsr-num" style="color: #FFA500">{{ categories.length }}</span>
              <span class="bsr-label">内容分类</span>
            </div>
            <div class="bsr-sep"></div>
            <div class="bsr-item">
              <span class="bsr-num" style="color: #00BFFF">每周</span>
              <span class="bsr-label">更新频率</span>
            </div>
          </div>
        </section>

        <!-- Content plan -->
        <section class="about-section">
          <div class="as-header">
            <div class="as-accent-line"></div>
            <h2>内容规划</h2>
          </div>
          <div class="plan-timeline">
            <div class="pt-item done">
              <div class="pt-dot"></div>
              <div class="pt-content glass-card">
                <div class="pt-status done-tag">✓ 已完成</div>
                <strong>基础入门系列</strong>
                <p>英雄选择、武器体系、落地生存</p>
              </div>
            </div>
            <div class="pt-item done">
              <div class="pt-dot"></div>
              <div class="pt-content glass-card">
                <div class="pt-status done-tag">✓ 已完成</div>
                <strong>枪法进阶系列</strong>
                <p>灵敏度、预瞄、跟枪系统训练</p>
              </div>
            </div>
            <div class="pt-item done">
              <div class="pt-dot"></div>
              <div class="pt-content glass-card">
                <div class="pt-status done-tag">✓ 已完成</div>
                <strong>身法秘籍系列</strong>
                <p>滑铲跳、蹬墙跳、兔子跳全解析</p>
              </div>
            </div>
            <div class="pt-item pending">
              <div class="pt-dot"></div>
              <div class="pt-content glass-card">
                <div class="pt-status pending-tag">◉ 即将推出</div>
                <strong>职业比赛复盘系列</strong>
                <p>深度解析ALGS关键决策</p>
              </div>
            </div>
            <div class="pt-item pending">
              <div class="pt-dot"></div>
              <div class="pt-content glass-card">
                <div class="pt-status pending-tag">◉ 即将推出</div>
                <strong>单排上分实战系列</strong>
                <p>每期完整对局全流程讲解</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section class="about-section">
          <div class="as-header">
            <div class="as-accent-line"></div>
            <h2>找到我</h2>
          </div>
          <div class="contact-cards">
            <a href="#" class="contact-card glass-card">
              <span class="cc-icon">▶</span>
              <div>
                <span class="cc-name">Bilibili</span>
                <span class="cc-desc">视频攻略</span>
              </div>
              <span class="cc-arrow">→</span>
            </a>
            <div class="contact-card glass-card">
              <span class="cc-icon">🎮</span>
              <div>
                <span class="cc-name">游戏ID</span>
                <span class="cc-desc">ZhangRui_APEX</span>
              </div>
            </div>
            <a href="#" class="contact-card glass-card">
              <span class="cc-icon">💬</span>
              <div>
                <span class="cc-name">Discord</span>
                <span class="cc-desc">社区交流</span>
              </div>
              <span class="cc-arrow">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page { padding-bottom: 80px; }

/* Hero */
.about-hero {
  position: relative; overflow: hidden;
  padding: 80px 24px 72px; text-align: center;
}

.about-hero-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.about-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(6, 6, 15, 0.55) 0%, rgba(10, 10, 15, 0.8) 50%, #0a0a0f 100%);
}

.about-hero-inner { position: relative; z-index: 1; }

.avatar-ring {
  width: 100px; height: 100px; border-radius: 50%;
  margin: 0 auto 20px;
  background: conic-gradient(#FF5E1A, #FFA500, #FF5E1A);
  padding: 3px; animation: glow-pulse 3s infinite;
}

.avatar-inner {
  width: 100%; height: 100%; border-radius: 50%;
  background: #0a0a0f;
  display: flex; align-items: center; justify-content: center;
}

.avatar-icon { font-size: 44px; color: #FF5E1A; filter: drop-shadow(0 0 10px rgba(255, 94, 26, 0.4)); }

.about-name {
  font-family: var(--font-display);
  font-size: 36px; font-weight: 800;
  color: #FF5E1A; margin: 0 0 16px;
  text-shadow: 0 0 20px rgba(255, 94, 26, 0.3);
}

.about-badges { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }

.ab-badge {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 14px; border: 1px solid rgba(255, 94, 26, 0.2);
  border-radius: 4px; font-size: 12px;
  color: #FF5E1A; background: rgba(255, 94, 26, 0.05);
}

.abb-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #FF5E1A;
  box-shadow: 0 0 6px rgba(255, 94, 26, 0.4);
}

.about-hero-desc { font-size: 15px; color: #999; line-height: 1.8; }
.about-hero-desc strong { color: #fff; }

.about-hero-angle {
  position: absolute; bottom: -1px; left: 0; right: 0; height: 32px;
  background: #0a0a0f;
  clip-path: polygon(20% 0, 80% 0, 100% 32px, 0 32px);
}

/* Body */
.about-body { max-width: 760px; margin: 0 auto; padding: 40px 24px; }

.about-section { margin-bottom: 48px; }

.as-header { margin-bottom: 20px; }

.as-accent-line {
  width: 28px; height: 3px; background: #FF5E1A;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  margin-bottom: 12px;
}

.as-header h2 { font-size: 20px; font-weight: 700; color: #ddd; margin: 0; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

.stat-card {
  padding: 20px; text-align: center;
  display: flex; flex-direction: column; gap: 6px;
}

.sc-value {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
}

.sc-label { font-size: 12px; color: #777; letter-spacing: 1px; }

/* Main Legends */
.main-legends { display: flex; flex-direction: column; gap: 10px; }

.main-legend-card {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 20px;
}

.mlc-icon { font-size: 36px; transition: transform 0.3s; }
.main-legend-card:hover .mlc-icon { transform: scale(1.1); }

.mlc-info { display: flex; flex-direction: column; gap: 2px; }
.mlc-name { font-size: 16px; font-weight: 700; color: #eee; }
.mlc-desc { font-size: 12px; color: #888; }

/* Blog stats */
.blog-stats-row {
  display: flex; align-items: center; gap: 0;
  padding: 24px; background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  justify-content: space-around;
}

.bsr-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.bsr-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; }
.bsr-label { font-size: 12px; color: #777; letter-spacing: 1px; }
.bsr-sep { width: 1px; height: 36px; background: rgba(255, 255, 255, 0.05); }

/* Plan timeline */
.plan-timeline { position: relative; padding-left: 24px; }

.plan-timeline::before {
  content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px;
  width: 2px; background: rgba(255, 94, 26, 0.12);
}

.pt-item { position: relative; margin-bottom: 14px; display: flex; gap: 16px; }

.pt-dot {
  position: absolute; left: -24px; top: 14px;
  width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid rgba(255, 94, 26, 0.4);
  background: #0a0a0f; z-index: 1;
}

.pt-item.done .pt-dot { background: #FF5E1A; border-color: #FF5E1A; }

.pt-content { flex: 1; padding: 16px; }

.pt-content strong { display: block; color: #ddd; font-size: 15px; margin-bottom: 4px; }
.pt-content p { font-size: 13px; color: #888; margin: 0; }

.pt-status { font-size: 11px; font-weight: 600; margin-bottom: 8px; }

.done-tag { color: #4CAF50; }
.pending-tag { color: #FFA500; }

/* Contact */
.contact-cards { display: flex; flex-direction: column; gap: 10px; }

.contact-card {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 20px; color: #ccc; text-decoration: none;
  transition: all 0.2s;
}

.contact-card:hover { border-color: rgba(255, 94, 26, 0.2); }

.cc-icon { font-size: 22px; }

.cc-name { display: block; font-size: 14px; font-weight: 600; color: #ddd; }
.cc-desc { font-size: 12px; color: #888; }

.cc-arrow { margin-left: auto; color: #555; font-size: 14px; }
.contact-card:hover .cc-arrow { color: #FF5E1A; }

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .blog-stats-row { flex-direction: column; gap: 16px; }
  .bsr-sep { width: 40px; height: 1px; }
}
</style>
