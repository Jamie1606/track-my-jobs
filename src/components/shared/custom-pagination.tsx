import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface CustomPaginationProps {
  className?: string;
}

export default function CustomPagination({ className }: CustomPaginationProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
