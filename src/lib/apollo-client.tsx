import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const httpLink = createHttpLink({
  uri: BASE_URL,
});

export const createApolloClient = (token:string | null) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const clientLogin = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
