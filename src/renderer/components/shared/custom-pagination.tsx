import { useState } from "react";
import { Pagination, PaginationContent, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { AnimatePresence, motion } from "framer-motion";

interface CustomPaginationProps {
  current: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function CustomPagination({ current, limit, total, onPageChange, className }: CustomPaginationProps) {
  const totalPage = Math.ceil(total / limit);
  const maxVisible = 2;
  const range: number[] = [];

  const startPage = Math.max(1, current - maxVisible);
  const endPage = Math.min(totalPage, current + maxVisible);

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPage && page !== current) {
      onPageChange(page);
    }
  };

  if (totalPage <= 1) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {current > 3 && (
          <PaginationItem>
            <PaginationFirst draggable={false} to="#" onClick={() => goToPage(1)} />
          </PaginationItem>
        )}

        {current > 1 && (
          <PaginationItem>
            <PaginationPrevious draggable={false} to="#" onClick={() => goToPage(current - 1)} />
          </PaginationItem>
        )}

        <AnimatePresence mode="popLayout">
          {range.map((page) => (
            <motion.div layout key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <PaginationItem>
                <PaginationLink to="#" draggable={false} isActive={page === current} onClick={() => goToPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            </motion.div>
          ))}
        </AnimatePresence>

        {current < totalPage && (
          <PaginationItem>
            <PaginationNext draggable={false} to="#" onClick={() => goToPage(current + 1)} />
          </PaginationItem>
        )}

        {current < totalPage - 2 && (
          <PaginationItem>
            <PaginationLast draggable={false} to="#" onClick={() => goToPage(totalPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
