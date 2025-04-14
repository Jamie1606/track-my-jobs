import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";
import LeftIcon from "@/icons/left-icon";
import RightIcon from "@/icons/right-icon";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  to: string;
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "sm", to, ...props }: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "active" : "pagination",
          size,
        }),
        className
      )}
      {...props}
      to={to}
    />
  );
}

function PaginationLast({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to last page" size="sm" className={cn("flex items-center gap-0", className)} {...props}>
      <RightIcon width={20} height={20} className="-mr-3" />
      <RightIcon width={20} height={20} />
    </PaginationLink>
  );
}

function PaginationFirst({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to first page" size="sm" className={cn("flex items-center gap-0", className)} {...props}>
      <LeftIcon width={20} height={20} className="-mr-3" />
      <LeftIcon width={20} height={20} />
    </PaginationLink>
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" size="sm" className={cn("gap-1 px-2.5 sm:pl-2.5", className)} {...props}>
      <LeftIcon width={20} height={20} />
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" size="sm" className={cn("gap-1 px-2.5 sm:pr-2.5", className)} {...props}>
      <RightIcon width={20} height={20} />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex size-9 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationFirst, PaginationPrevious, PaginationLast, PaginationNext, PaginationEllipsis };
