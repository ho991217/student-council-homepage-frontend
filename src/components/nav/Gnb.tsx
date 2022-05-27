import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from 'static/images/logos/logo-transparent.png';
import { NavItems } from './NavItems';
import Dropdown from './Dropdown';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  font-style: normal;
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: white;
`;
const LogoLink = styled(Link)`
  margin-left: 12.5%;
`;

const Img = styled.img``;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  margin-right: 13%;
  height: 100%;
`;

const Li = styled.li`
  width: 9.375rem;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: ${(props) => props.theme.colors.gray900};
    font-size: 1.125rem;
  }
`;

function Gnb() {
  const [open, setOpen] = useState([false, false, false, false]);
  return (
    <Nav>
      <LogoLink to="/">
        <Img src={Logo} alt="dankook logo" width={200} height={40} />
      </LogoLink>

      <Ul>
        {NavItems.map((item) => (
          <Li
            key={item.id}
            onMouseOver={() => {
              setOpen(() => {
                const newOpen = [...open];
                newOpen[Number(item.id)] = true;
                return newOpen;
              });
            }}
            onMouseLeave={() => {
              setOpen(() => {
                const newOpen = [...open];
                newOpen[Number(item.id)] = false;
                return newOpen;
              });
            }}
          >
            <Link to={item.path}>{item.title}</Link>
            {item.subPath && open[Number(item.id)] && (
              <Dropdown path={item.subPath} />
            )}
          </Li>
        ))}
      </Ul>
    </Nav>
  );
}

export default Gnb;
//           }}>
//             <Link to={item.path}>{item.title}</Link>
//             {item.subPath && <Dropdown path={item.subPath} />}
//           </Li>
//         ))}
//       </Ul>
//     </Nav>
//   );
// }

// export default Gnb;
