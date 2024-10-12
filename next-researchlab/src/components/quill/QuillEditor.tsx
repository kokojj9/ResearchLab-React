import { QuillEditorProps } from "@/types/types";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";

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
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        const quill = window?.quillRef?.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", result.imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef(null);
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
