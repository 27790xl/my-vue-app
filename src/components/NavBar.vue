<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoImg from '@/assets/logo/mountain-river.png'

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: '自然风光', path: '/landscapes' },
  { name: '户外探险', path: '/outdoor' },
  { name: '美食', path: '/food' },
  { name: '文化', path: '/culture' },
  { name: '城市', path: '/city' },
  { name: '关于', path: '/about' },
]

const activeIndex = ref(0)
const menuOpen = ref(false)

// 根据当前路由同步选中项
function syncActive() {
  const idx = navItems.findIndex(item => route.path.startsWith(item.path))
  activeIndex.value = idx >= 0 ? idx : activeIndex.value
}

watch(() => route.path, syncActive, { immediate: true })

function navigate(index) {
  activeIndex.value = index
  menuOpen.value = false
  router.push(navItems[index].path)
}
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 bg-white/94 backdrop-blur-md border-b border-sky-400/10">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-14 md:h-16 px-5 md:px-8 lg:px-12">

      <!-- 品牌 -->
      <router-link to="/" class="flex items-center gap-2 md:gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
        <img :src="logoImg" alt="山行"
          class="w-8 h-8 md:w-9 md:h-9 rounded-md object-cover shadow-[0_2px_6px_rgba(0,191,255,0.15)]" />
        <span class="text-lg md:text-xl font-bold text-sky-400 tracking-[0.15em]">山行</span>
      </router-link>

      <!-- 桌面导航 -->
      <ul class="hidden md:flex items-center gap-0.5">
        <li v-for="(item, index) in navItems" :key="item.name">
          <a :href="item.path"
            class="relative inline-flex items-center px-3.5 lg:px-4.5 py-2 rounded-full text-sm font-medium
                   text-gray-500 hover:text-sky-400 hover:bg-sky-400/8 transition-all duration-200"
            :class="{ '!text-sky-400 !font-semibold': activeIndex === index }"
            @click.prevent="navigate(index)"
          >
            {{ item.name }}
            <span v-if="activeIndex === index"
              class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4.5 h-0.5 rounded-sm
                     bg-sky-400 shadow-[0_0_8px_rgba(0,191,255,0.25)]"
            />
          </a>
        </li>
      </ul>

      <!-- 右侧图标 -->
      <div class="flex items-center gap-0.5 shrink-0">
        <button class="flex items-center justify-center w-9 h-9 rounded-full text-gray-400
                       hover:text-sky-400 hover:bg-sky-400/8 transition-all duration-200" aria-label="通知">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <button class="flex items-center justify-center w-9 h-9 rounded-full text-gray-400
                       hover:text-sky-400 hover:bg-sky-400/8 transition-all duration-200" aria-label="用户">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <!-- 汉堡 -->
        <button class="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-400
                       hover:text-sky-400 hover:bg-sky-400/8 transition-all duration-200"
          @click="menuOpen = !menuOpen" aria-label="菜单">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <template v-if="!menuOpen">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </template>
            <template v-else>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </template>
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition
      enter-active-class="transition-all duration-250 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul v-if="menuOpen" class="md:hidden flex flex-col bg-white/98 backdrop-blur-md border-b border-sky-400/10 px-5 pb-4">
        <li v-for="(item, index) in navItems" :key="item.name">
          <a :href="item.path"
            class="block px-4 py-3 rounded-xl text-[15px] font-medium text-gray-500
                   hover:text-sky-400 hover:bg-sky-400/8 transition-all duration-200"
            :class="{ '!text-sky-400 !font-semibold !bg-sky-400/8': activeIndex === index }"
            @click.prevent="navigate(index)"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </transition>
  </nav>
</template>
