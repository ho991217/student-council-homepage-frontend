import styled from 'styled-components';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FiDownload } from 'react-icons/fi';
import { IoIosFolder } from 'react-icons/io';

import { RuleProps, DetailProps } from '../RuleProps';

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

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.gray040};
  max-width: 325px;
  width: 100%;
  height: 75px;
  margin: 50px 20px;
  border-radius: 10px;
  margin: 60px 0 100px 0;
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

const Info = styled.div``;

function Detail() {
  const [searchParams] = useSearchParams();
  const [board, setBoard] = useState<RuleProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>();
  const [nextList, setNextList] = useState<RuleProps[]>();
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  useEffect(() => {
    axios
      .get('/api/rule')
      .then(function (response) {
        const result = response.data;
        setBoard(result.content);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const detailId = Number(searchParams.get('id'));

    if (detailId === 1) {
      setNextList(board.slice(detailId - 1, detailId + 2));
    } else {
      setNextList(board.slice(detailId - 2, detailId + 1));
    }
  }, [searchParams, board]);

  useEffect(() => {
    axios
      .get(`/api/rule/${searchParams.get('id')}`, {
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      })
      .then(function (response) {
        const result = response.data.data;
        setDetail(result);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <Head>
        <div>{detail?.title}</div>
        <div>{detail?.createDate}</div>
      </Head>
      <Content>
        <FolderIcon>
          <IoIosFolder size="30" />
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
      </Content>
      <NextList>
        {nextList?.map((post) => (
          <Row key={post.id}>
            <Id>{post?.id}</Id>
            <Infos>
              <Info>
                <Link to={`/rule?id=${post.id}`}>{post?.title}</Link>
              </Info>
              <Info>{post?.createDate}</Info>
            </Infos>
          </Row>
        ))}
      </NextList>
    </Wrapper>
  );
}

export default Detail;
