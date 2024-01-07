export * from "./dpi.ts";
export * from "./window.ts";
export * from "./dialog.ts";


/**
 * Content may be an URL or html/text
 */
export type Content=string|URL;
export type Theme="Dark"|"Light";


/**
 * serializes the Content enum
 */
export function toContent(content: Content): string {
  return JSON.stringify(isURL(content)? {
    Url: {
      url: content.toString()
    }
  }:{
    Html: {
      html: content
    }
  });
}

/**
 * checks if content is an URL
 */
export function isURL(content: Content): content is URL {
  return content instanceof URL||!content.trimStart().startsWith("<");
}