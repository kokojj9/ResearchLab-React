import { useContext, useState } from "react";
import axios from "axios";
import { MemberContext } from "../../context/MemberContext";
import { redirect } from "react-router-dom";

import "./TradePostForm.css";

const TradePostForm = () => {
  const { member } = useContext(MemberContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewFiles = files.map((file) => URL.createObjectURL(file));
    setPreviewImage(previewFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const tradePost = {
      title,
      content,
      writer: member.memberId,
      imageList: images.map((image) => ({ originalName: image.name })),
    };

    formData.append(
      "tradePost",
      new Blob([JSON.stringify(tradePost)], { type: "application/json" })
    );
    
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("/tradeBoard/posts", formData, {
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
        <div className="new-trade-post">
          <h2 className="form-title">새 글 작성</h2>
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">제목: </label>
              <input
                type="text"
                value={title}
                id="title"
                onChange={handleTitleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={content}
                id="content"
                onChange={handleContentChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">사진</label>
              <input
                type="file"
                id="images"
                className="form-control"
                onChange={handleImageChange}
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
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
            <button type="submit" className="submit-btn">
              작성하기
            </button>
          </form>
        </div>
      ) : (
        <h4>회원 서비스입니다.</h4>
      )}
    </>
  );
};

export default TradePostForm;
