import PlaceList from "@/components/place_list";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function () {
  const router = useRouter();
  const { query } = router.query;
  const [data, setData] = useState([] as Place[]);
  const queryTerm = query || "";

  useEffect(() => {
    if (!queryTerm) {
      return;
    }

    const params = new URLSearchParams({
      query: queryTerm.toString(),
    });

    const fetchData = async () => {
      const response = await fetch(`/api/places?${params.toString()}`);
      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      setData(data.places_list);
    };

    fetchData();
  }, [queryTerm]);

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
      {data && data.length > 0 ? (
        <>
          <h4>Results for: {queryTerm}</h4>
          <PlaceList place_list={data} />
        </>
      ) : (
        <h4>No results for: {queryTerm}</h4>
      )}
    </>
  );
}
