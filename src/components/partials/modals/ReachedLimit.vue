<script setup lang="ts">
import { ref } from 'vue';
import { useBlocksStorage } from '/@src/state/blocks';

const modal = ref<Modal | null>(null)
const storage = useBlocksStorage()

defineExpose({
  open: () => modal.value?.open(),
  close: () => modal.value?.close()
})
</script>

<template>
  <Modal ref="modal">
    <template #title>
      Reached favorites limit
    </template>
    <div class="delete-body">
      <h2>You have reached the limit of 5 favorites. Please, delete one location and try again</h2>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.delete-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  justify-content: space-between;

  h2 {
    max-width: 300px;
    text-align: center;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    gap: 24px;
    max-width: 300px;
    width: 100%;

    button {
      outline: none;
      border-radius: 16px;
      padding: 16px 24px;
      width: 100%;
      background-color: var(--white);

      &.decline {
        border: 1px solid var(--white);
        color: var(--white);
        background-color: transparent;
      }
    }
  }
}
</style>