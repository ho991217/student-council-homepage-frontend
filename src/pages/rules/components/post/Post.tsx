import styled from 'styled-components';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';
import DesktopDetail from './Desktop';
import MobileDetail from './Mobile';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray040};
`;

function Post() {
  return (
    <Container>
      <Desktop>
        <DesktopDetail />
      </Desktop>
      <Tablet>
        <DesktopDetail />
      </Tablet>
      <Mobile>
        <MobileDetail />
      </Mobile>
    </Container>
  )
}

export default Post;