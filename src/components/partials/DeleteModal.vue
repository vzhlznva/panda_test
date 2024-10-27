<script setup lang="ts">
import { ref } from 'vue';
import { useBlocksStorage } from '/@src/state/blocks';

const props = defineProps<
  {
    index: number;
  }
>()

const modal = ref<Modal | null>(null)
const storage = useBlocksStorage()

const handleDelete = () => {
  storage.deleteBlock(props.index);
  modal.value?.close()
}

defineExpose({
  open: () => modal.value?.open(),
  close: () => modal.value?.close()
})
</script>

<template>
  <Modal ref="modal">
    <template #title>
      Delete
    </template>
    <div class="delete-body">
      <h2>Are you sure you want to delete location?</h2>
      <div class="delete-body__actions">
        <button @click="handleDelete">Yes</button>
        <button class="decline" @click="modal?.close()">No</button>
      </div>
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