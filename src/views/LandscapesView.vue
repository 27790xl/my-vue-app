<script setup>
import { ref } from 'vue'
import CarouselBanner from '@/components/CarouselBanner.vue'

const searchQuery = ref('')

const cards = [
  { title: '桂林山水', desc: '甲天下的喀斯特地貌，山青水秀洞奇石美，漓江百里画廊令人流连忘返。', color: '#2d6a4f' },
  { title: '张家界', desc: '石英砂岩峰林地貌举世罕见，云雾缭绕间奇峰耸立，宛如仙境。', color: '#40916c' },
  { title: '九寨沟', desc: '翠海、叠瀑、彩林、雪峰、藏情，五绝并称，被誉为童话世界。', color: '#52b788' },
  { title: '黄山', desc: '奇松、怪石、云海、温泉四绝闻名天下，徐霞客赞曰登黄山天下无山。', color: '#1b4332' },
  { title: '稻城亚丁', desc: '蓝色星球上最后一片净土，雪山冰川与原始森林交相辉映。', color: '#2d6a4f' },
  { title: '青海湖', desc: '中国最大的内陆咸水湖，夏季油菜花海与碧蓝湖水构成绝美画卷。', color: '#40916c' },
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
  }
}
</script>

<template>
  <div class="pt-14 md:pt-16">
    <!-- 轮播区 -->
    <CarouselBanner />

    <!-- 搜索栏 - 悬浮在轮播图下方 -->
    <div class="relative -mt-10 mx-5 md:mx-8 z-20">
      <div class="search-bar">
        <!-- 搜索图标 -->
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>

        <!-- 输入框 -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="想去哪里探索？"
          class="search-input"
          @keyup.enter="handleSearch"
        />

        <!-- 搜索按钮 -->
        <button class="search-btn" @click="handleSearch">
          搜索
        </button>
      </div>
    </div>

    <!-- 下方推荐卡片 -->
    <section class="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-8">热门目的地</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl p-6 text-white cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]"
          :style="{ background: card.color }"
        >
          <h3 class="text-lg font-bold mb-2">{{ card.title }}</h3>
          <p class="text-sm text-white/80 leading-relaxed">{{ card.desc }}</p>
        </div>
      </div>

      <!-- 更多占位内容 -->
      <div class="mt-14 text-center py-20">
        <p class="text-gray-400 text-sm">更多精彩内容即将上线...</p>
      </div>
    </section>

    <!-- Element Plus 回到顶部 -->
    <el-backtop :right="24" :bottom="40" />
  </div>
</template>

<style scoped>
/* 搜索栏容器 */
.search-bar {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

/* 悬浮放大效果 */
.search-bar:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* 搜索图标 */
.search-icon {
  flex-shrink: 0;
  color: #9ca3af;
}

/* 输入框 */
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #374151;
  background: transparent;
  padding: 8px 4px;
}

.search-input::placeholder {
  color: #9ca3af;
}

/* 搜索按钮 */
.search-btn {
  flex-shrink: 0;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: #22c55e;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.search-btn:hover {
  background: #16a34a;
  transform: scale(1.05);
}

.search-btn:active {
  transform: scale(0.98);
}

/* 响应式 */
@media (min-width: 768px) {
  .search-bar {
    padding: 12px 16px;
    gap: 16px;
  }

  .search-input {
    font-size: 17px;
  }

  .search-btn {
    padding: 12px 32px;
    font-size: 16px;
  }
}
</style>
