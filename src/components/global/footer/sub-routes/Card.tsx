import { Desktop } from 'hooks/MediaQueries';
import styled from 'styled-components';

const GHIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#fafafa"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstaIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 256 256"
    fill="#fafafa"
  >
    <g transform="scale(2.88 2.88)">
      <g transform="">
        <path
          d="M 60.961 31.655 c 0 -1.437 -1.165 -2.602 -2.602 -2.602 c -1.437 0 -2.602 1.165 -2.602 2.602 c 0 1.437 1.165 2.602 2.602 2.602 C 59.797 34.256 60.961 33.092 60.961 31.655 z"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 45 33.079 c -6.584 0 -11.921 5.337 -11.921 11.921 c 0 1.646 0.334 3.214 0.937 4.64 c 0.603 1.426 1.476 2.711 2.555 3.789 c 2.157 2.157 5.138 3.492 8.43 3.492 c 3.292 0 6.272 -1.334 8.43 -3.492 c 1.079 -1.079 1.952 -2.363 2.555 -3.789 c 0.603 -1.426 0.937 -2.994 0.937 -4.64 C 56.921 38.416 51.584 33.079 45 33.079 z"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 c 24.853 0 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 70 55.238 C 70 63.391 63.391 70 55.238 70 H 34.762 C 26.609 70 20 63.391 20 55.238 V 34.762 c 0 -3.057 0.929 -5.897 2.521 -8.253 C 25.174 22.582 29.666 20 34.762 20 h 20.477 c 5.095 0 9.588 2.582 12.241 6.508 C 69.071 28.864 70 31.704 70 34.762 V 55.238 z"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </g>
  </svg>
);

const PersonSectionContainer = styled.div<{
  from: string;
  to: string;
}>`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.media.desktop} {
  }
  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
  }
  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
  }
  margin-bottom: 30px;
  background: ${({ from }) => from};
  background: ${({ from, to }) =>
    `linear-gradient(90deg, ${from} 0%, ${to} 100%)`};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  :hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;

const TextsContainer = styled.div`
  ${({ theme }) => theme.media.desktop} {
    margin: 0 300px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray020};
  font-size: ${({ theme }) => theme.fonts.size.x3xl};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-right: 10px;
`;

const Info = styled.h2`
  color: ${({ theme }) => theme.colors.gray020};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  line-height: 20px;
`;

const Role = styled.h2`
  color: ${({ theme }) => theme.colors.gray040};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  margin-bottom: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  a {
    margin-right: 10px;
  }
`;

function Card({
  bgFromColor,
  bgToColor,
  name,
  info,
  pjrole,
  ghid,
  instaid,
  img,
}: {
  bgFromColor: string;
  bgToColor: string;
  name: string;
  info: string;
  pjrole: string;
  instaid: string;
  ghid: string;
  img: JSX.Element | null;
}): JSX.Element {
  return (
    <PersonSectionContainer from={bgFromColor} to={bgToColor}>
      {img && <Desktop>{img}</Desktop>}

      <TextsContainer>
        <TitleContainer>
          <Title>{name}</Title>
          <Info>
            단국대학교
            <br />
            {info}
          </Info>
        </TitleContainer>
        <Role>{pjrole}</Role>
        <LinksContainer>
          {ghid && <a href={`https://github.com/${ghid}`}>{GHIcon}</a>}
          {instaid && (
            <a href={`https://www.instagram.com/${instaid}/`}>{InstaIcon}</a>
          )}
        </LinksContainer>
      </TextsContainer>
    </PersonSectionContainer>
  );
}

export default Card;
