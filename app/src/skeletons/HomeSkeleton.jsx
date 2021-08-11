import React from "react";
import { StyledHome } from "../pages/Home";
import ArticleGrid from "../styles/ArticleGrid";
import { SkeletonLine, ArticleCardSkeleton } from "../styles/Skeleton";

const HomeSkeleton = ({ title }) => {
  return (
    <StyledHome>
      {title && <SkeletonLine width="350px" height="30px" mb="30px" />}
      {!title && <div style={{ marginTop: "2rem" }} />}
      <ArticleGrid>
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </ArticleGrid>
    </StyledHome>
  );
};

export default HomeSkeleton;
