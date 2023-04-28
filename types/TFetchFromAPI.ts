type TFetchFromAPI = (
  route: string,
  options?: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: HeadersInit | undefined;
    body?: BodyInit | null | undefined;
    credentials?: 'include';
    Authorization?: string;
  }
) => Promise<Response>;
