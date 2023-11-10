import { useState } from 'react';

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

type UseDisclosureReturn = {
  isOpen: boolean; // A boolean representing the current open state of the disclosure.
  onOpen: () => void; // Function to set the disclosure state to open.
  onClose: () => void; // Function to set the disclosure state to closed.
  onToggle: () => void; // Function to toggle the disclosure state between open and closed.
};

export function useDisclosure(
  props: UseDisclosureProps = {},
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen || false);

  const onClose = (): void => setIsOpen(false);

  const onOpen = (): void => setIsOpen(true);

  const onToggle = (): void => {
    const action = isOpen ? onClose : onOpen;
    action();
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
