import { useContext, useState } from "react";
import axios from "axios";
import { MemberContext } from "../../context/MemberContext";
import { redirect } from "react-router-dom";

const TradePostForm = () => {
  const { member } = useContext(MemberContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChage = (e) => {
    const files = Array.form(e.target.files);
    setImages(files);

    const previewFiles = files.map((file) => URL.createObjectURL(file));
    setPreviewImage(previewFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", member);
    images.forEach((image, i) => {
      formData.append("image", image);
    });

    try {
      const response = await axios.post("/posts", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      if (response.data.resultCode === "ok") {
        return redirect("/tradeBoard");
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <>
      {member ? (
        <div>
          <h1>매매전략 연구소</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>제목: </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <label>내용</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>
            <div>
              <label>사진</label>
              <input
                type="file"
                onChange={handleImageChage}
                multiple
                accept="image/*"
              />
            </div>
            <div>
              <h4>미리보기</h4>
              {previewImage.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
            <button type="submit">글 작성</button>
          </form>
        </div>
      ) : (
        <h4>회원 서비스입니다.</h4>
      )}
    </>
  );
};

export default TradePostForm;
