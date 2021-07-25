// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
//
// import { useParams } from "react-router-dom";
// import NoResults from "../components/NoResults";
// import Skeleton from "../skeletons/HomeSkeleton";
// import { getSearchResults, clearSearchResults } from "../reducers/searchResult";
//
//
// const SearchResults = () => {
//   const { searchterm } = useParams();
//
//   const dispatch = useDispatch();
//   const { isFetching, users, articles } = useSelector(
//     (state) => state.searchResult
//   );
//
//   useEffect(() => {
//     dispatch(getSearchResults(searchterm));
//
//     return () => {
//       dispatch(clearSearchResults());
//     };
//   }, [dispatch, searchterm]);
//
//   if (isFetching) {
//     return <Skeleton title="true" />;
//   }
//
//   if (!isFetching && !articles.length && !users.length) {
//     return <NoResults title="No results found" text="Try different keywords" />;
//   }
//
//   return (
//       <div>
//
//       </div>
//     // <StyledTrending>
//     //   <h2>Search Results</h2>
//     //
//     //
//     //
//     //   {!isFetching &&
//     //     articles.map((article) => (
//     //       <Link key={article.id} to={`/watch/${article.id}`}>
//     //         <TrendingCard article={article} />
//     //       </Link>
//     //     ))}
//     // </StyledTrending>
//   );
// };
//
// export default SearchResults;
