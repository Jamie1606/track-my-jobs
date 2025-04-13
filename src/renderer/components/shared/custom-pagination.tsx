import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface CustomPaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function CustomPagination({ current, total, onPageChange, className }: CustomPaginationProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious draggable={false} to="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} isActive to="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} to="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} to="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} to="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink draggable={false} to="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext draggable={false} to="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
