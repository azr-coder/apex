<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, getRelatedPosts } from '../data/posts'
import { legends, weapons } from '../data/game-data'

const route = useRoute()
const router = useRouter()
const readingProgress = ref(0)

const post = computed(() => getPostById(route.params.id as string))
const related = computed(() => post.value ? getRelatedPosts(post.value) : [])

const difficultyLabel: Record<string, string> = { beginner: '入门', intermediate: '进阶', advanced: '高级', master: '大师' }
const difficultyColor: Record<string, string> = { beginner: '#4CAF50', intermediate: '#2196F3', advanced: '#FF9800', master: '#FF5E1A' }

const relevantLegend = computed(() => {
  if (!post.value) return null
  const tags = post.value.tags
  if (tags.includes('身法')) return legends.find(l => l.name === '动力小子')
  if (tags.includes('英雄')) return legends.find(l => l.name === '恶灵')
  if (tags.includes('新手')) return legends.find(l => l.name === '寻血猎犬')
  return legends[Math.floor(Math.random() * legends.length)]
})

const relevantWeapons = computed(() => weapons.filter(w => w.tier === 'S' || w.tier === 'A').slice(0, 3))

function renderMarkdown(content: string): string {
  const lines = content.trim().split('\n')
  let html = ''
  let inTable = false
  let isHeaderRow = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('### ')) { html += `<h3>${line.slice(4)}</h3>`; continue }
    if (line.startsWith('## ')) { html += `<h2>${line.slice(3)}</h2>`; continue }
    if (line.trim() === '---') { html += '<hr>'; continue }
    if (line.startsWith('> ')) { html += `<blockquote><span class="bq-icon">ⓘ</span><p>${inlineFormat(line.slice(2))}</p></blockquote>`; continue }

    if (line.includes('|') && /^\|.*\|$/.test(line.trim())) {
      const cells = line.trim().split('|').filter((c: string) => c !== '')
      const cellHtml = cells.map((c: string) => `<td>${c.trim()}</td>`).join('')
      if (!inTable) { html += '<table><tr>' + cellHtml + '</tr>'; inTable = true; isHeaderRow = true; continue }
      if (isHeaderRow) {
        html = html.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
        isHeaderRow = false
        if (cells.every((c: string) => /^[-:]+$/.test(c.trim()))) continue
        html += '<tr>' + cellHtml + '</tr>'
        continue
      }
      html += '<tr>' + cellHtml + '</tr>'
      continue
    } else if (inTable) { html += '</table>'; inTable = false }

    if (line.trim() === '') { html += '</p><p>'; continue }
    html += inlineFormat(line)
  }

  if (inTable) html += '</table>'
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><\/p>/g, '').replace(/<p>\s*<\/p>/g, '')
  return html
}

function inlineFormat(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function handleScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => { window.addEventListener('scroll', handleScroll) })
</script>

