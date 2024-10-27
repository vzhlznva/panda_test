<script setup lang="ts">
import { useBlocksStorage } from '../state/blocks';

const storage = useBlocksStorage()

</script>

<template>
  <div class="main-block">
    <div class="main-block__head">
      <h1>WEATHER APP</h1>
      <CitySearch />
    </div>
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
  padding: 121px 0 0;

  &__head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    max-width: 1092px;
    position: fixed;
    top: 0;
    height: 97px;
    background-color: var(--black2-800);
    z-index: 99999999;
    padding: 0 0 10px 0;

    h1 {
      margin: 0 0 5px 0;
    }
  }
}
</style>