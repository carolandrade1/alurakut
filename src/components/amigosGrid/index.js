import styled from 'styled-components';

const AmigosGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 46px;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 
      "profileArea seguindoArea seguidoresArea";
    grid-template-columns: 160px 1fr 1fr;
  }
`;

export default AmigosGrid;