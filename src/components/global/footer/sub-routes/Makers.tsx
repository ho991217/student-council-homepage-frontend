import Block from 'components/global/Block';
import styled from 'styled-components';

import seungYongImg from 'static/images/makers-profile-pics/seung-yong.png';
import hoYeonImg from 'static/images/makers-profile-pics/ho-yeon.png';
import yeJiImg from 'static/images/makers-profile-pics/ye-ji.png';
// import suJeongImg from 'static/images/makers-profile-pics/su-jeong.png';
import chanJinImg from 'static/images/makers-profile-pics/chan-jin.png';
import yeonJuImg from 'static/images/makers-profile-pics/yeon-ju.png';
import leeHyeon from 'static/images/makers-profile-pics/lee-hyeon.png';
import seungHwan from 'static/images/makers-profile-pics/seung-hwan.png';

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
  left: -50px;
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

const ChanJinPics = styled.img.attrs({ src: chanJinImg })`
  position: absolute;
  width: 400px;
  transform: scale(0.55);
  top: -140px;
  left: -55px;
  pointer-events: none;
`;

const YeonJuPics = styled.img.attrs({ src: yeonJuImg })`
  position: absolute;
  width: 400px;
  transform: scale(0.4);
  top: -185px;
  left: -50px;
  pointer-events: none;
`;

const LeeHyeonPics = styled.img.attrs({ src: leeHyeon })`
  position: absolute;
  width: 400px;
  transform: scale(0.5);
  top: -260px;
  left: -55px;
  pointer-events: none;
`;

const SeungHwanPics = styled.img.attrs({ src: seungHwan })`
  position: absolute;
  width: 400px;
  transform: scale(0.5);
  top: -200px;
  left: -75px;
  pointer-events: none;
`;

// const SuJeongPics = styled.img.attrs({ src: suJeongImg })`
//   position: absolute;
//   width: 400px;
//   transform: scale(1.33);
//   top: -140px;
//   left: -90px;
//   pointer-events: none;
// `;

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
              img={<ChanJinPics />}
              teamleader
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
              teamleader
            />
            <Card
              bgFromColor="#434449"
              bgToColor="#4E505A"
              name="조연주"
              info="소프트웨어학과 19학번"
              pjrole="Frontend Development"
              img={<YeonJuPics />}
            />
            <Card
              bgFromColor="#434449"
              bgToColor="#4E505A"
              name="이수정"
              info="소프트웨어학과 20학번"
              pjrole="Frontend Development"
              ghid="sujeong11"
            />
            <Card
              bgFromColor="#353b2d"
              bgToColor="#5d674f"
              name="최승용"
              info="소프트웨어학과 17학번"
              pjrole="Backend Development Team Leader"
              ghid="SeungYongChoi"
              img={<SeungYongPics />}
              teamleader
            />
            <Card
              bgFromColor="#353b2d"
              bgToColor="#5d674f"
              name="이 현"
              info="응용컴퓨터공학과 17학번"
              pjrole="Backend Development"
              img={<LeeHyeonPics />}
            />
            <Card
              bgFromColor="#353b2d"
              bgToColor="#5d674f"
              name="윤승환"
              pjrole="Backend Development"
              img={<SeungHwanPics />}
              otherUniv="세종대학교"
            />
            <Card
              bgFromColor="#2E4A66"
              bgToColor="#7B97B4"
              name="심예지"
              info="커뮤니케이션디자인과 18학번"
              pjrole="UX/UI Design Team Leader"
              img={<YeJiPics />}
              teamleader
            />
            <Card
              bgFromColor="#2E4A66"
              bgToColor="#7B97B4"
              name="윤서연"
              pjrole="UX/UI Design"
            />
            <Card
              bgFromColor="#2E4A66"
              bgToColor="#7B97B4"
              name="유 진"
              pjrole="UX/UI Design"
            />
          </div>
        }
      />
    </Wrapper>
  );
}

export default Makers;
