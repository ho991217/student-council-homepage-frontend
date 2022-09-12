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
  margin: 40px 0px;
  padding: 30px 50px;
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
  display: grid;
  grid-template-columns: ${({ isAdmin }: { isAdmin: boolean }) =>
    isAdmin ? '0.3fr 3.5fr 0.8fr 0.3fr' : '0.3fr 3.5fr 0.8fr'};
  div {
    display: flex;
    place-content: center;
    place-items: center;
    :nth-child(2) {
      justify-content: left;
    }
  }
`;

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 45px;
`;

const File = styled.div`
  background-color: ${({ theme }) => theme.colors.gray040};
  width: 480px;
  height: 75px;
  margin: 50px 20px;
  border-radius: 10px;
  margin: 60px 0 120px 0;
  display: grid;
  grid-template-columns: 0.4fr 2fr 0.3fr;
  div {
    margin: auto 0;
  }
`;

const FolderIcon = styled.div`
  text-align: right;
`;

const Data = styled.div`
  padding-left: 20px;
`;

const Name = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const DownloadIcon = styled.div`
  cursor: pointer;
`;

const NextList = styled.div`
  width: 100%;
`;

const ListHead = styled.div`
  width: 100%;
  height: 70px;
  border-top: 3px solid ${({ theme }) => theme.colors.gray900};
  border-collapse: collapse;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const Row = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 0.8fr 5fr 1.2fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  div {
    display: flex;
    place-content: center;
    place-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

const Title = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  :last-child {
    border-right: none;
  }
`;

const Info = styled.div`
  :nth-child(2) {
    display: flex;
    justify-content: left;
    padding-left: 25px;
    cursor: pointer;
  }
`;

const Svg = styled.svg`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

function Detail() {
  const [searchParams] = useSearchParams();
  const [board, setBoard] = useState<RuleProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>();
  const [nextList, setNextList] = useState<RuleProps[]>();
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const [isAdmin, setIsAdmin] = useState<boolean>(cookies.isAdmin === 'true');

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

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/rule/${id}`, {
        headers: {
          'X-AUTH-TOKEN': cookies['X-AUTH-TOKEN'],
        },
      })
      .then(function (response) {
        const result = response.data;
        console.log(result.message);
        window.location.replace('/rules');
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <Head isAdmin={isAdmin}>
        <div>{detail?.id}</div>
        <div>{detail?.title}</div>
        <div>{detail?.createDate}</div>
        {isAdmin && detail && (
          <div>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleDelete(detail?.id)}
            >
              <path
                d="M12.5 31.25L18.3086 86.4277C18.4297 87.5798 18.9732 88.6461 19.8341 89.4212C20.6949 90.1962 21.8123 90.6251 22.9707 90.625H77.0293C78.1877 90.6251 79.3051 90.1962 80.1659 89.4212C81.0268 88.6461 81.5703 87.5798 81.6914 86.4277L87.5 31.25H12.5ZM60.9375 73.7227L50 62.7852L39.0625 73.7227L34.0898 68.75L45.0273 57.8125L34.0898 46.875L39.0625 41.9023L50 52.8398L60.9375 41.9023L65.9102 46.875L54.9727 57.8125L65.9102 68.75L60.9375 73.7227Z"
                fill="black"
              />
              <path
                d="M91.4062 9.375H8.59375C7.29933 9.375 6.25 10.4243 6.25 11.7188V22.6562C6.25 23.9507 7.29933 25 8.59375 25H91.4062C92.7007 25 93.75 23.9507 93.75 22.6562V11.7188C93.75 10.4243 92.7007 9.375 91.4062 9.375Z"
                fill="black"
              />
            </Svg>
          </div>
        )}
      </Head>
      <Content>{detail?.text}</Content>
      {detail?.fileList[0] && (
        <File>
          <FolderIcon>
            <IoIosFolder size="35" />
          </FolderIcon>
          <Data>
            <Name>{detail?.fileList[0].originName}</Name>
          </Data>
          <DownloadIcon>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={detail?.fileList[0].url}
            >
              <FiDownload size="15" color="76787A" />
            </a>
          </DownloadIcon>
        </File>
      )}
      <NextList>
        <ListHead>
          <Row>
            <Title>번호</Title>
            <Title>제목</Title>
            <Title>등록일</Title>
            <Title>첨부파일</Title>
          </Row>
        </ListHead>
        {nextList?.map((post) => (
          <Row key={post.id}>
            <Info>{post?.id}</Info>
            <Info>
              <Link to={`/rule?id=${post.id}`}>{post?.title}</Link>
            </Info>
            <Info>{post?.createDate}</Info>
            <Info>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.fileList[0] ? post?.fileList[0]?.url : ''}
              >
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  height="64"
                  width="64"
                >
                  <path d="M45.414 36.586a2 2 0 0 0-2.828 0L41 38.172l-3.811-3.811A20.908 20.908 0 0 0 42 21C42 9.42 32.579 0 21 0S0 9.42 0 21s9.421 21 21 21c5.071 0 9.728-1.808 13.361-4.811L38.172 41l-1.586 1.586a2 2 0 0 0 0 2.828l18 18c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l6-6a2 2 0 0 0 0-2.828l-18-18zM4 21c0-9.374 7.626-17 17-17s17 7.626 17 17-7.626 17-17 17S4 30.374 4 21zm52 38.171L40.828 44 44 40.829 59.172 56 56 59.171z" />
                </Svg>
              </a>
            </Info>
          </Row>
        ))}
      </NextList>
    </Wrapper>
  );
}

export default Detail;
