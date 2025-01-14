
import React, { ComponentProps, ReactNode, useRef } from 'react';
import { dispatchCustomEvent, LineAnchorData, useCustomEvent } from './CustomEvents';
import styled from '@emotion/styled';
import { JSX } from 'react/jsx-runtime';

export const LineDrawingCanvas = ({ scrollParent }: { scrollParent: HTMLElement | null }) => {
  const ref = React.useRef<SVGSVGElement>(null)

  const [state, setState] = React.useState([] as LineAnchorData[])

  // useCustomEvent('scrollUpdate', () => updateLines());

  useCustomEvent('addLineAnchor', ({ detail }) => {
    setState(s => [...(s.filter(e => document.body.contains(e.el) && e.el != detail.el)), detail])

    // updateLines()
  })

  const lines: { [id: number]: HTMLElement[] } = {}
  for (const s of state) {
    if (lines[s.anchorId]) {
      lines[s.anchorId].push(s.el)
    } else {
      lines[s.anchorId] = [s.el]
    }
  }

  const svgLines: ReactNode[] = [];
  const parentRect = scrollParent?.getBoundingClientRect();
  const parentParentRect = scrollParent?.parentElement?.getBoundingClientRect();

  const totalScrollLeft = getSumOfInverseRecursiveProperty(scrollParent, 'scrollLeft');
  const xOffset = (parentRect?.x ?? 0) - 2 * (parentParentRect?.x ?? 0) + 2 * totalScrollLeft;

  const totalScrollTop = getSumOfInverseRecursiveProperty(scrollParent, 'scrollTop');
  const yOffset = (parentRect?.y ?? 0) - 2 * (parentParentRect?.y ?? 0) + 2 * totalScrollTop - 20;// No clue why the 2*
  Object.values(lines).forEach(els => {

    for (let i = 0; i < els.length - 1; i++) {
      const x1 = els[i].getBoundingClientRect().x + xOffset
      const y1 = els[i].getBoundingClientRect().y + yOffset
      const x2 = els[i + 1].getBoundingClientRect().x + xOffset
      const y2 = els[i + 1].getBoundingClientRect().y + yOffset
      svgLines.push(<line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={0.5} stroke='red' />)
    }
  })


  return <svg ref={ref} style={{ height: '100%', width: '100%' }}>
    {svgLines}
  </svg>
}

const getSumOfInverseRecursiveProperty = (el: HTMLElement | null, prop: keyof HTMLElement): any => {
  if (!el) {
    return 0;
  }
  if (!el.parentElement) {
    return el[prop]
  } else {
    return el[prop] + getSumOfInverseRecursiveProperty(el.parentElement, prop)
  }
}

interface LineMarkerProps extends Omit<ComponentProps<typeof LineMarkerDiv>, 'id'> {
  id: number;
}

export const LineMarker = ({ id, ...props }: LineMarkerProps) => {

  return <LineMarkerDiv
    ref={(el) => {
      if (el) {
        dispatchCustomEvent('addLineAnchor', { anchorId: id, el });
      }
    }}
    {...props}
  />
}

const LineMarkerDiv = styled.div`
  height: 1px;
  width: 1px;
`




// const updateLines = () => {
//   return;
//   if (!ref.current) {
//     return;
//   }
//   const { height, width } = ref.current.getBoundingClientRect();

//   const ctx = ref.current.getContext('2d')
//   if (!ctx) {
//     return
//   }

//   console.log(state)
//   ctx.clearRect(0, 0, width, height);

//   const lines: { [id: number]: HTMLElement[] } = {}
//   for (const s of state) {
//     if (lines[s.anchorId]) {
//       lines[s.anchorId].push(s.el)
//     } else {
//       lines[s.anchorId] = [s.el]
//     }
//   }

//   Object.values(lines).forEach((els) => {
//     console.log(els)
//     ctx.beginPath();
//     els.forEach((e, i) => {
//       const { x, y } = e.getBoundingClientRect();
//       if (i == 0) {
//         ctx.moveTo(x, y);
//       } else {
//         // // @ts-expect-error idk
//         // const line = new LeaderLine(els[0], e, { color: 'red' });
//         ctx.lineTo(x, y)
//       }
//     })
//     ctx.stroke()
//   })
// }