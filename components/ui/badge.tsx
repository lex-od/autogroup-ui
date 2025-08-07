import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        // Custom
        success:
          'border-transparent bg-green-500 text-white [a&]:hover:bg-green-500/90',
        warning:
          'border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-500/90',
        info: 'border-transparent bg-blue-500 text-white [a&]:hover:bg-blue-500/90',
        'tw-blue':
          'border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-950 dark:bg-blue-950/80 dark:text-blue-200',
        'tw-green':
          'border-green-200 bg-green-100 text-green-800 dark:border-green-950 dark:bg-green-950/80 dark:text-green-200',
        'tw-orange':
          'border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-950 dark:bg-orange-950/80 dark:text-orange-200',
        'tw-teal':
          'border-teal-200 bg-teal-100 text-teal-800 dark:border-teal-950 dark:bg-teal-950/80 dark:text-teal-200',
        'tw-yellow':
          'border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-950 dark:bg-yellow-950/80 dark:text-yellow-200',
        'tw-cyan':
          'border-cyan-200 bg-cyan-100 text-cyan-800 dark:border-cyan-950 dark:bg-cyan-950/80 dark:text-cyan-200',
        'tw-purple':
          'border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-950 dark:bg-purple-950/80 dark:text-purple-200',
        'tw-indigo':
          'border-indigo-200 bg-indigo-100 text-indigo-800 dark:border-indigo-950 dark:bg-indigo-950/80 dark:text-indigo-200',
        'tw-red':
          'border-red-200 bg-red-100 text-red-800 dark:border-red-950 dark:bg-red-950/80 dark:text-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
