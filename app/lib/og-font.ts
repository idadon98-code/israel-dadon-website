/**
 * Fetches a Heebo weight from Google Fonts as a TrueType binary for use
 * with next/og's ImageResponse (which needs raw font bytes, not a
 * stylesheet link). Requesting the CSS without a browser User-Agent
 * makes Google serve a single non-subsetted `format('truetype')` file
 * covering both Hebrew and Latin glyphs, instead of the modern
 * woff2/unicode-range split meant for browsers.
 */
export async function loadHeeboFont(weight: 400 | 500 | 700): Promise<ArrayBuffer> {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Heebo:wght@${weight}`)
  ).text();

  const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/);
  if (!match) {
    throw new Error(`Could not resolve a truetype URL for Heebo weight ${weight}`);
  }

  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}
