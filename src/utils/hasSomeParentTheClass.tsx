export function hasSomeParentTheClass(element: HTMLElement, classname: string): boolean {
  if (!element || !('classList' in element))
    return false;
  if (element.classList.contains(classname))
    return true;
  return (element.parentNode && hasSomeParentTheClass(element.parentNode as HTMLElement, classname)) ?? false;
}
