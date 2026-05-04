<script setup lang="ts">
import { posts, categories } from '../data/posts'
import { legends, RED_GRIT_BG } from '../data/game-data'

const mainLegends = legends.slice(0, 3)
const stats = [
  { value: '猎杀', label: '最高段位', color: '#FF5E1A' },
  { value: '2.8', label: '综合K/D', color: '#FFA500' },
  { value: '2000+', label: '游戏时长(h)', color: '#00BFFF' },
  { value: '850+', label: '场均伤害', color: '#4CAF50' }
]
</script>

<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="a-hero">
      <div class="ah-bg"><img :src="RED_GRIT_BG" alt="" /></div>
      <div class="ah-shade"></div>
      <div class="ah-body">
        <div class="ah-avatar">⛊</div>
        <h1 class="ah-name">安章瑞</h1>
        <div class="ah-tags">
          <span>猎杀段位</span><span>2000+h</span><span>APEX教练</span>
        </div>
        <p class="ah-desc">从2020年开始APEX之旅，经历青铜到猎杀的全部阶段。<br />相信<strong>好方法比天赋更重要</strong>，用系统化训练帮助每个玩家突破自己。</p>
      </div>
    </section>

    <!-- Body -->
    <div class="a-body">
      <!-- Stats -->
      <section class="a-sec">
        <h2 class="as-title">战斗数据</h2>
        <div class="a-stats">
          <div v-for="s in stats" :key="s.label" class="as-card">
            <span class="asc-val" :style="{ color: s.color }">{{ s.value }}</span>
            <span class="asc-lbl">{{ s.label }}</span>
          </div>
        </div>
      </section>

      <!-- Main Legends -->
      <section class="a-sec">
        <h2 class="as-title">主力英雄</h2>
        <div class="a-legends">
          <div v-for="l in mainLegends" :key="l.name" class="al-card">
            <div class="alc-img"><img :src="l.banner" :alt="l.name" loading="lazy" /></div>
            <div class="alc-overlay" :style="{ background: `linear-gradient(0deg, rgba(5,5,8,0.9) 0%, transparent 60%)` }"></div>
            <div class="alc-body">
              <span class="alc-icon" :style="{ color: l.color }">{{ l.icon }}</span>
              <span class="alc-name">{{ l.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Stats -->
      <section class="a-sec">
        <h2 class="as-title">博客数据</h2>
        <div class="a-blogstats">
          <div class="abs"><b>{{ posts.length }}</b><span>深度攻略</span></div>
          <div class="abs"><b>{{ categories.length }}</b><span>内容分类</span></div>
          <div class="abs"><b>每周</b><span>更新频率</span></div>
        </div>
      </section>

      <!-- Plan -->
      <section class="a-sec">
        <h2 class="as-title">内容规划</h2>
        <div class="a-plan">
          <div v-for="(item, i) in [
            { done: true, title: '基础入门系列', desc: '英雄选择、武器体系、落地生存' },
            { done: true, title: '枪法进阶系列', desc: '灵敏度、预瞄、跟枪系统训练' },
            { done: true, title: '身法秘籍系列', desc: '滑铲跳、蹬墙跳、兔子跳全解析' },
            { done: false, title: '职业比赛复盘系列', desc: '深度解析ALGS关键决策' },
            { done: false, title: '单排上分实战系列', desc: '每期完整对局全流程讲解' }
          ]" :key="i" class="ap-item" :class="{ done: item.done }">
            <div class="api-dot"></div>
            <div class="api-content">
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
              <span class="api-tag" :class="item.done ? 'done' : 'pending'">{{ item.done ? '✓ 已完成' : '◉ 即将推出' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="a-sec">
        <h2 class="as-title">找到我</h2>
        <div class="a-contact">
          <a href="#" class="ac-link">▶ Bilibili 视频攻略 →</a>
          <span class="ac-link">🎮 游戏ID: ZhangRui_APEX</span>
          <a href="#" class="ac-link">💬 Discord 社区 →</a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== HERO ===== */
.a-hero {
  position: relative; overflow: hidden;
  padding: 80px 24px 64px; text-align: center;
}

.ah-bg { position: absolute; inset: 0; }
.ah-bg img { width: 100%; height: 100%; object-fit: cover; }
.ah-shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(5,5,8,0.6) 0%, rgba(10,10,15,0.85) 50%, #0a0a0f 100%);
}

.ah-body { position: relative; z-index: 1; }

.ah-avatar {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(255,94,26,0.1); border: 2px solid rgba(255,94,26,0.2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; font-size: 36px; color: #FF5E1A;
}

.ah-name {
  font-family: var(--font-display);
  font-size: 32px; font-weight: 800; color: #FF5E1A;
  margin: 0 0 12px;
}

.ah-tags {
  display: flex; justify-content: center; gap: 8px;
  margin-bottom: 16px;
}

.ah-tags span {
  padding: 3px 12px; border: 1px solid rgba(255,94,26,0.2);
  border-radius: 4px; font-size: 11px; color: #FF5E1A;
  background: rgba(255,94,26,0.04);
}

.ah-desc { font-size: 14px; color: #aaa; line-height: 1.8; }
.ah-desc strong { color: #fff; }

/* ===== BODY ===== */
.a-body { max-width: 720px; margin: 0 auto; padding: 32px 24px 64px; }

.a-sec { margin-bottom: 40px; }

.as-title {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 700; color: #ddd;
  margin: 0 0 18px; letter-spacing: 1px;
  position: relative; padding-left: 14px;
}

.as-title::before {
  content: ''; position: absolute; left: 0; top: 2px; bottom: 2px;
  width: 3px; background: #FF5E1A; border-radius: 2px;
}

/* Stats */
.a-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }

.as-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 8px; padding: 18px; text-align: center;
}

.asc-val { font-family: var(--font-display); font-size: 22px; font-weight: 700; }
.asc-lbl { font-size: 11px; color: #777; display: block; margin-top: 2px; }

/* Legends */
.a-legends { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }

.al-card {
  position: relative; height: 200px; border-radius: 8px; overflow: hidden;
}

.alc-img { position: absolute; inset: 0; }
.alc-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
.alc-overlay { position: absolute; inset: 0; }

.alc-body {
  position: absolute; bottom: 12px; left: 12px;
  display: flex; align-items: center; gap: 8px;
}

.alc-icon { font-size: 24px; }
.alc-name { font-size: 15px; font-weight: 700; color: #fff; }

/* Blog stats */
.a-blogstats {
  display: flex; gap: 0;
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 8px;
}

.abs {
  flex: 1; text-align: center; padding: 18px;
  display: flex; flex-direction: column; gap: 2px;
}

.abs + .abs { border-left: 1px solid rgba(255,255,255,0.04); }

.abs b { font-family: var(--font-display); font-size: 22px; color: #FF5E1A; font-weight: 700; }
.abs span { font-size: 11px; color: #777; }

/* Plan */
.a-plan { position: relative; padding-left: 20px; }

.a-plan::before {
  content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px;
  width: 2px; background: rgba(255,94,26,0.1);
}

.ap-item { position: relative; margin-bottom: 12px; display: flex; gap: 14px; }

.api-dot {
  position: absolute; left: -20px; top: 8px;
  width: 10px; height: 10px; border-radius: 50%;
  border: 2px solid rgba(255,94,26,0.25); background: #0a0a0f; z-index: 1;
}

.ap-item.done .api-dot { background: #FF5E1A; border-color: #FF5E1A; }

.api-content {
  flex: 1; padding: 14px 16px;
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 6px;
}

.api-content strong { display: block; color: #ddd; font-size: 14px; margin-bottom: 4px; }
.api-content p { font-size: 12px; color: #888; margin: 0 0 8px; }

.api-tag { font-size: 10px; font-weight: 600; }
.api-tag.done { color: #4CAF50; }
.api-tag.pending { color: #FFA500; }

/* Contact */
.a-contact { display: flex; flex-direction: column; gap: 8px; }

.ac-link {
  display: block; padding: 12px 16px;
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 6px; color: #ccc;
  text-decoration: none; font-size: 14px;
  transition: all 0.15s;
}

.ac-link:hover { border-color: rgba(255,94,26,0.2); color: #FF5E1A; }

@media (max-width: 600px) {
  .a-stats { grid-template-columns: repeat(2, 1fr); }
  .a-legends { grid-template-columns: 1fr; }
  .a-blogstats { flex-direction: column; }
  .abs + .abs { border-left: none; border-top: 1px solid rgba(255,255,255,0.04); }
}
</style>
