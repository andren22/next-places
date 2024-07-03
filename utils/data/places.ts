import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.DATABASE_URL);

export async function getPlacesByCityAndProfession(city: string, profession: string): Promise<Place[]> {
  const result = await pb.collection('places').getList(1, 20, {
    filter: pb.filter("cityNormalized = {:city} && professionNormalized = {:profession}",
      { city: city, profession: profession }
    )
  });

  const items = result.items as unknown as Place[]

  return items
}

export async function queryPlacesByCityOrProfession(queryTerm: string): Promise<Place[]> {
  if (!queryTerm) {
    return []
  }

  const result = await pb.collection('places').getList(1, 20, {
    filter: pb.filter("cityNormalized ~ {:queryTerm} || professionNormalized ~ {:queryTerm}",
      { queryTerm: queryTerm }
    )
  });

  const items = result.items as unknown as Place[]

  return items
}

export function normalizeString(str: string): string {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim().replace(" ", "-")
}
