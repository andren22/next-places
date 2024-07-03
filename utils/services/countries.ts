interface CountryInfo {
  capital: string[]
  name: {
    common: string
  }
  flag: string
}

export async function fetchCountries(): Promise<CountryInfo[]> {
  const response = await fetch('https://restcountries.com/v3.1/all');
  return await response.json();
};

export async function getCities(): Promise<string[]> {
  const countries = await fetchCountries()
  const cities: string[] = []

  for (const country of countries) {
    if (!country.capital || country.capital.length < 1) {
      continue
    }

    cities.push(country.capital[0])
  }

  return cities
}