<template>
  <div class="post-page">
    <!-- Progress bar -->
    <div class="reading-bar" :style="{ width: readingProgress + '%' }"></div>

    <div v-if="post" class="post-content-wrapper">
      <!-- Post Hero -->
      <div class="post-hero">
        <div class="post-hero-bg"
          :style="{ background: `radial-gradient(ellipse at 30% 40%, ${difficultyColor[post.difficulty]}12 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255, 94, 26, 0.06) 0%, transparent 50%), linear-gradient(180deg, #06060f, #0a0a0f)` }">
        </div>

        <div class="post-hero-inner">
          <div class="ph-breadcrumb">
            <span class="ph-home" @click="router.push('/')">首页</span>
            <span class="ph-sep">›</span>
            <span class="ph-cat">{{ post.category }}</span>
            <span class="ph-sep">›</span>
            <span class="ph-current">正文</span>
          </div>

          <div class="ph-badges">
            <span class="ph-badge" :style="{ background: difficultyColor[post.difficulty] }">
              {{ difficultyLabel[post.difficulty] }}级
            </span>
            <span class="ph-category-badge">{{ post.category }}</span>
          </div>

          <h1 class="ph-title">{{ post.title }}</h1>
          <p class="ph-excerpt">{{ post.excerpt }}</p>

          <div class="ph-meta-row">
            <div class="ph-meta-item">📅 {{ post.date }}</div>
            <div class="ph-meta-sep"></div>
            <div class="ph-meta-item">⏱️ {{ post.readTime }} 分钟</div>
            <div class="ph-meta-sep"></div>
            <div class="ph-meta-item">📂 {{ post.category }}</div>
          </div>

          <div class="ph-tags">
            <span v-for="tag in post.tags" :key="tag" class="ph-tag">{{ tag }}</span>
          </div>

          <div class="ph-decorative">
            <span class="phd-line"></span>
            <span class="phd-diamond">◆</span>
            <span class="phd-line"></span>
          </div>
        </div>
      </div>

      <!-- Article body -->
      <div class="post-layout">
        <aside class="post-sidebar">
          <div class="toc-card glass-card">
            <div class="toc-title">📑 目录</div>
            <nav class="toc-nav">
              <a v-for="(h, i) in post.content.split('\n').filter(l => l.startsWith('## '))" :key="i" :href="`#h${i}`" class="toc-link">
                {{ h.replace('## ', '') }}
              </a>
            </nav>
          </div>

          <div v-if="relevantLegend" class="side-legend glass-card">
            <span class="sl-icon" :style="{ color: relevantLegend.color }">{{ relevantLegend.icon }}</span>
            <span class="sl-name">{{ relevantLegend.name }}</span>
            <span class="sl-hint">推荐英雄</span>
          </div>

          <div class="side-weapons glass-card">
            <div class="sw-title">⚔️ 推荐武器</div>
            <div v-for="w in relevantWeapons" :key="w.name" class="sw-row">
              <span class="swr-icon">{{ w.icon }}</span>
              <span class="swr-name">{{ w.name }}</span>
              <span class="swr-tier" :style="{ color: w.tier === 'S' ? '#FF5E1A' : '#FFA500' }">{{ w.tier }}</span>
            </div>
          </div>
        </aside>

        <article class="post-body">
          <div class="content-body" v-html="renderMarkdown(post.content)"></div>

          <div class="post-divider">
            <span class="pd-line"></span>
            <span class="pd-icon">⛊</span>
            <span class="pd-line"></span>
          </div>

          <div class="post-author-card glass-card">
            <div class="author-avatar">
              <span class="aa-icon">⛊</span>
            </div>
            <div class="author-info">
              <div class="author-name">安章瑞</div>
              <div class="author-desc">APEX猎杀段位 · 2000+h游戏时长 · 专注教学</div>
            </div>
            <div class="author-badge">猎杀</div>
          </div>
        </article>
      </div>

      <!-- Related -->
      <section v-if="related.length" class="related-section">
        <div class="section-header">
          <div class="section-accent-line"></div>
          <h2 class="section-title">↻ 相关文章</h2>
        </div>
        <div class="related-grid">
          <article v-for="p in related" :key="p.id" class="related-card glow-hover" @click="router.push(`/post/${p.id}`)">
            <span class="rc-cat">{{ p.category }}</span>
            <h3 class="rc-title">{{ p.title }}</h3>
            <p class="rc-excerpt">{{ p.excerpt }}</p>
          </article>
        </div>
      </section>
    </div>

    <div v-else class="not-found">
      <span class="nf-icon">🔍</span>
      <h2>文章未找到</h2>
      <p>该文章不存在或已被移除。</p>
      <button class="back-btn" @click="router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.post-page {
  padding-bottom: 80px;
}

