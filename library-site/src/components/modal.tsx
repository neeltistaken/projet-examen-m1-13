import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

const maxWidths = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export function Modal({
  isOpen,
  onClose,
  children,
  withCloseButton = true,
  closeOnOverlayClick = true,
  width = 'lg',
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
            className={`relative z-20 bg-white p-4 sm:p-6 rounded shadow-lg ${maxWidths[width]} w-full`}
          >
            {withCloseButton && (
              <button
                className="absolute top-1 right-1 px-1 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
}
