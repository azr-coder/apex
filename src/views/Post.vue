<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, getRelatedPosts, categories } from '../data/posts'

const route = useRoute()
const router = useRouter()

const post = computed(() => getPostById(route.params.id as string))
const related = computed(() => post.value ? getRelatedPosts(post.value) : [])

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

const catIcon = computed(() => {
  const p = post.value
  if (!p) return '⌖'
  const cat = categories.find((c: { name: string }) => c.name === p.category)
  return cat?.icon || '⌖'
})

function renderMarkdown(content: string): string {
  const lines = content.trim().split('\n')
  let html = ''
  let inTable = false
  let isHeaderRow = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Headers
    if (line.startsWith('### ')) {
      html += `<h3>${line.slice(4)}</h3>`
      continue
    }
    if (line.startsWith('## ')) {
      html += `<h2>${line.slice(3)}</h2>`
      continue
    }

    // HR
    if (line.trim() === '---') {
      html += '<hr>'
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      html += `<blockquote><span class="bq-icon">ⓘ</span><p>${line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>')}</p></blockquote>`
      continue
    }

    // Table row
    if (line.includes('|') && /^\|.*\|$/.test(line.trim())) {
      const cells = line.trim().split('|').filter((c: string) => c !== '')
      const cellHtml = cells.map((c: string) => `<td>${c.trim()}</td>`).join('')
      if (!inTable) {
        html += '<table><tr>' + cellHtml + '</tr>'
        inTable = true
        isHeaderRow = true
        continue
      }
      if (isHeaderRow) {
        // Convert previous row to th and skip separator row if it looks like ---
        html = html.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
        isHeaderRow = false
        // Check if current row is separator
        if (cells.every((c: string) => /^[-:]+$/.test(c.trim()))) continue
        html += '<tr>' + cellHtml + '</tr>'
        continue
      }
      html += '<tr>' + cellHtml + '</tr>'
      continue
    } else if (inTable) {
      html += '</table>'
      inTable = false
    }

    // Empty line
    if (line.trim() === '') {
      html += '</p><p>'
      continue
    }

    // Regular text with inline formatting
    let formatted = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')

    html += formatted
  }

  if (inTable) html += '</table>'
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><\/p>/g, '').replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p><p>/g, '<p>')

  return html
}
</script>

