import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ConferenceProps } from 'pages/home/components/tiles/TileProps';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: 7px;
`;

// TODO: detail 내용 동적으로 바꾸기
function Proceeding(): JSX.Element {
  const [conference, setConference] = useState<ConferenceProps[]>([]);

  useEffect(() => {
    axios
      .get('/main')
      .then(function (response) {
        const result = response.data.data;
        setConference(result.recentConferences.slice(0, 4));
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      {conference.map((conference) => (
        <P key={conference.id}>
          <Link to="/conference">{conference.title}</Link>
        </P>
      ))}
    </Wrapper>
  );
}

export default Proceeding;
