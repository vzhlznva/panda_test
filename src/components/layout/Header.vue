<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const isSidebarExists = useMediaQuery('(max-width: 950px)')
</script>

<template>
  <div class="main-block__head">
    <Sidebar v-if="isSidebarExists" />
    <div class="inner">
      <h1>WEATHER APP</h1>
      <CitySearch />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.main-block__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: var(--black2-800);
  z-index: 2;

  @media screen and (max-width: 950px) {
    position: fixed;
    left: 0;
  }

  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding: 40px 0 10px 0;
    position: sticky;
    top: 0;
    background-color: var(--black2-800);
    z-index: 2;

    @media screen and (max-width: 950px) {
      padding: 0px 20px 10px 20px;
      margin: 30px auto 0;
      top: 0px;
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  h1 {
    margin: 0 0 10px 0;

    @media screen and (max-width: 950px) {
      font-size: var(--h2);
    }
  }
}
</style>