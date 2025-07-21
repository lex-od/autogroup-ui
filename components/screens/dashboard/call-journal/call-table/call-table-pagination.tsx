import { FC } from 'react';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextButton,
  PaginationPrevButton,
} from '@/components/ui/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  onCurrentPageChange: (currentPage: number) => void;
}

const CallTablePagination: FC<Props> = ({
  currentPage,
  totalPages,
  onCurrentPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    // Всегда добавляем первую страницу
    pages.push(1);

    // Если страниц <= 4, показываем все подряд
    if (totalPages <= 4) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    // Определяем соседние страницы
    let start =
      currentPage === 1 || currentPage === 2
        ? 2
        : currentPage === totalPages || currentPage === totalPages - 1
          ? totalPages - 2
          : currentPage - 1;
    let end =
      currentPage === 1 || currentPage === 2
        ? 3
        : currentPage === totalPages || currentPage === totalPages - 1
          ? totalPages - 1
          : currentPage + 1;

    // Корректируем границы
    start = Math.max(2, start);
    end = Math.min(totalPages - 1, end);

    // Если разрыв между 1 и start, добавляем ellipsis
    if (start > 2) {
      pages.push('ellipsis');
    }
    // Добавляем соседние страницы
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    // Если разрыв между end и последней страницей, добавляем ellipsis
    if (end < totalPages - 1) {
      pages.push('ellipsis');
    }
    // Всегда добавляем последнюю страницу
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevButton
            onClick={() => onCurrentPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationButton
                className="disabled:opacity-100"
                isActive={page === currentPage}
                disabled={page === currentPage}
                onClick={() => onCurrentPageChange(page)}
              >
                {page}
              </PaginationButton>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNextButton
            onClick={() => onCurrentPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CallTablePagination;
