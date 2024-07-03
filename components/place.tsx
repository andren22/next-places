interface Props {
  place: Place;
}

export default function Place({ place }: Props) {
  return (
    <>
      <div className="card shadow p-3 mb-5 bg-body" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{place.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {place.countryFlag} {place.country}
          </h6>
          <p className="card-text">
            Located in the city of {place.city}, is one of the best places for{" "}
            {place.profession}s
          </p>
        </div>
      </div>
    </>
  );
}
