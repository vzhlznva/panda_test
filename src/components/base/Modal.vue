<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    closable?: boolean
  }>(),
  {
    closable: true
  }
)

const active = ref<boolean>(false)

const open = (): void => {
  active.value = true
}
const close = (): void => {
  if (props.closable) active.value = false
}

watch(
  () => active.value,
  () => {
    if (active.value) {
      document.body.classList.add("noscroll")
    } else {
      document.body.classList.remove("noscroll")
    }
  }
)
onUnmounted(() => document.body.classList.remove("noscroll"))

defineExpose({
  active,
  open,
  close
})
</script>

<template>
  <teleport to="body">
    <transition name="fade-slow">
      <div class="g-modal" v-if="active" @click.self="close()">
        <div class="g-modal-background" @click.self="close()"></div>
        <div class="g-modal-content">
          <div class="g-modal-card">
            <div class="g-modal-header">
              <p>
                <slot name="title">
                  Modal title
                </slot>
              </p>
              <slot name="close" :close="close" v-if="closable">
                <button class="g-modal-close" @click="close()"></button>
              </slot>
            </div>
            <div class="g-modal-body">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.g-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  z-index: 9999;

  &-background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: var(--black2-900);
    opacity: 0.8;
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }

  &-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 30vh;
    margin-bottom: 40px;
    background-color: var(--black-800);
    padding: 40px 36px;
    border-radius: 24px;
    position: relative;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 36px;

    p {
      font-size: var(--h3);
      font-weight: 700;
    }
  }

  &-body {
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    padding-bottom: 20px;
  }

  &-footer {
    padding-top: 16px;
  }

  &-close {
    position: relative;
    display: block;
    background-color: transparent;
    height: 24px;
    width: 24px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 1px;
      width: 14px;
      top: calc(50% - 0.5px);
      left: 5px;
      background-color: var(--white);
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>