import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RecentConferencesType } from 'pages/home/Home';

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

function Proceeding({
  conference,
}: {
  conference: RecentConferencesType[];
}): JSX.Element {
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