.reading-bar {
  position: fixed; top: 64px; left: 0; height: 2px;
  background: linear-gradient(90deg, #FF5E1A, #FFA500);
  z-index: 1001; transition: width 0.15s;
}

/* Hero */
.post-hero { position: relative; overflow: hidden; }
.post-hero-bg { position: absolute; inset: 0; }
.post-hero-inner {
  position: relative; z-index: 1;
  max-width: 800px; margin: 0 auto;
  padding: 64px 24px 48px;
}

.ph-breadcrumb { font-size: 13px; color: #888; margin-bottom: 18px; }
.ph-home { cursor: pointer; color: #FF5E1A; }
.ph-home:hover { text-decoration: underline; }
.ph-sep { margin: 0 8px; color: #555; }
.ph-cat { color: #aaa; }
.ph-current { color: #666; }

.ph-badges { display: flex; gap: 8px; margin-bottom: 16px; }
.ph-badge { padding: 4px 14px; border-radius: 4px; font-size: 13px; font-weight: 600; color: #fff; }
.ph-category-badge {
  padding: 4px 14px; border-radius: 4px; font-size: 13px;
  font-weight: 600; color: #FF5E1A;
  background: rgba(255, 94, 26, 0.1);
  border: 1px solid rgba(255, 94, 26, 0.2);
}

.ph-title {
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800; color: #fff; line-height: 1.3;
  margin: 0 0 14px;
}

.ph-excerpt {
  font-size: 16px; color: #999; line-height: 1.7;
  margin-bottom: 20px;
}

.ph-meta-row { display: flex; align-items: center; gap: 0; margin-bottom: 18px; }
.ph-meta-item { font-size: 13px; color: #777; padding: 0 12px; }
.ph-meta-sep { width: 1px; height: 10px; background: rgba(255, 255, 255, 0.08); }

.ph-tags { display: flex; gap: 8px; flex-wrap: wrap; }

.ph-tag {
  font-size: 11px; padding: 3px 10px; border-radius: 4px;
  background: rgba(255, 94, 26, 0.08);
  color: #FF5E1A; border: 1px solid rgba(255, 94, 26, 0.15);
}

.ph-decorative {
  display: flex; align-items: center; gap: 12px;
  margin-top: 32px; justify-content: center;
}

.phd-line { width: 40px; height: 1px; background: rgba(255, 94, 26, 0.2); }
.phd-diamond { color: #FF5E1A; font-size: 10px; }

/* Layout */
.post-layout {
  max-width: 1100px; margin: 0 auto;
  padding: 40px 24px 0;
  display: grid; grid-template-columns: 200px 1fr;
  gap: 40px;
}

/* Sidebar */
.post-sidebar { position: sticky; top: 100px; align-self: start; display: flex; flex-direction: column; gap: 14px; }

.toc-card { padding: 16px; }

.toc-title {
  font-size: 12px; font-weight: 700; color: #aaa;
  text-transform: uppercase; letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.toc-nav {
  display: flex; flex-direction: column; gap: 6px;
  border-left: 2px solid rgba(255, 94, 26, 0.12);
  padding-left: 12px;
}

.toc-link {
  font-size: 12px; color: #888; text-decoration: none;
  padding: 2px 0; transition: color 0.2s;
  display: block; line-height: 1.4;
}

.toc-link:hover { color: #FF5E1A; }

.side-legend {
  padding: 16px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}

.sl-icon { font-size: 32px; }
.sl-name { font-size: 14px; font-weight: 600; color: #ddd; }
.sl-hint { font-size: 10px; color: #777; }

.side-weapons { padding: 14px; }

.sw-title { font-size: 12px; font-weight: 700; color: #aaa; margin-bottom: 10px; letter-spacing: 1px; }

.sw-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; }

.swr-icon { font-size: 16px; }
.swr-name { font-size: 12px; color: #ccc; flex: 1; }
.swr-tier { font-size: 12px; font-weight: 700; font-family: var(--font-display); }

/* Article */
.post-body { min-width: 0; }

.content-body { font-size: 15px; line-height: 1.85; color: #ccc; }

.content-body :deep(h2) {
  font-size: 24px; font-weight: 700; color: #fff;
  margin: 44px 0 16px; padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.content-body :deep(h2::before) {
  content: '⌖'; color: #FF5E1A; margin-right: 8px;
  font-size: 20px;
}

.content-body :deep(h3) { font-size: 18px; font-weight: 600; color: #eee; margin: 30px 0 12px; }
.content-body :deep(p) { margin: 0 0 14px; }
.content-body :deep(strong) { color: #fff; font-weight: 600; }

.content-body :deep(code) {
  background: rgba(255, 94, 26, 0.1); color: #FF5E1A;
  padding: 2px 6px; border-radius: 3px; font-size: 13px;
  font-family: 'Courier New', monospace;
}

.content-body :deep(blockquote) {
  margin: 24px 0; padding: 16px 20px;
  background: rgba(255, 94, 26, 0.04);
  border-left: 3px solid #FF5E1A;
  border-radius: 0 6px 6px 0;
  display: flex; gap: 12px;
}

.content-body :deep(.bq-icon) { font-size: 16px; color: #FF5E1A; flex-shrink: 0; }

.content-body :deep(blockquote p) { margin: 0; color: #bbb; font-style: italic; }

.content-body :deep(hr) {
  border: none; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 94, 26, 0.15), transparent);
  margin: 32px 0;
}

.content-body :deep(ul), .content-body :deep(ol) { padding-left: 20px; margin: 12px 0; }
.content-body :deep(li) { margin: 6px 0; color: #bbb; }
.content-body :deep(li::marker) { color: #FF5E1A; }

.content-body :deep(table) { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }

.content-body :deep(th) {
  background: rgba(255, 94, 26, 0.1); color: #fff;
  padding: 10px 14px; text-align: left;
  font-weight: 600; border-bottom: 2px solid rgba(255, 94, 26, 0.2);
}

.content-body :deep(td) {
  padding: 9px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: #bbb;
}

.content-body :deep(tr:hover td) { background: rgba(255, 94, 26, 0.02); }

/* Post divider */
.post-divider {
  display: flex; align-items: center; gap: 14px;
  margin: 40px 0; justify-content: center;
}

.pd-line { width: 60px; height: 1px; background: rgba(255, 94, 26, 0.15); }
.pd-icon { color: #FF5E1A; font-size: 16px; }

/* Author card */
.post-author-card {
  display: flex; align-items: center; gap: 16px;
  padding: 20px;
}

.author-avatar {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(255, 94, 26, 0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; border: 1px solid rgba(255, 94, 26, 0.2);
}

.aa-icon { font-size: 24px; color: #FF5E1A; }

.author-info { flex: 1; }
.author-name { font-weight: 700; color: #fff; font-size: 16px; }
.author-desc { font-size: 13px; color: #888; }

.author-badge {
  padding: 4px 14px; background: rgba(255, 94, 26, 0.12);
  color: #FF5E1A; border-radius: 4px; font-size: 12px;
  font-weight: 700; border: 1px solid rgba(255, 94, 26, 0.2);
}

/* Related */
.related-section { max-width: 1100px; margin: 0 auto; padding: 48px 24px 0; }

.section-header { margin-bottom: 24px; }

.section-accent-line {
  width: 32px; height: 3px; background: #FF5E1A;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  margin-bottom: 12px;
}

.section-title { font-size: 20px; font-weight: 700; color: #ddd; }

.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

.related-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px; padding: 18px;
  cursor: pointer; transition: all 0.3s;
}

.related-card:hover { border-color: rgba(255, 94, 26, 0.2); }

.rc-cat { font-size: 11px; color: #FF5E1A; text-transform: uppercase; letter-spacing: 1px; }
.rc-title { font-size: 16px; font-weight: 700; color: #eee; margin: 8px 0; line-height: 1.4; }
.rc-excerpt { font-size: 12px; color: #888; line-height: 1.5; }

/* 404 */
.not-found { text-align: center; padding: 120px 24px; }
.nf-icon { font-size: 56px; display: block; margin-bottom: 16px; }
.not-found h2 { font-size: 28px; color: #fff; }
.not-found p { color: #888; margin: 12px 0 24px; }

.back-btn {
  padding: 10px 24px; background: rgba(255, 94, 26, 0.1);
  border: 1px solid rgba(255, 94, 26, 0.25);
  color: #FF5E1A; border-radius: 6px;
  cursor: pointer; font-size: 14px; font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover { background: rgba(255, 94, 26, 0.2); }

@media (max-width: 860px) {
  .post-layout { grid-template-columns: 1fr; }
  .post-sidebar { display: none; }
  .related-grid { grid-template-columns: 1fr; }
}
</style>
