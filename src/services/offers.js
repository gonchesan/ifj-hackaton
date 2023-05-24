export async function getAllOffers(query) {
  const resp = await fetch(`https://api.infojobs.net/api/9/offer?q=${query}`, {
    headers: {
      Authorization: `Basic MDliMTk0MjE4YmFkNGEyYzg1MDU4YjRkNGJiMTkwMTQ6RENUa05lamRRL3plRXBPN1VjQit0cXZlczBsbDRsMjZHZkFSYnd0RVY1M2JidkMralg=`,
    },
  });
  const items = resp.json();
  return items;
}

export async function getOfferById(id) {
  const resp = await fetch(`https://api.infojobs.net/api/9/offer/${id}`, {
    headers: {
      Authorization: `Basic MDliMTk0MjE4YmFkNGEyYzg1MDU4YjRkNGJiMTkwMTQ6RENUa05lamRRL3plRXBPN1VjQit0cXZlczBsbDRsMjZHZkFSYnd0RVY1M2JidkMralg=`,
    },
  });
  const item = resp.json();
  return item;
}
