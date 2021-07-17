import styled from 'styled-components';
import Box from '../Box';

const PostBox = styled(Box)`
  ul {
    display: flex;
    flex-direction: column;
    height: auto;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  li {
    display: flex;
    padding: 10px 0;
  }
  a {
    display: inline-block;
    height: 70px;
    width: 70px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
  div {
    padding-left: 10px;
  }
  span {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
  }
`;

export default PostBox;