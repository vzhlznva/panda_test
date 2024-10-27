import { defineStore } from "pinia";
import { ref } from "vue";
import { LocationBlock, LocationItem } from "../types/geo";
import { WeatherService } from "../services/weather";
import { useApi } from "../composable/useApi";

export const useBlocksStorage = defineStore("data", () => {
  const blocks = ref<LocationBlock[]>([]);
  const currentBlock = ref<LocationBlock>(blocks.value[0]);
  const currentIndex = ref<number | null>(0);

  const addBlock = (item: LocationBlock) => {
    blocks.value.push(item);
  };

  const selectBlock = (i: number) => {
    currentBlock.value = blocks.value[i];
    currentIndex.value = i;
  };

  const setCurrentCity = (block: LocationBlock) => {
    currentBlock.value = block;
    blocks.value[currentIndex.value as number] = block;
  };

  const deleteBlock = (index: number) => {
    if (index === currentIndex.value) {
      if (index === blocks.value.length - 1) {
        if (blocks.value.length > 1) {
          selectBlock(index - 1);
        } else {
          (currentBlock.value = {
            location: null,
            weather: null,
          }),
            (currentIndex.value = null);
        }
      } else {
        selectBlock(index);
      }
    }
    blocks.value.splice(index, 1);

    if (currentIndex.value !== null && currentIndex.value > index) {
      currentIndex.value--;
    }
  };

  return {
    addBlock,
    selectBlock,
    setCurrentCity,
    deleteBlock,
    blocks,
    currentBlock,
    currentIndex,
  };
});
