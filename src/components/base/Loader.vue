<script setup lang="ts">
import { CssUnitRe } from '/@src/utils/regex'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
    validator: (value: string) => {
      if (value.match(CssUnitRe) === null) {
        console.warn(
          `G-Placeloader: invalid "${value}" width. Should be a valid css unit value.`
        )
      }
      return true
    },
  },
  height: {
    type: String,
    default: '100%',
    validator: (value: string) => {
      if (value.match(CssUnitRe) === null) {
        console.warn(
          `G-Placeloader: invalid "${value}" height. Should be a valid css unit value.`
        )
      }
      return true
    }
  }
})
</script>

<template>
  <div class="placeloader loads" :class="[]">
    <video src="/~/vids/loading.webm" loop autoplay></video>
  </div>
</template>

<style scoped>
.placeloader {
  width: v-bind(width);
  height: v-bind(height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black-800);
}
</style>