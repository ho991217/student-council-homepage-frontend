import LogoImg from 'static/images/logos/logo-transparent.png';

function Logo(): JSX.Element {
  return <img src={LogoImg} alt="dankook logo" width={200} height={40} />;
}

export default Logo;
