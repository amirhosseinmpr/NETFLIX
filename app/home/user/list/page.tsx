import { MovieCard } from "@/app/components/MovieCard";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      movie : {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          overview: true,
          release: true,
          id: true,
          watchLists: true,
          youtubeString: true,
        },
      },
    },
  });

  return data;
}

export default async function Watchlist() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <>
      <h1 className="text-white text-4xl font-bold underline mt-10 px-5 sm:px-0">
        Your watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data.map((i) => (
          <div key={i.movie?.id} className="relative h-60">
            <Image
              src={i.movie?.imageString as string}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={i.movie?.imageString as string}
                  alt="Movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  key={i.movie?.id}
                  age={i.movie?.age as number}
                  movieId={i.movie?.id as string}
                  overview={i.movie?.overview as string}
                  time={i.movie?.duration as number}
                  title={i.movie?.title as string}
                  wachtListId={i.movie?.watchLists[0]?.id as string}
                  watchList={
                    (i.movie?.watchLists.length as number) > 0
                      ? true
                      : false
                  }
                  year={i.movie?.release as number}
                  youtubeUrl={i.movie?.youtubeString as string}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

