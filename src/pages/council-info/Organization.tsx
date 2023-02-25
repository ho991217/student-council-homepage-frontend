import axios from 'axios';
import Block from 'components/Block';
import styled from 'styled-components';

import sampleImage from 'static/images/samples/hierachy.png';

import { useState, useEffect } from 'react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <Block title="조직도" contents={<Img src={sampleImage} alt="" />} />
    </Wrapper>
  );
}

export default Organization;
