import * as React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        className={cn(
          'flex h-10 w-full font-lato rounded-md border border-neutral-300 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {Icon && <Icon className="h-5 w-5 mr-2 absolute right-0 " />}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

