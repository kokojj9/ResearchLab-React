import { QuillEditorProps } from "@/types/types";
import axios from "axios";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null); // ReactQuill 컴포넌트에 대한 ref

  const imageApi = async (formData: FormData) => {
    try {
      const response = await axios.post("/api/strategy/fileUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 이미지 전송을 위한 헤더 설정
        },
      });
      return response.data; // 서버에서 imgUrl을 반환해야 함
    } catch (error) {
      console.error("이미지 업로드에 실패했습니다:", error);
      throw error;
    }
  };

  // 이미지 업로드 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          // 서버에 이미지 업로드 후 URL 반환
          const res = await imageApi(formData);
          const imgUrl = res.data.imgUrl;

          // Quill 에디터에 접근하여 이미지 삽입
          const editor = quillRef.current?.getEditor();
          if (editor) {
            const range = editor.getSelection();
            if (range) {
              editor.insertEmbed(range.index, "image", imgUrl);
              editor.setSelection(range.index + 1);
            } else {
              console.error("현재 선택 영역을 가져올 수 없습니다.");
            }
          } else {
            console.error("Quill 에디터 인스턴스를 사용할 수 없습니다.");
          }
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      }
    };
  };

  // useMemo로 modules를 메모이제이션
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
        handlers: {
          image: imageHandler, // 이미지 핸들러 추가
        },
        clipboard: {
          matchVisual: false,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      className={styles["quill"]}
      onChange={onChange}
      modules={modules} // useMemo로 생성한 modules
      formats={formats} // useMemo로 생성한 formats
      placeholder="내용을 입력하세요"
    />
  );
};

export default QuillEditor;
