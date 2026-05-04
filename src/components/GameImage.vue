<script setup lang="ts">
import { ref, onMounted } from 'vue'

withDefaults(defineProps<{
  src: string
  alt?: string
  fallback?: string
}>(), { alt: '', fallback: '' })

const loaded = ref(false)
const error = ref(false)
const imgEl = ref<HTMLImageElement>()

onMounted(() => {
  if (!imgEl.value) return
  if (imgEl.value.complete) {
    loaded.value = true
  }
})

function onLoad() { loaded.value = true }
function onError() { error.value = true }
</script>

<template>
  <div class="game-image" :class="{ loaded, error: error && fallback }">
    <div v-if="!loaded && !error" class="gi-placeholder">
      <span class="gi-spinner"></span>
    </div>
    <div v-if="error && fallback" class="gi-fallback" v-bind="$attrs">
      <slot name="fallback">
        <span>{{ fallback }}</span>
      </slot>
    </div>
    <img
      v-show="!error"
      ref="imgEl"
      :src="src"
      :alt="alt"
      loading="lazy"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.game-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.game-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.game-image.loaded img {
  opacity: 1;
}

.gi-placeholder {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.02);
}

.gi-spinner {
  width: 24px; height: 24px;
  border: 2px solid rgba(255, 94, 26, 0.15);
  border-top-color: #FF5E1A;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.gi-fallback {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  color: #666;
  font-size: 13px;
}
</style>
