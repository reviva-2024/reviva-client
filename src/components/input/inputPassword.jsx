import * as React from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

const InputPassword = React.forwardRef(({ outerClassName, innerClassName, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <label className={cn(`flex flex-col gap-y-1 my-2 relative`, outerClassName)}>
      Password
      <input
        type={isOpen ? 'text' : 'password'}
        className={cn(
          'flex h-10 w-full font-lato rounded-md border border-neutral-300 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8',
          innerClassName
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-0 w-5 h-5 mr-2 top-[38px]`}
      >
        {isOpen ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </label>
  );
});

InputPassword.displayName = 'Input';

export { InputPassword };
