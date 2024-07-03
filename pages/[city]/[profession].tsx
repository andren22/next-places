import PlaceList from "@/components/place_list";
import { getCities } from "@/utils/services/countries";
import { getProfessions } from "@/utils/services/places";
import {
  getPlacesByCityAndProfession,
  normalizeString,
} from "@/utils/data/places";
import Head from "next/head";

interface Props {
  place_list: Place[];
}

interface Params {
  city: string;
  profession: string;
}

export default function ({ place_list }: Props) {
  const city = place_list[0].city || "";
  const country = place_list[0].country || "";
  const profession = place_list[0].profession || "";

  return (
    <>
      <Head>
        <title>{`Best places in ${city} for ${profession}`}</title>
        <meta
          name="description"
          content={`Discover the best places for for ${profession}s in ${city} - ${country}.`}
        />
        <meta
          name="keywords"
          content={`places, job, city, profession, country, search, ${city}, ${profession}, ${country}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLD(place_list)),
          }}
        />
      </Head>
      <div>
        <h4>
          Top places in {city} for {profession}s
        </h4>
        <PlaceList place_list={place_list} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }: { params: Params }) {
  let place_list = await getPlacesByCityAndProfession(
    params.city,
    params.profession
  );

  return {
    props: {
      place_list: place_list,
    },
  };
}

export async function getStaticPaths() {
  let cities = await getCities();
  let professions = getProfessions();

  const paths = cities.flatMap((city) =>
    professions.map((profession) => ({
      params: {
        city: normalizeString(city),
        profession: normalizeString(profession),
      },
    }))
  );

  return { paths, fallback: false };
}

function buildJsonLD(place_list: Place[]) {
  const jsonLDItemList = place_list.map((place) => ({
    "@type": "Place",
    name: place.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: place.city,
      addressCountry: {
        "@type": "Country",
        name: place.country,
      },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: jsonLDItemList,
  };
}
