import { defineStore } from "pinia";
import { ref } from "vue";
import { LocationBlock, LocationItem } from "../types/geo";
import { useLocalStorage } from "@vueuse/core";
import useNotyf from "../composable/useNotyf";

export const useBlocksStorage = defineStore("data", () => {
  const blocks = ref<LocationBlock[]>([]);
  const currentBlock = ref<LocationBlock>(blocks.value[0]);
  const currentIndex = ref<number | null>(0);
  const favorites = useLocalStorage<LocationItem[]>("favorites", []);

  const notyf = useNotyf();

  const addBlock = (item: LocationBlock) => {
    if (
      blocks.value.findIndex(
        (block: LocationBlock) =>
          block.location?.latitude == item.location?.latitude &&
          block.location?.longitude == item.location?.longitude &&
          block.location?.city == item.location?.city
      ) == -1
    ) {
      blocks.value.push(item);
    } else {
      notyf.error("Location is already exists");
    }
  };

  const selectBlock = (i: number) => {
    currentBlock.value = blocks.value[i];
    currentIndex.value = i;
  };

  const addFavorite = (block: LocationBlock, i: number) => {
    if (
      !favorites.value.find(
        (fav: LocationItem) =>
          fav.longitude == block.location?.longitude &&
          fav.latitude == block.location?.latitude &&
          fav.city == block.location?.city
      )
    ) {
      favorites.value.push(block.location as LocationItem);
      blocks.value[i].fav = true;
    }
  };

  const removeFavorite = (block: LocationBlock, i: number) => {
    const index = favorites.value.findIndex(
      (fav: LocationItem) =>
        fav.latitude == block.location?.latitude &&
        fav.longitude == block.location.longitude &&
        fav.city == block.location.city
    );
    if (index !== -1) {
      favorites.value.splice(index, 1);
      blocks.value[i].fav = false;
    }
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
    addFavorite,
    removeFavorite,
    blocks,
    currentBlock,
    currentIndex,
  };
});
