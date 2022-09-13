import Block from 'components/global/Block';
import styled from 'styled-components';

import seungYongImg from 'static/images/makers-profile-pics/seung-yong.png';
import hoYeonImg from 'static/images/makers-profile-pics/ho-yeon.png';
import yeJiImg from 'static/images/makers-profile-pics/ye-ji.png';
import chanJinImg from 'static/images/makers-profile-pics/chan-jin.png';
import yeonJooImg from 'static/images/makers-profile-pics/yeon-joo.png';
import leeHyeon from 'static/images/makers-profile-pics/lee-hyeon.png';
import seungHwan from 'static/images/makers-profile-pics/seung-hwan.png';
import yuJin from 'static/images/makers-profile-pics/yu-jin.png';

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

const YeonJuPics = styled.img.attrs({ src: yeonJooImg })`
  position: absolute;
  width: 400px;
  transform: scale(0.5);
  top: -170px;
  left: -50px;
  pointer-events: none;
`;

const LeeHyeonPics = styled.img.attrs({ src: leeHyeon })`
  position: absolute;
  width: 400px;
  transform: scale(0.66);
  top: -270px;
  left: -55px;
  pointer-events: none;
`;

const SeungHwanPics = styled.img.attrs({ src: seungHwan })`
  position: absolute;
  width: 400px;
  transform: scale(0.66);
  top: -180px;
  left: -80px;
  pointer-events: none;
`;

const YuJinPics = styled.img.attrs({ src: yuJin })`
  position: absolute;
  width: 400px;
  transform: scale(0.7);
  top: -50px;
  left: -60px;
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
              ghid="developerChans"
              instaid="__chans__99"
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
              ghid="wormjoo"
              instaid="worm._.zoo"
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
              instaid="win0__c"
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
              info="커뮤니케이션디자인과 20학번"
              img={<YuJinPics />}
              pjrole="UX/UI Design"
              instaid="Cherish_Jin88"
            />
          </div>
        }
      />
    </Wrapper>
  );
}

export default Makers;
