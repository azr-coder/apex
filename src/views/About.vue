<script setup lang="ts">
import { posts, categories } from '../data/posts'
</script>

<template>
  <div class="about-page">
    <div class="about-hero">
      <div class="about-hero-inner">
        <div class="avatar-section">
          <div class="avatar">
            <span class="avatar-emoji">⛊</span>
          </div>
          <h1 class="about-name">安章瑞</h1>
          <p class="about-tagline">APEX Legends 猎杀段位玩家 · 游戏时长2000+小时</p>
          <p class="about-tagline sub">专注APEX教学与竞技提升</p>
        </div>
      </div>
    </div>

    <div class="about-body">
      <div class="about-grid">
        <section class="about-section">
          <h2>关于我</h2>
          <p>
            嘿，我是安章瑞。从2020年APEX第二赛季开始接触这款游戏，至今已经玩了两千多个小时。和很多玩家一样，我也经历过青铜的挣扎、白金的瓶颈、钻石的迷茫。但通过系统化的训练和不断复盘总结，我最终打上了猎杀段位。
          </p>
          <p>
            在这个过程中，我发现APEX的竞技提升和很多技能学习是相通的——它需要的不是天赋，而是正确的方法和持续的刻意练习。枪法可以练、身法可以学、意识可以培养。每个人都能成为更好的玩家。
          </p>
          <p>
            这个博客记录了我从新手到猎杀的全部心得。无论你是刚落地就被淘汰的萌新，还是卡在白金上不去的老兵，相信这里的系统化攻略都能帮你突破瓶颈。
          </p>
        </section>

        <section class="about-section">
          <h2>游戏数据</h2>
          <div class="stats-grid">
            <div class="as-card">
              <div class="as-value">猎杀</div>
              <div class="as-label">最高段位</div>
            </div>
            <div class="as-card">
              <div class="as-value">2.8</div>
              <div class="as-label">综合K/D</div>
            </div>
            <div class="as-card">
              <div class="as-value">2000+</div>
              <div class="as-label">游戏时长(h)</div>
            </div>
            <div class="as-card">
              <div class="as-value">850+</div>
              <div class="as-label">场均伤害</div>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>博客统计</h2>
          <div class="blog-stats">
            <div class="bs-item">
              <span class="bs-num">{{ posts.length }}</span>
              <span class="bs-label">深度攻略</span>
            </div>
            <div class="bs-item">
              <span class="bs-num">{{ categories.length }}</span>
              <span class="bs-label">内容分类</span>
            </div>
            <div class="bs-item">
              <span class="bs-num">每周</span>
              <span class="bs-label">更新频率</span>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>内容规划</h2>
          <div class="plan-list">
            <div class="plan-item done">
              <span class="plan-check">✓</span>
              <div>
                <strong>基础入门系列</strong>
                <p>英雄选择、武器体系、落地生存——帮助新手快速上手</p>
              </div>
            </div>
            <div class="plan-item done">
              <span class="plan-check">✓</span>
              <div>
                <strong>枪法进阶系列</strong>
                <p>灵敏度设置、预瞄、跟枪、甩枪——系统提升瞄准能力</p>
              </div>
            </div>
            <div class="plan-item done">
              <span class="plan-check">✓</span>
              <div>
                <strong>身法秘籍系列</strong>
                <p>滑铲跳、蹬墙跳、兔子跳——移动技巧全解析</p>
              </div>
            </div>
            <div class="plan-item">
              <span class="plan-pending">○</span>
              <div>
                <strong>职业选手复盘系列（即将推出）</strong>
                <p>深度解析ALGS职业比赛的关键决策与配合</p>
              </div>
            </div>
            <div class="plan-item">
              <span class="plan-pending">○</span>
              <div>
                <strong>单排上分实战系列（即将推出）</strong>
                <p>每期完整对局复盘，从跳伞到吃鸡的全流程讲解</p>
              </div>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>联系方式</h2>
          <p>有任何APEX相关的问题、建议或者想一起开黑，欢迎通过以下方式找到我：</p>
          <div class="contact-links">
            <a href="#" class="contact-link">
              <span class="cl-icon">▶</span> Bilibili
            </a>
            <a href="#" class="contact-link">
              <span class="cl-icon">🎮</span> 游戏ID: ZhangRui_APEX
            </a>
            <a href="#" class="contact-link">
              <span class="cl-icon">💬</span> Discord 社区
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding-bottom: 80px;
}

.about-hero {
  background:
    radial-gradient(ellipse at 50% 50%, rgba(255, 94, 26, 0.1) 0%, transparent 60%),
    linear-gradient(180deg, #0d0d1a, #0a0a0f);
  border-bottom: 1px solid rgba(255, 94, 26, 0.1);
  padding: 80px 24px 56px;
  text-align: center;
}

.about-hero-inner {
  max-width: 600px;
  margin: 0 auto;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: rgba(255, 94, 26, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 2px solid rgba(255, 94, 26, 0.25);
}

.avatar-emoji {
  font-size: 40px;
  color: #FF5E1A;
  filter: drop-shadow(0 0 8px rgba(255, 94, 26, 0.4));
}

.about-name {
  font-size: 32px;
  font-weight: 800;
  color: #FF5E1A;
  margin: 0 0 12px;
}

.about-tagline {
  font-size: 15px;
  color: #aaa;
  margin: 0;
  line-height: 1.7;
}

.about-tagline.sub {
  color: #888;
  font-size: 14px;
}

.about-body {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 24px;
}

.about-section {
  margin-bottom: 48px;
}

.about-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #eee;
  margin: 0 0 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  gap: 8px;
}

.about-section h2::before {
  content: '';
  width: 3px;
  height: 18px;
  background: #FF5E1A;
  border-radius: 2px;
}

.about-section p {
  font-size: 14px;
  color: #aaa;
  line-height: 1.8;
  margin: 0 0 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.as-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 18px;
  text-align: center;
}

.as-value {
  font-size: 22px;
  font-weight: 700;
  color: #FF5E1A;
  font-family: 'Courier New', monospace;
  margin-bottom: 4px;
}

.as-label {
  font-size: 12px;
  color: #777;
}

.blog-stats {
  display: flex;
  gap: 24px;
}

.bs-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bs-num {
  font-size: 22px;
  font-weight: 700;
  color: #FF5E1A;
}

.bs-label {
  font-size: 13px;
  color: #888;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-item {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  align-items: flex-start;
}

.plan-check {
  color: #4CAF50;
  font-size: 16px;
  margin-top: 1px;
}

.plan-pending {
  color: #666;
  font-size: 16px;
  margin-top: 1px;
}

.plan-item strong {
  display: block;
  color: #ddd;
  font-size: 14px;
  margin-bottom: 4px;
}

.plan-item p {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #ccc;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.contact-link:hover {
  border-color: rgba(255, 94, 26, 0.2);
  background: rgba(255, 94, 26, 0.03);
  color: #FF5E1A;
}

.cl-icon {
  font-size: 16px;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .blog-stats {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
