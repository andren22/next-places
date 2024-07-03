import Place from "@/components/place";

interface Props {
  place_list: Place[];
}

export default function PlaceList({ place_list }: Props) {
  return (
    <div className="container-md p-0 mx-0 my-3">
      <div className="row row-cols-auto">
        {place_list.map((place) => (
          <div className="col" key={place.name}>
            <Place place={place} />
          </div>
        ))}
      </div>
    </div>
  );
}
