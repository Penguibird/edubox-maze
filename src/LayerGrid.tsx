import styled from "@emotion/styled";

export const LayerGrid = styled.div`
  position: relative;
  &>* {
    position: absolute;
    inset: 0;
  }
`