import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Pokemon {
  name: string;
  [key: string]: any;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints(builder) {
    return {
      getPokemonByName: builder.query<Pokemon, string>({
        query: name => `pokemon/${name}`,
      }),
    };
  },
});

export const { useGetPokemonByNameQuery } = pokemonApi;
