import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi'
import { IoIosFolder } from 'react-icons/io';

import { DetailProps } from '../NewsProps';
import { dummyDetails } from '../api/DummyDetails';

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 30px 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Head = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray020};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px 15px;
`;

const ContentWrapper = styled.div`
  padding: 5px 10px;
`;

const Content = styled.div`
  white-space: pre-line;
  line-height: ${({ theme }) => theme.fonts.size.xl}
`;

const Download = styled.div`
  background-color: ${({ theme }) => theme.colors.gray040};
  max-width: 325px;
  width: 100%;
  height: 75px;
  border-radius: 10px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.3fr;
  div {
    margin: auto 0;
  }
`;

const FolderIcon = styled.div`
  text-align: right;
`;

const Data = styled.div`
  padding-left: 12px;
`;

const Name = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const Capacity = styled.div`
  color: ${({ theme }) => theme.colors.gray300};
  padding-top: 5px;
`;

const DownloadIcon = styled.div`
  cursor: pointer;
`;

const NextList = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  margin-top: 50px;
`;

const Row = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  :last-child {
    border-bottom: none;
  }
  display: grid;
  grid-template-columns: 0.5fr 2fr;
`;

const Id = styled.div`
  margin: 16px auto;
`;

const Infos = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Info = styled.div`
`;

function Detail() {
  const [searchParams] = useSearchParams();
  const [detail, setDetail] = useState<DetailProps>();
  const [nextList, setNextList] = useState<DetailProps[]>();

  useEffect(() => {
    const detailId = Number(searchParams.get('id'));
    setDetail(dummyDetails.filter((detail) => detail.id === detailId)[0]);

    if(detailId === 1) {
      setNextList(dummyDetails.slice(detailId-1, detailId + 2));
    } else {
      setNextList(dummyDetails.slice(detailId-2, detailId + 1));
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <Head>
        <div>{detail?.title}</div>
        <div>{detail?.createdAt}</div>
      </Head>
      <ContentWrapper>
        <Content>
          {detail?.content}
        </Content>
        {detail?.fileUrl ?
          <Download>
            <FolderIcon>
              <IoIosFolder size="35" />
            </FolderIcon>
            <Data>
              {/* <Name>{detail?.fileName}</Name>
              <Capacity>{detail?.fileCapacity}</Capacity> */}
              <Name>Lorem ipsum.PDF</Name>
              <Capacity>33.06KB</Capacity>
            </Data>
            <DownloadIcon>
              <FiDownload size="15" color="76787A" />
            </DownloadIcon>
        </Download>
        : null}
      </ContentWrapper>
      <NextList>
        {nextList?.map((post) => (
          <Row key={post.id}>
            <Id>{post?.id}</Id>
            <Infos>
              <Info>
                <Link to={`/news?id=${post.id}`}>
                  {post?.title}
                </Link>
              </Info>
              <Info>{post?.createdAt}</Info>
            </Infos>
          </Row>
        ))}
      </NextList>
    </Wrapper>
  )
}

export default Detail;