import { TailwindcssColors } from '@/types/tailwindcss-colors';

interface ButtonProps {
  color?: TailwindcssColors;
  variant ?: 'solid' | 'outline';
  children: string;
}

export function Button({ color = 'blue', variant = 'solid', children }: ButtonProps) {

  const colorAndVariant = {
    solid: {
      blue: 'bg-blue-500 hover:bg-blue-700',
    },
    outline: {
      blue: 'bg-transparent border-blue-500 hover:border-blue-700',
    },
  };
  return (
    <button
  // @ts-ignore
      className={`px-4 py-2 rounded-md text-white font-semibold ${colorAndVariant[variant][color]}`}
    >
      {children}
    </button>
  );
}
