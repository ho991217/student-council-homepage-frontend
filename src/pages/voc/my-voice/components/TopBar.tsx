import React from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const InfoBox = styled.div`
  max-width: 1290px;
  height: 200px;
  width: 100%;
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  background-color: #f9f9f9;
  border: 1px solid #808080;
  margin-bottom: 28px;
  display: flex;
  justify-content: flex-start;
`;

const LeftDiv = styled.div`
  width: 25%;
  height: 100%;
  border-right: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function TopBar() {
  return (
    <InfoBox>
      <LeftDiv>
        <BiSearchIcon />
        <p>검색어로 찾기</p>
      </LeftDiv>
    </InfoBox>
  );
}

export default TopBar;

const BiSearchIcon = styled(BiSearch)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d4d4d4;
  padding: 5px;
  margin-bottom: 10px;
`;
