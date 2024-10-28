export const getImageIcon = async (
  icon: string
): Promise<string | undefined> => {
  const weatherImages = import.meta.glob("/src/assets/images/weather/*.png");
  if (weatherImages[`/src/assets/images/weather/${icon}.png`]) {
    const module = await weatherImages[
      `/src/assets/images/weather/${icon}.png`
    ]();
    // @ts-ignore
    return module.default;
  } else return undefined;
};
