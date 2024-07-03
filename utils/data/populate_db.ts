import { fetchCountries } from "../services/countries"
import { getAllPlaces } from "../services/places"
import PocketBase from 'pocketbase';
import { normalizeString } from "./places";

const pb = new PocketBase(process.env.DATABASE_URL);

export async function populateDB() {
  const countries = await fetchCountries()

  for (const country of countries) {
    if (!country.capital || country.capital.length < 1) {
      continue
    }

    const city = country.capital[0]
    const placesByProfession = getAllPlaces()

    for (const profession in placesByProfession) {
      for (const place of placesByProfession[profession]) {
        const record = await pb.collection('places').create({ // TODO: Bulk create
          name: place,
          country: country.name?.common || "",
          city: city,
          cityNormalized: normalizeString(city),
          profession: profession,
          professionNormalized: normalizeString(profession),
          countryFlag: country.flag || "",
        });
      }
    }
  }
}

