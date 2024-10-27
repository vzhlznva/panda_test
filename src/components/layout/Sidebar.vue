<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const isSidebarActive = ref<boolean>(false)

</script>

<template>
  <div class="sidebar" :class="{ 'active': isSidebarActive }">
    <IWeatherBurger class="sidebar-burger" @click="isSidebarActive = !isSidebarActive" />
    <div class="sidebar-divider"></div>
    <div class="sidebar-menu">
      <RouterLink :to="{ name: 'index' }" class="sidebar-menu__item" :class="{ 'active': route.name == 'index' }">
        <IWeatherDashboard class="sidebar-menu__item-icon" />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink :to="{ name: 'favourites' }" class="sidebar-menu__item"
        :class="{ 'active': route.name == 'favourites' }">
        <IWeatherHeart class="sidebar-menu__item-icon" />
        <span>Favourites</span>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 84px;
  min-width: 84px;
  background-color: var(--black-800);
  border-radius: 32px;
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  padding: 48px 0 0;
  align-items: center;
  transition: min-width 0.25s ease;
  height: calc(100vh - 80px);


  &.active {
    min-width: 180px;
    width: fit-content;

    .sidebar-menu__item {


      span {
        left: 64px;
      }
    }
  }

  &-burger {
    cursor: pointer;
  }

  &-divider {
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #1E1E1E 0%, #4A4949 48%, #1E1E1E 100%);
    margin: 24px 0;
  }

  &-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    &__item {
      padding: 16px 30px;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      width: 100%;
      transition: background 0.25s ease;
      background: transparent;
      cursor: pointer;
      color: var(--white);
      text-decoration: none;
      position: relative;

      &.active {
        background: -moz-linear-gradient(90deg, rgba(183, 183, 183, 1) 0%, rgba(31, 31, 31, 0.5) 5%, rgba(255, 255, 255, 0.1) 51%, rgba(31, 31, 31, 0.5) 100%);
        background: -webkit-linear-gradient(90deg, rgba(183, 183, 183, 1) 0%, rgba(31, 31, 31, 0.5) 5%, rgba(255, 255, 255, 0.1) 51%, rgba(31, 31, 31, 0.5) 100%);
        background: linear-gradient(90deg, rgba(183, 183, 183, 1) 0%, rgba(31, 31, 31, 0.5) 5%, rgba(255, 255, 255, 0.1) 51%, rgba(31, 31, 31, 0.5) 100%);

        .sidebar-menu__item-icon {
          fill: var(--white);
          stroke: var(--white);
        }
      }

      &-icon {
        height: 24px !important;
        width: 24px !important;
        fill: none;
        stroke: #5e5e5e;
        transition: fill 0.25s ease, stroke 0.25s ease;
      }

      span {
        position: absolute;
        left: 100%;
        transition: left 0.25s ease-in-out;
      }
    }
  }
}
</style>