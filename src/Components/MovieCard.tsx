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
      className="bg-cover bg-center h-screen mb-8 rounded-[50px] bg-white shadow-lg flex flex-col-reverse"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
      }}
    >
      <div className="bg-white px-4 py-2 rounded-[50px] min-h-96 relative flex flex-col">
        <div className="flex w-full min-h-28">
          <div className="absolute top-[-50px]">
            <img
              className="object-cover w-[33%] rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
            />
          </div>
          <div className="w-full flex place-content-end ">
            <div className="w-[65%]">
              <h5 className="text-center font-bold text-sm mb-2">{title}</h5>
              <div className="flex flex-wrap gap-1 mx-auto justify-center">
                {genres.map((genreName) => (
                  <p className="bg-gray-700 text-[10px] flex justify-center items-center text-white py-1 px-2 rounded-2xl  whitespace-nowrap">
                    {genreName}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-left hover:font-semibold mt-4 flex gap-2 items-center cursor-pointer"
          onClick={handleShowDescription}
        >
          <p>Description</p>
          <i
            className={
              showDescription ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
            }
          ></i>
        </div>
        {showDescription ? (
          <>{overview.length > 200 ? overview.slice(0, 100) : overview}</>
        ) : (
          <></>
        )}
        <div
          className="text-left hover:font-semibold mt-4 flex gap-2 items-center cursor-pointer"
          onClick={handleShowCast}
        >
          <p>Cast and Credits</p>
          <i
            className={
              showCast ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
            }
          ></i>
        </div>
        {areCreditsFetching && <>fetching credits.....</>}
        {showCast && cast.directors.length ? (
          <>
            {Object.keys(cast).map((castType: string) => {
              return (
                <div className="text-left flex gap-2 mt-2">
                  <h1 className="capitalize font-semibold">{`${castType}:`}</h1>
                  <p>
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
