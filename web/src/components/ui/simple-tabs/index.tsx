/* eslint-disable react/prop-types */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/utils';

const SimpleTabs = TabsPrimitive.Root;

const SimpleTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex w-full items-center justify-center text-muted-foreground',
      className,
    )}
    {...props}
  />
));
SimpleTabsList.displayName = TabsPrimitive.List.displayName;

const SimpleTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex w-full items-center justify-center whitespace-nowrap border-b px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:border-b-violet-500 data-[state=active]:text-foreground',
      className,
    )}
    {...props}
  />
));
SimpleTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const SimpleTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
SimpleTabsContent.displayName = TabsPrimitive.Content.displayName;

export { SimpleTabs, SimpleTabsList, SimpleTabsTrigger, SimpleTabsContent };
