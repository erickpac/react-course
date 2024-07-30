const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
  const data = await res.json();
  const { fact } = data;
  return fact;
};

export const getCatImage = async (threeFirstWords) => {
  const res = await fetch(
    `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`,
    { mode: "no-cors" }
  );

  const response = await res.json();
  const { _id } = response;
  const imageUrl = `/cat/${_id}/says/${threeFirstWords}`;

  return { imageUrl: imageUrl };
};
