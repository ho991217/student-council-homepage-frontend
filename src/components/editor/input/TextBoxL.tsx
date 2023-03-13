import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

interface TextBoxLProps {
  htmlStr: string;
  label: string;
  setHtmlStr: (htmlStr: string) => void;
  wrapperStyle?: React.CSSProperties;
  /** callback은 image를 업로드하고
   * resolve({ data: { link: res.data } }) 해야함
   * @param file: Blob
   * @returns Promise<any>
   */
  uploadCallback?: (file: Blob) => Promise<any>;
}

TextBoxL.defaultProps = {
  wrapperStyle: {},
  // eslint-disable-next-line no-promise-executor-return
  uploadCallback: (file: Blob) => new Promise((resolve) => resolve),
};

function TextBoxL({
  htmlStr,
  label,
  setHtmlStr,
  wrapperStyle,
  uploadCallback,
}: TextBoxLProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);
  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  // const uploadCallback = (file: Blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = async () => {
  //       const formData = new FormData();
  //       formData.append('multipartFiles', file);
  //       const res = await axios.post(
  //         'http://localhost:8080/uploadImage',
  //         formData,
  //       );

  //       resolve({ data: { link: res.data } });
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  // toolbar 설정
  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    image: { uploadCallback, previewImage: true }, // 이미지 커스텀 업로드
  };

  // 언어 설정
  const localization = {
    locale: 'ko',
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <WysiwygEditor
        editorClassName="editor" // Editor 적용 클래스
        toolbarClassName="toolbar" // Toolbar 적용 클래스
        wrapperStyle={{
          backgroundColor: '#F2F3F5',
          padding: 10,
          marginTop: 15,
          border: '1px solid #C4C8CC',
          boxSizing: 'border-box',
          ...wrapperStyle,
        }}
        editorStyle={{
          minHeight: 450,
          padding: 10,
        }}
        toolbarStyle={{
          boxSizing: 'border-box',
          padding: 10,
          borderRadius: 10,
          boxShadow: '0px 10px 15px 1px rgba(0, 0, 0, 0.03)',
        }}
        toolbar={toolbar}
        placeholder="내용을 입력하세요."
        localization={localization}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

export default TextBoxL;
