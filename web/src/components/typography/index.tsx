import { cn } from '@/utils';

const TypographyH1: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children }) => (
  <h1
    className={cn(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    )}
  >
    {children}
  </h1>
);

const TypographyH2: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children }) => (
  <h2
    className={cn(
      'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    )}
  >
    {children}
  </h2>
);

const TypographyH3: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children }) => (
  <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight')}>
    {children}
  </h3>
);

const TypographyH4: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children }) => (
  <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight')}>
    {children}
  </h4>
);

const TypographyP: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
    {children}
  </p>
);

const TypographyBlockquote: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
    {children}
  </blockquote>
);

const TypographyLead: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
);

const TypographyLarge: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('text-lg font-semibold', className)}>{children}</div>
);

const TypographySmall: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <small className={cn('text-sm font-medium leading-none', className)}>
    {children}
  </small>
);

const TypographyMuted: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);

type TypographyLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

interface TypographyProps {
  level?: TypographyLevel;
  children?: React.ReactNode;
}

const TYPOGRAPHY_MAPPER: {
  [key in TypographyLevel]: React.FC<{
    children?: React.ReactNode;
    className?: string;
  }>;
} = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  p: TypographyP,
  blockquote: TypographyBlockquote,
  lead: TypographyLead,
  large: TypographyLarge,
  small: TypographySmall,
  muted: TypographyMuted,
};

export const Typography: React.FC<TypographyProps> = ({
  level = 'p',
  ...props
}) => {
  const Component = TYPOGRAPHY_MAPPER[level];

  return <Component {...props} />;
};
