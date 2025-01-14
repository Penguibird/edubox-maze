export default function smoothClampNoRem(minFontSize: number, maxFontSize: number, minWidthPx = 375, maxWidthPx = 1920) {
  // const root = document.querySelector('html') as Element;
  // const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

  const minWidth = minWidthPx;
  const maxWidth = maxWidthPx;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  return `clamp( ${minFontSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxFontSize}px )`;
}
