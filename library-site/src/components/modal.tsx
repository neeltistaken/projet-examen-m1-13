import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  withCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  width?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
}

export function Modal({
  isOpen,
  onClose,
  children,
  withCloseButton = true,
  closeOnOverlayClick = true,
  width = 'md',
}: ModalProps) {
  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
          {/*Modal overlay*/}
          <div
            className="fixed inset-0"
            onClick={closeOnOverlayClick ? onClose : undefined}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          {/*Modal body*/}
          <div
            className={`z-20 bg-white p-4 sm:p-6 rounded shadow-lg max-w-${width} w-full`}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
