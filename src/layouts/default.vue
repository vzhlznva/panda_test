<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const isSidebarExists = useMediaQuery('(min-width: 951px)')

</script>
<template>
  <div>
    <main>
      <Sidebar v-if="isSidebarExists" />
      <RouterView v-slot="{ Component }">
        <Suspense>
          <transition name="fade-fast" mode="out-in">
            <component :is="Component" />
          </transition>
        </Suspense>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 0 0 40px;
  margin: 0 auto;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
}
</style>