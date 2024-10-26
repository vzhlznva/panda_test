import { defineStore } from "pinia";
import { ref } from "vue";
import { LocationItem } from "../types/geo";

export const useBlocksStorage = defineStore("data", () => {
  const blocks = ref<LocationItem[]>([] as LocationItem[]);

  const addBlock = (item: LocationItem) => {
    blocks.value.push(item);
  };

  return { addBlock, blocks };
});
