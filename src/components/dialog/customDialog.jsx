import { Button } from '../buttons/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './dialog';

export const CustomDialog = ({
  triggerText,
  triggerTextVariant,
  triggerTextStyle,
  handleOnSubmit,
  title,
  description,
  children,
  dialogCloseText,
  dialogCloseAction,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerText && (
          <Button
            variant={triggerTextVariant}
            className={triggerTextStyle}
            onClick={handleOnSubmit}
          >
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && (
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose className="w-full">
            {dialogCloseText && <Button onClick={dialogCloseAction}>{dialogCloseText}</Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

