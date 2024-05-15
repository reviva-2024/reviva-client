import * as React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(
  ({ outerClassName, innerClassName, type, icon: Icon, ...props }, ref) => {
    return (
      <div className={cn(`flex items-center m-1 relative`, outerClassName)}>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full font-lato rounded-md border border-neutral-300 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8',
            innerClassName
          )}
          ref={ref}
          {...props}
        />
        {Icon && <Icon className="absolute right-0 w-5 h-5 mr-2 " />}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
