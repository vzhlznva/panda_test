<script setup lang="ts">
import { useBlocksStorage } from '../state/blocks';

const storage = useBlocksStorage()

</script>

<template>
  <div class="main-block">
    <Header />
    <FavoriteCard v-for="fav in storage.favorites" :key="fav.city" :location="fav" />
  </div>
</template>

<style lang="scss" scoped>
.main-block {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;
}
</style>