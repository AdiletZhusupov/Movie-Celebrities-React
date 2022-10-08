import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const MoviesPagination = ({
  currentPage,
  numOfCelebPerPage,
  paginationArr,
  handleNext,
  handlePrev,
  minPageNumberLimit,
  maxPageNumberLimit,
  handleFirst,
  handleLast,
  handleClickNumber
}) => {
  return (
    <>
      <Pagination aria-label="Page navigation example">
        <PaginationItem onClick={handleFirst}>
          <PaginationLink first />
        </PaginationItem>
        <PaginationItem
          style={
            currentPage === paginationArr[0] ? { pointerEvents: "none" } : null
          }
          onClick={handlePrev}
        >
          <PaginationLink previous />
        </PaginationItem>
        {paginationArr.map((item, index) => {
          if (item < maxPageNumberLimit + 1 && item > minPageNumberLimit) {
            return (
              <PaginationItem
                key={index}
                onClick={() => handleClickNumber(item)}
                className={currentPage === item ? "active" : null}
              >
                <PaginationLink>{item}</PaginationLink>
              </PaginationItem>
            );
          } else {
            return null;
          }
        })}
        <PaginationItem
          style={
            currentPage === paginationArr[paginationArr.length - 1]
              ? { pointerEvents: "none" }
              : null
          }
          onClick={handleNext}
        >
          <PaginationLink next />
        </PaginationItem>
        <PaginationItem onClick={handleLast}>
          <PaginationLink last />
        </PaginationItem>
      </Pagination>
      <div className="page-results">
        Showing results{" "}
        {currentPage === 1
          ? currentPage
          : (currentPage - 1) * numOfCelebPerPage + 1}{" "}
        to {currentPage * numOfCelebPerPage}
      </div>
    </>
  );
};

export default MoviesPagination;
