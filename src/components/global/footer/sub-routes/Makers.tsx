import Block from 'components/global/Block';
import styled from 'styled-components';

import seungYongImg from 'static/images/makers-profile-pics/seung-yong.png';
import hoYeonImg from 'static/images/makers-profile-pics/ho-yeon.png';
import yeJiImg from 'static/images/makers-profile-pics/ye-ji.png';

import Card from './Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SeungYongPics = styled.img.attrs({ src: seungYongImg })`
  position: absolute;
  width: 400px;
  transform: scale(-1.5, 1.5);
  top: -50px;
  left: 30px;
  pointer-events: none;
`;

const HoYeonPics = styled.img.attrs({ src: hoYeonImg })`
  position: absolute;
  width: 400px;
  transform: scale(0.75);
  top: -100px;
  left: -40px;
  pointer-events: none;
`;

const YeJiPics = styled.img.attrs({ src: yeJiImg })`
  position: absolute;
  width: 400px;
  transform: scale(1.33);
  top: -140px;
  left: -90px;
  pointer-events: none;
`;

function Makers(): JSX.Element {
  return (
    <Wrapper>
      <Block
        title="만든 사람들"
        contents={
          <div>
            <Card
              bgFromColor="#192a56"
              bgToColor="#273c75"
              name="박찬진"
              info="소프트웨어학과 19학번"
              pjrole="Project Manager"
              ghid=""
              instaid=""
              img={null}
            />
            <Card
              bgFromColor="#434449"
              bgToColor="#4E505A"
              name="이호연"
              info="컴퓨터공학과 18학번"
              pjrole="Frontend Development Team Leader"
              ghid="ho991217"
              instaid="it.s_ho"
              img={<HoYeonPics />}
            />
            <Card
              bgFromColor="#353b2d"
              bgToColor="#5d674f"
              name="최승용"
              info="소프트웨어학과 17학번"
              pjrole="Backend Development Team Leader"
              ghid="SeungYongChoi"
              instaid=""
              img={<SeungYongPics />}
            />
            <Card
              bgFromColor="#2E4A66"
              bgToColor="#7B97B4"
              name="심예지"
              info="커뮤니케이션디자인과 18학번"
              pjrole="UX/UI Design Team Leader"
              ghid=""
              instaid=""
              img={<YeJiPics />}
            />
          </div>
        }
      />
    </Wrapper>
  );
}

export default Makers;
