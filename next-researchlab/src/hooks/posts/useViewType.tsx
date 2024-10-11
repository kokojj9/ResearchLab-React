import { Post } from "@/types/types";
import React, { useState } from "react";

const useViewType = () => {
  const [viewType, setViewType] = useState("all");
  const [page, setPage] = useState(0);

  const handleViewChange = (
    type: string,
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  ) => {
    setPosts([]);
    setPage(0);
    setViewType(type);
  };

  return { viewType, page, setPage, handleViewChange };
};

export default useViewType;
