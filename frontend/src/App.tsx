import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { SuperJSON } from 'superjson';
import { router } from "./router";
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:8080/trpc',
					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							authorization: "",
						};
					},
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: 'include',
						})
					},
				}),
			],
			transformer: SuperJSON
		}),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
