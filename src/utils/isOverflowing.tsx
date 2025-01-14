/**
 *
// Determines if the passed element is overflowing its bounds,
// either vertically or horizontally.
// Will temporarily modify the "overflow" style to detect this
// if necessary.
 * @param el
 * @returns [horizontal, vertical]
 */
export function isOverflowing(el: HTMLElement) {
  const curOverflow = el.style.overflow;

  if (!curOverflow || curOverflow === 'visible')
    el.style.overflow = 'hidden';

  const hor = el.clientWidth < el.scrollWidth;
  const ver = el.clientHeight < el.scrollHeight;
  // const is = Math.abs(el.clientHeight - el.scrollHeight) > 30;
  // console.log(el.clientWidth, el.scrollWidth, el.clientHeight, el.scrollHeight);
  el.style.overflow = curOverflow;

  return [hor, ver] as [boolean, boolean];
}
