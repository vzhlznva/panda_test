<template>
  <div>
    <main>
      <Sidebar />
      <RouterView v-slot="{ Component }">
        <transition name="fade-fast" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
main {
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  padding: 40px 0;
  margin: 0 auto;
}
</style>