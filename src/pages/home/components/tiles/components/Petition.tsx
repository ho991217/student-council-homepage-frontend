import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PetitonType } from 'pages/home/Home';

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

const Span = styled.span`
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

function Petition({ petition }: { petition: PetitonType[] }) {
  return (
    <Wrapper>
      {petition.map((petition) => (
        <P key={petition.id}>
          <Span>[{petition.petitionStatus}]</Span>
          <Link to={`/board-petition/board?id=${petition.id}`}>
            {petition.title}
          </Link>
        </P>
      ))}
    </Wrapper>
  );
}

export default Petition;
