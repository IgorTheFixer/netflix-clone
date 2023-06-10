import React from 'react';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useMoviesList from '@/hooks/useMovieList';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        {/* <MovieList title="My List" data={favorites} /> */}
      </div>
    </>
  )
}
