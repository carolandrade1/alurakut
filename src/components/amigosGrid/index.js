import styled from 'styled-components';

const AmigosGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  
  @media(min-width: 860px) {
    max-width: 1110px;
    display: flex;
  }
`;

export default AmigosGrid;