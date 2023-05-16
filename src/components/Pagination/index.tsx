import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PaginationProps = {
  page: number;
  total: number;
};

function Pagination({ page, total }: PaginationProps) {
  const useClasses = useStyle(classes);

  const renderPageButtons = () => {
    const buttons: JSX.Element[] = [];

    // Verifica se há menos de 5 páginas no total
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      // Página atual está no início
      if (page <= 3) {
        for (let i = 1; i <= 5; i++) {
          buttons.push(renderPageButton(i));
        }
      }
      // Página atual está no final
      else if (page >= total - 2) {
        for (let i = total - 4; i <= total; i++) {
          buttons.push(renderPageButton(i));
        }
      }
      // Página atual está no meio
      else {
        for (let i = page - 2; i <= page + 2; i++) {
          buttons.push(renderPageButton(i));
        }
      }
    }

    return buttons;
  };

  const renderPageButton = (pageNumber: number) => {
    const isActive = pageNumber === page;
    const className = isActive ? useClasses.active : useClasses.page;

    return (
      <li key={pageNumber}>
        <a href="#" className={className}>
          {pageNumber}
        </a>
      </li>
    );
  };

  return (
    <div className={useClasses.container}>
      <ol className={useClasses.ol}>
        <li>
          <a href="#" className={useClasses.prevNext}>
            <span className="sr-only">Prev Page</span>
            <ChevronLeftIcon width={10} height={10} />
          </a>
        </li>

        {renderPageButtons()}

        <li>
          <a href="#" className={useClasses.prevNext}>
            <span className="sr-only">Next Page</span>
            <ChevronRightIcon width={10} height={10} />
          </a>
        </li>
      </ol>
    </div>
  );
}

export default Pagination;