<template>
  <div v-if="post" class="post-page">
    <div class="post-hero">
      <div class="post-hero-inner">
        <div class="ph-breadcrumb">
          <span class="ph-home" @click="router.push('/')">首页</span>
          <span class="ph-sep">/</span>
          <span class="ph-cat">{{ post.category }}</span>
          <span class="ph-sep">/</span>
          <span class="ph-current">{{ post.title.slice(0, 20) }}...</span>
        </div>
        <span class="ph-badge" :style="{ background: difficultyColor[post.difficulty] }">
          {{ catIcon }} {{ difficultyLabel[post.difficulty] }}级
        </span>
        <h1 class="ph-title">{{ post.title }}</h1>
        <p class="ph-excerpt">{{ post.excerpt }}</p>
        <div class="ph-meta">
          <div class="ph-meta-item">📅 {{ post.date }}</div>
          <div class="ph-meta-item">⏱️ {{ post.readTime }} 分钟阅读</div>
          <div class="ph-meta-item">📂 {{ post.category }}</div>
        </div>
        <div class="ph-tags">
          <span v-for="tag in post.tags" :key="tag" class="ph-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="post-layout">
      <aside class="post-toc">
        <div class="toc-title">目录</div>
        <nav class="toc-nav">
          <a
            v-for="(h, i) in post.content.split('\n').filter(l => l.startsWith('## '))"
            :key="i"
            :href="`#h${i}`"
            class="toc-link"
          >
            {{ h.replace('## ', '') }}
          </a>
        </nav>
      </aside>

      <article class="post-content">
        <div class="content-body" v-html="renderMarkdown(post.content)"></div>

        <div class="post-divider"></div>

        <div class="post-author">
          <div class="author-avatar">⛊</div>
          <div class="author-info">
            <div class="author-name">安章瑞</div>
            <div class="author-desc">APEX猎杀段位玩家 · 2000+小时游戏时长 · 专注APEX教学</div>
          </div>
        </div>
      </article>
    </div>

    <section v-if="related.length" class="related-section">
      <div class="section-container">
        <h2 class="section-title"><span class="title-accent">↻</span> 相关文章</h2>
        <div class="related-grid">
          <article
            v-for="p in related"
            :key="p.id"
            class="related-card"
            @click="router.push(`/post/${p.id}`)"
          >
            <span class="rc-cat">{{ p.category }}</span>
            <h3 class="rc-title">{{ p.title }}</h3>
            <p class="rc-excerpt">{{ p.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="not-found">
    <h2>404 — 文章未找到</h2>
    <p>该文章不存在或已被移除。</p>
    <button class="back-btn" @click="router.push('/')">返回首页</button>
  </div>
</template>

<style scoped>
.post-page {
  padding-bottom: 80px;
}

.post-hero {
  background:
    radial-gradient(ellipse at 30% 50%, rgba(255, 94, 26, 0.08) 0%, transparent 50%),
    linear-gradient(180deg, #0d0d1a, #0a0a0f);
  border-bottom: 1px solid rgba(255, 94, 26, 0.1);
  padding: 64px 24px 48px;
}

.post-hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.ph-breadcrumb {
  font-size: 13px;
  color: #888;
  margin-bottom: 16px;
}

.ph-home {
  cursor: pointer;
  color: #FF5E1A;
}

.ph-home:hover {
  text-decoration: underline;
}

.ph-sep {
  margin: 0 8px;
  color: #555;
}

.ph-current {
  color: #666;
}

.ph-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
}

.ph-title {
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 14px;
}

.ph-excerpt {
  font-size: 16px;
  color: #999;
  line-height: 1.7;
  margin-bottom: 20px;
}

.ph-meta {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #777;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.ph-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ph-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  background: rgba(255, 94, 26, 0.1);
  color: #FF5E1A;
  border: 1px solid rgba(255, 94, 26, 0.2);
}

.post-layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 0;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
}

.post-toc {
  position: sticky;
  top: 100px;
  align-self: start;
}

.toc-title {
  font-size: 13px;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 14px;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 2px solid rgba(255, 94, 26, 0.15);
  padding-left: 14px;
}

.toc-link {
  font-size: 13px;
  color: #888;
  text-decoration: none;
  padding: 3px 0;
  transition: color 0.2s;
  display: block;
  line-height: 1.4;
}

.toc-link:hover {
  color: #FF5E1A;
}

.post-content {
  min-width: 0;
}

.content-body {
  font-size: 15px;
  line-height: 1.85;
  color: #ccc;
}

.content-body :deep(h2) {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 40px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.content-body :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  color: #eee;
  margin: 28px 0 12px;
}

.content-body :deep(p) {
  margin: 0 0 14px;
}

.content-body :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.content-body :deep(code) {
  background: rgba(255, 94, 26, 0.1);
  color: #FF5E1A;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.content-body :deep(blockquote) {
  margin: 20px 0;
  padding: 16px 20px;
  background: rgba(255, 94, 26, 0.06);
  border-left: 3px solid #FF5E1A;
  border-radius: 0 6px 6px 0;
  display: flex;
  gap: 12px;
}

.content-body :deep(.bq-icon) {
  font-size: 16px;
  color: #FF5E1A;
  flex-shrink: 0;
  margin-top: 2px;
}

.content-body :deep(blockquote p) {
  margin: 0;
  color: #ccc;
  font-style: italic;
}

.content-body :deep(hr) {
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 28px 0;
}

.content-body :deep(ul),
.content-body :deep(ol) {
  padding-left: 20px;
  margin: 12px 0;
}

.content-body :deep(li) {
  margin: 6px 0;
  color: #bbb;
}

.content-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 13px;
}

.content-body :deep(th) {
  background: rgba(255, 94, 26, 0.12);
  color: #fff;
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
}

.content-body :deep(td) {
  padding: 9px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #bbb;
}

.content-body :deep(tr:hover td) {
  background: rgba(255, 255, 255, 0.02);
}

.post-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 40px 0;
}

.post-author {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  align-items: center;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: rgba(255, 94, 26, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #FF5E1A;
  flex-shrink: 0;
}

.author-name {
  font-weight: 700;
  color: #fff;
  font-size: 16px;
}

.author-desc {
  font-size: 13px;
  color: #888;
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #ddd;
  margin: 0 0 24px;
}

.title-accent {
  color: #FF5E1A;
  margin-right: 6px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.related-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.related-card:hover {
  border-color: rgba(255, 94, 26, 0.2);
  background: rgba(255, 94, 26, 0.03);
}

.rc-cat {
  font-size: 11px;
  color: #FF5E1A;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.rc-title {
  font-size: 16px;
  font-weight: 700;
  color: #eee;
  margin: 8px 0;
  line-height: 1.4;
}

.rc-excerpt {
  font-size: 12px;
  color: #888;
  line-height: 1.5;
}

.not-found {
  text-align: center;
  padding: 120px 24px;
}

.not-found h2 {
  font-size: 28px;
  color: #fff;
}

.not-found p {
  color: #888;
  margin: 12px 0 24px;
}

.back-btn {
  padding: 10px 24px;
  background: rgba(255, 94, 26, 0.15);
  border: 1px solid rgba(255, 94, 26, 0.3);
  color: #FF5E1A;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(255, 94, 26, 0.25);
}

@media (max-width: 860px) {
  .post-layout {
    grid-template-columns: 1fr;
  }
  .post-toc {
    display: none;
  }
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
