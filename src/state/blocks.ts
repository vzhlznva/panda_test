import { defineStore } from "pinia";
import { ref } from "vue";
import { LocationBlock, LocationItem } from "../types/geo";
import { useLocalStorage } from "@vueuse/core";
import useNotyf from "../composable/useNotyf";
import { Weather } from "../types/weather";

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
      ) == -1 ||
      (item.location == null && item.weather == null)
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

  const addFavorite = (block: LocationItem, i?: number) => {
    if (
      !favorites.value.find(
        (fav: LocationItem) =>
          fav.longitude == block.longitude &&
          fav.latitude == block.latitude &&
          fav.city == block.city
      )
    ) {
      favorites.value.push(block);
      if (i !== undefined) blocks.value[i].fav = true;
    }
  };

  const removeFavorite = (
    block: LocationItem,
    i?: number,
    favOnly: boolean = false
  ) => {
    const index = favorites.value.findIndex(
      (fav: LocationItem) =>
        fav.latitude == block.latitude &&
        fav.longitude == block.longitude &&
        fav.city == block.city
    );
    if (index !== -1) {
      favorites.value.splice(index, 1);
      if (!favOnly && i) blocks.value[i].fav = false;
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

  const replaceWeather = (weather: Weather, i: number) => {
    blocks.value[i].weather = weather;
  };

  return {
    addBlock,
    selectBlock,
    setCurrentCity,
    deleteBlock,
    addFavorite,
    removeFavorite,
    replaceWeather,
    blocks,
    currentBlock,
    currentIndex,
    favorites,
  };
});
