import axios from 'axios';
import Block from 'components/Block';
import styled from 'styled-components';

import sampleImage from 'static/images/samples/hierachy.png';

import { useState, useEffect } from 'react';
import SideNav from 'components/nav/SideNav';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Img = styled.img`
  width: 100%;
`;

function Organization() {
  // const [url, setUrl] = useState('');
  // const getImages = async () => {
  //   axios.get('https://picsum.photos/1200/620').then((res) => {
  //     setUrl(res.request.responseURL);
  //   });
  // };
  // useEffect(() => {
  //   getImages();
  // }, []);
  return (
    <Wrapper>
      <SideNav/>
      <Block 
        title="조직도" 
        contents={<Img src={sampleImage} alt=""/>} 
        hasSideNav
      />
    </Wrapper>
  );
}

export default Organization;
