import React from 'react';
import './Pagination.scss';

type TPageParams = {
  currentPage: number;
  totalPages: number;
  onPageClick: (num: number) => void;
};

export function Pagination({ totalPages, onPageClick, currentPage }: TPageParams) {
  const pageNumbers = [];

  const pages = [
    ...new Set([
      1,
      2,
      3,
      Math.max(currentPage - 1, 1),
      currentPage,
      Math.min(currentPage + 1, totalPages),
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]),
  ].sort((a, b) => a - b);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationPages = totalPages > 3 ? pages : pageNumbers;

  return (
    <nav className="nav-pagination">
      <div className="pagination">
        {/*  =========== back =========== */}
        <button
          className="page-item__controls"
          disabled={currentPage === 1}
          onClick={() => {
            onPageClick(currentPage - 1);
          }}
        >
          {`❮ `}{' '}
        </button>

        {/*  =========== pages =========== */}
        {paginationPages.map((num: number, i) => (
          <React.Fragment key={num}>
            {num - paginationPages[i - 1] > 1 && <span className="pages-separator">...</span>}
            <button
              className={`${num === currentPage ? 'page-item_current' : 'page-item'}`}
              onClick={() => {
                onPageClick(num);
              }}
            >
              {num}
            </button>
          </React.Fragment>
        ))}
        {/*  =========== forward =========== */}
        <button
          disabled={currentPage === totalPages}
          className="page-item__controls"
          onClick={() => {
            onPageClick(currentPage + 1);
          }}
        >
          {`❯`}{' '}
        </button>
      </div>
    </nav>
  );
}
