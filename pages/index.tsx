import { normalizeString } from "@/utils/data/places";
import Head from "next/head";

export default function Home() {
  const defaultTopSearches = [
    ["Bogotá", "Historian"],
    ["Brasilia", "Software Developer"],
    ["Santiago", "Teacher"],
    ["Ottawa", "Doctor"],
    ["Rome", "Chef"],
    ["Paris", "Artist"],
    ["Madrid", "Journalist"],
  ];
  return (
    <>
      <Head>
        <title>{`Best places in for your profession`}</title>
        <meta
          name="description"
          content={`Discover the best places for your profession`}
        />
        <meta
          name="keywords"
          content={`places, job, city, profession, country, search, discover`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <h4> Top searches: </h4>
      <ul>
        {defaultTopSearches.map((search) => (
          <li key={search[0]}>
            <a
              href={`/${normalizeString(search[0])}/${normalizeString(
                search[1]
              )}`}
            >
              {search[1]} in {search[0]}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
