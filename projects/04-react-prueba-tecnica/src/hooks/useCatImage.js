import { useEffect, useState } from "react";
import { getCatImage } from "../services/facts";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ", 3).join(" ");
    getCatImage(threeFirstWords).then(imageUrl => setImageUrl(imageUrl));
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` };
}
