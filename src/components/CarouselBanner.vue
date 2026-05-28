<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const slides = [
  {
    bg: ['#1a3a4a', '#2d5a6a'],
    title: '蜿蜒的柳江',
    subtitle: '群山环抱之中，江水如丝带般穿城而过，勾勒出一幅动人的山水画卷',
    label: '柳州 · 广西',
  },
  {
    bg: ['#3a5a40', '#4a7a50'],
    title: '龙脊梯田',
    subtitle: '层层叠叠的曲线盘绕山间，光影交错间尽显千年农耕之美',
    label: '桂林 · 龙胜',
  },
  {
    bg: ['#4a3a2a', '#6a5a3a'],
    title: '黄山云海',
    subtitle: '奇松怪石隐现于翻涌云涛之中，恍若仙境落入人间',
    label: '黄山 · 安徽',
  },
]

const current = ref(0)
let timer = null
const interval = 5000

function next() {
  current.value = (current.value + 1) % slides.length
}

function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length
}

function goTo(index) {
  current.value = index
}

function startAuto() {
  stopAuto()
  timer = setInterval(next, interval)
}

function stopAuto() {
  if (timer) clearInterval(timer)
}

onMounted(startAuto)
onUnmounted(stopAuto)

const direction = ref(1) // 1 = forward, -1 = backward

function handleNext() { direction.value = 1; next(); resetTimer() }
function handlePrev() { direction.value = -1; prev(); resetTimer() }
function handleDot(i) { direction.value = i > current.value ? 1 : -1; goTo(i); resetTimer() }
function resetTimer() { startAuto() }
</script>

<template>
  <div class="carousel" @mouseenter="stopAuto" @mouseleave="startAuto">
    <!-- 幻灯片 -->
    <div class="slides-wrapper">
      <transition
        :name="direction === 1 ? 'slide-next' : 'slide-prev'"
        mode="out-in"
      >
        <div
          :key="current"
          class="slide"
          :style="{
            background: `linear-gradient(135deg, ${slides[current].bg[0]}, ${slides[current].bg[1]})`,
          }"
        >
          <!-- 遮罩 -->
          <div class="overlay" />

          <!-- 文字内容 -->
          <div class="slide-content">
            <span class="slide-label">{{ slides[current].label }}</span>
            <h2 class="slide-title">{{ slides[current].title }}</h2>
            <p class="slide-subtitle">{{ slides[current].subtitle }}</p>
          </div>
        </div>
      </transition>
    </div>

    <!-- 左右箭头 -->
    <button class="arrow arrow-left" @click="handlePrev" aria-label="上一张">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="arrow arrow-right" @click="handleNext" aria-label="下一张">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <!-- 底部指示器 -->
    <div class="dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="handleDot(i)"
        :aria-label="`第 ${i + 1} 张`"
      />
    </div>
  </div>
</template>

<style scoped>
/* ===== 容器 ===== */
.carousel {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 320px;
  max-height: 66vh;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 16px;
  width: calc(100% - 32px);
}

@media (min-width: 768px) {
  .carousel {
    height: 60vh;
    max-height: 66vh;
    border-radius: 32px;
    margin: 0 24px;
    width: calc(100% - 48px);
  }
}

.slides-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

/* ===== 幻灯片 ===== */
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

/* ===== 文字内容 ===== */
.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  max-width: 720px;
}

.slide-label {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.slide-title {
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 2px;
  line-height: 1.2;
  margin-bottom: 16px;
}

.slide-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
}

/* ===== 箭头 ===== */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.25);
}

.arrow-left  { left: 24px; }
.arrow-right { right: 24px; }

/* ===== 指示器 ===== */
.dots {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #fff;
  border-color: #fff;
  width: 28px;
  border-radius: 5px;
}

/* ===== 切换动画 ===== */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 767px) {
  .slide-title { font-size: 26px; }
  .slide-subtitle { font-size: 14px; max-width: 300px; }
  .slide-label { font-size: 12px; }
  .arrow { width: 36px; height: 36px; }
  .arrow-left { left: 12px; }
  .arrow-right { right: 12px; }
}
</style>
