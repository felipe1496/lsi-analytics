import { Listbox as HeadlessListbox, Transition } from '@headlessui/react';
import { ChevronsUpDownIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/utils';

export const ListBox = React.forwardRef<
  React.ElementRef<typeof HeadlessListbox>,
  React.ComponentPropsWithoutRef<typeof HeadlessListbox>
>(({ children, ...props }) => (
  <HeadlessListbox {...props}>
    <div className="relative mt-1">{children as React.ReactNode}</div>
  </HeadlessListbox>
));

ListBox.displayName = HeadlessListbox.displayName;

export const ListBoxTrigger = React.forwardRef<
  React.ElementRef<typeof HeadlessListbox.Button>,
  React.ComponentPropsWithoutRef<typeof HeadlessListbox.Button> & {
    className?: string;
  }
>(({ className, children, ...props }) => (
  <HeadlessListbox.Button
    {...props}
    className={cn(
      'relative min-h-[36px] w-full cursor-pointer rounded border bg-background py-2 pl-3 pr-10 text-left focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
      className,
    )}
  >
    {children as React.ReactNode}

    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronsUpDownIcon
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </span>
  </HeadlessListbox.Button>
));

ListBoxTrigger.displayName = HeadlessListbox.Button.displayName;

export const ListBoxOptions = React.forwardRef<
  React.ElementRef<typeof HeadlessListbox.Options>,
  React.ComponentPropsWithoutRef<typeof HeadlessListbox.Options> & {
    className?: string;
  }
>(({ children, className, ...props }) => (
  <Transition
    as={React.Fragment}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <HeadlessListbox.Options
      {...props}
      className={cn(
        'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover px-1 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
        className,
      )}
    >
      {children}
    </HeadlessListbox.Options>
  </Transition>
));

ListBoxOptions.displayName = HeadlessListbox.Options.displayName;

export const ListBoxOption = React.forwardRef<
  React.ElementRef<typeof HeadlessListbox.Option>,
  React.ComponentPropsWithoutRef<typeof HeadlessListbox.Option> & {
    className?: string;
  }
>(({ ...props }) => (
  <HeadlessListbox.Option
    className={
      'relative cursor-pointer select-none rounded py-2 pl-10 pr-4 hover:bg-accent'
    }
    {...props}
  />
));

ListBoxOption.displayName = HeadlessListbox.Option.displayName;
