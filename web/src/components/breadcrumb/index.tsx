import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Typography } from '../typography';

interface BreadcrumbLinkProps extends LinkProps {
  children?: React.ReactNode;
}

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <Link
      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
      {...props}
    >
      {children}
    </Link>
  );
};

interface BreadcrumbNeutralProps {
  children?: React.ReactNode;
}

export const BreadcrumbNeutral: React.FC<BreadcrumbNeutralProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography level="muted" {...props}>
      {children}
    </Typography>
  );
};

interface BreadcrumbProps {
  children: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  const breadcrumbList = childrenArray.flatMap((child, index) => {
    return [
      child,
      index < childrenArray.length - 1 && (
        <ChevronRight size={16} key={`arrow-${index}`} />
      ),
    ];
  });

  return <nav className="flex items-center gap-2">{breadcrumbList}</nav>;
};
