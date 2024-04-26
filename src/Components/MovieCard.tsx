import React, { useEffect, useState } from "react";
import { CreditTypes, Movie } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchCredits } from "../helpers";

interface MovieCardProps extends Movie {
  genres: Array<string>;
}

const MovieCard = ({
  id,
  genres,
  posterPath,
  title,
  overview,
}: MovieCardProps) => {
  const [cast, setCast] = useState<CreditTypes>({
    directors: [],
    writers: [],
    stars: [],
  });

  const [showCast, setShowCast] = useState(false);

  const [showDescription, setShowDescription] = useState(true);

  const {
    data: fetchedCredits,
    isLoading: areCreditsFetching,
    isError: creditsFetchError,
    refetch: refetchCredits,
  } = useQuery({
    queryKey: ["credits", id],
    queryFn: () => fetchCredits(id),
    enabled: false,
  });

  useEffect(() => {
    if (fetchedCredits?.directors.length) setCast(fetchedCredits);
  }, [fetchedCredits]);

  const handleShowCast = () => {
    if (!cast.directors.length) refetchCredits();
    setShowCast(!showCast);
    setShowDescription(showCast);
  };

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
    !showDescription && setShowCast(false);
  };

  return (
    <div
      className="bg-cover bg-center h-screen mb-8 rounded-[50px] shadow-lg flex flex-col-reverse"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
      }}
    >
      <div className="bg-white px-4 py-2 rounded-[50px] min-h-96 relative flex flex-col">
        <div className="flex w-full min-h-24">
          <div className="absolute top-[-50px]">
            <img
              className="object-cover w-[33%] rounded-2xl shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
            />
          </div>
          <div className="w-full flex place-content-end">
            <div className="w-[65%]">
              <p className="text-center font-bold text-sm mb-2">{title}</p>
              <div className="flex flex-wrap gap-1 mx-auto justify-center">
                {genres.map((genreName) => (
                  <p
                    key={genreName}
                    className="bg-gray-700 text-[10px] flex justify-center items-center text-white py-1 px-2 rounded-2xl  whitespace-nowrap"
                  >
                    {genreName}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-left mt-1">
          <p>
            {overview.length > 150 ? `${overview.slice(0, 150)}...` : overview}
          </p>
        </div>
        <div
          className="text-left mt-3 flex gap-2 items-center cursor-pointer"
          onClick={handleShowCast}
        >
          <p className="text-sm font-bold">Cast and Credits</p>
          <i
            className={
              showCast ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
            }
          ></i>
        </div>
        {areCreditsFetching && <>fetching credits.....</>}
        {showCast && cast.directors.length ? (
          <>
            {Object.keys(cast).map((castType: string, index) => {
              return (
                <div
                  key={`${castType}-${index}`}
                  className="text-left flex gap-2 mt-1"
                >
                  <h1 className="capitalize font-semibold text-sm">{`${castType}:`}</h1>
                  <p className="text-sm">
                    {(cast[castType as keyof CreditTypes] || []).join(", ")}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
