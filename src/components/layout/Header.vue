<script setup lang="ts">

</script>

<template>
  <div class="main-block__head">
    <h1>WEATHER APP</h1>
    <CitySearch />
  </div>
</template>

<style lang="scss" scoped>
.main-block__head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: 40px 0 10px 0;
  position: sticky;
  top: 0;
  background-color: var(--black2-800);
  z-index: 99999999;

  h1 {
    margin: 0 0 10px 0;
  }
}
</style>