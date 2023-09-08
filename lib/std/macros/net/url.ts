
export function $url(uri: string|URL,base?: string|URL): URL {
  return new URL(uri,base);
}