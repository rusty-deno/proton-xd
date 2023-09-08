
/**
 * Just a short-cut macro of native {@linkcode URL} constructor
 */
export function $url(uri: string|URL,base?: string|URL): URL {
  return new URL(uri,base);
}