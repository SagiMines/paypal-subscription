export interface IFetchFromAPI {
  route: string;
  options?: {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers: HeadersInit | undefined;
    body: BodyInit | null | undefined;
  };
  value?: string | object;
}
