<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { changeLocale, locales, localeType } from '/@src/i18n';

const isDropdownActive = ref<boolean>(false);
const switchItem = ref()

const returnLangLabel = (lang: localeType) => {
  return lang === 'uk' ? 'Укр' : 'Eng'
}

onClickOutside(switchItem, () => {
  isDropdownActive.value = false;
})
</script>

<template>
  <div class="switch" @click="isDropdownActive = !isDropdownActive" ref="switchItem"
    :class="{ 'active': isDropdownActive }">
    <div class="switch-label">
      <p>{{ returnLangLabel($i18n.locale as localeType) }}</p>
      <IWeatherDownArrow />
    </div>
    <div class="switch-dropdown" :class="{ 'active': isDropdownActive }">
      <div class="switch-dropdown__item" v-for="lang in locales" @click="$i18n.locale = lang; changeLocale(lang)">
        <div class="switch-dropdown__item-inner" v-if="lang != $i18n.locale">
          <p>{{ returnLangLabel(lang) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  margin: 0 3px 0 0;
  color: var(--white);
  text-transform: uppercase;
  position: relative;

  &.active {
    .switch-label {
      p {
        opacity: 0.3;
      }
    }
  }

  &-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &:hover {
      p {
        opacity: 0.3;
      }
    }

    p {
      color: var(--white);
      text-transform: uppercase;
      transition: opacity 0.25s ease;
      font-size: var(--small);
    }

  }

  &-dropdown {
    opacity: 0;
    max-height: 0px;
    padding: 16px 8px;
    background-color: var(--black-700);
    top: 20px;
    left: -8px;
    color: var(--white);
    position: absolute;
    transform: scaleY(0);
    transform-origin: top;
    transition: opacity 0.25s, max-height 0.25s, transform 0.25s ease;
    border-radius: 10px;
    width: 100%;
    z-index: 3;

    &.active {
      opacity: 1;
      max-height: 100px;
      transform: scaleY(1);
    }

    &__item {
      cursor: pointer;

      p {
        font-size: var(--small);
      }

    }
  }
}
</style>