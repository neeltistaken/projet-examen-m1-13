import { TailwindcssColors } from '@/types/tailwindcss-colors';

// we can not build class names dynamically because of the way tailwindcss works
// see https://tailwindcss.com/docs/content-configuration#dynamic-class-names

// to keep each color on its own line even if it's long. useful to modify with multiple cursors
// prettier-ignore
const colorAndVariant = {
  solid: {
    primary: "text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700",
    slate: "text-white bg-slate-500 hover:bg-slate-600 active:bg-slate-700",
    gray: "text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
    zinc: "text-white bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700",
    neutral: "text-white bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700",
    stone: "text-white bg-stone-500 hover:bg-stone-600 active:bg-stone-700",
    red: "text-white bg-red-500 hover:bg-red-600 active:bg-red-700",
    orange: "text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
    amber: "text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
    yellow: "text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
    lime: "text-white bg-lime-500 hover:bg-lime-600 active:bg-lime-700",
    green: "text-white bg-green-500 hover:bg-green-600 active:bg-green-700",
    emerald: "text-white bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700",
    teal: "text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700",
    cyan: "text-white bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700",
    sky: "text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700",
    blue: "text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
    indigo: "text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
    violet: "text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700",
    purple: "text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700",
    fuchsia: "text-white bg-fuchsia-500 hover:bg-fuchsia-600 active:bg-fuchsia-700",
    pink: "text-white bg-pink-500 hover:bg-pink-600 active:bg-pink-700",
    rose: "text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
  },
  outline: {
    primary: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 active:bg-primary-100",
    slate: "bg-transparent text-slate-600 border border-slate-600 hover:bg-slate-50 active:bg-slate-100",
    gray: "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-50 active:bg-gray-100",
    zinc: "bg-transparent text-zinc-600 border border-zinc-600 hover:bg-zinc-50 active:bg-zinc-100",
    neutral: "bg-transparent text-neutral-600 border border-neutral-600 hover:bg-neutral-50 active:bg-neutral-100",
    stone: "bg-transparent text-stone-600 border border-stone-600 hover:bg-stone-50 active:bg-stone-100",
    red: "bg-transparent text-red-600 border border-red-600 hover:bg-red-50 active:bg-red-100",
    orange: "bg-transparent text-orange-600 border border-orange-600 hover:bg-orange-50 active:bg-orange-100",
    amber: "bg-transparent text-amber-600 border border-amber-600 hover:bg-amber-50 active:bg-amber-100",
    yellow: "bg-transparent text-yellow-600 border border-yellow-600 hover:bg-yellow-50 active:bg-yellow-100",
    lime: "bg-transparent text-lime-600 border border-lime-600 hover:bg-lime-50 active:bg-lime-100",
    green: "bg-transparent text-green-600 border border-green-600 hover:bg-green-50 active:bg-green-100",
    emerald: "bg-transparent text-emerald-600 border border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100",
    teal: "bg-transparent text-teal-600 border border-teal-600 hover:bg-teal-50 active:bg-teal-100",
    cyan: "bg-transparent text-cyan-600 border border-cyan-600 hover:bg-cyan-50 active:bg-cyan-100",
    sky: "bg-transparent text-sky-600 border border-sky-600 hover:bg-sky-50 active:bg-sky-100",
    blue: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100",
    indigo: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50 active:bg-indigo-100",
    violet: "bg-transparent text-violet-600 border border-violet-600 hover:bg-violet-50 active:bg-violet-100",
    purple: "bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-50 active:bg-purple-100",
    fuchsia: "bg-transparent text-fuchsia-600 border border-fuchsia-600 hover:bg-fuchsia-50 active:bg-fuchsia-100",
    pink: "bg-transparent text-pink-600 border border-pink-600 hover:bg-pink-50 active:bg-pink-100",
    rose: "bg-transparent text-rose-600 border border-rose-600 hover:bg-rose-50 active:bg-rose-100"
  }
};

const sizes = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-2.5 py-1.5 text-md',
  lg: 'px-3 py-1.5 text-lg',
};

interface ButtonProps {
  color?: TailwindcssColors;
  variant?: 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pill?: boolean;
  onClick?: () => void;
  children: string;
}

export function Button({
  color = 'blue',
  variant = 'solid',
  size = 'md',
  pill = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`font-semibold ${colorAndVariant[variant][color]} ${
        sizes[size]
      } ${pill ? 'rounded-full' : 'rounded-md'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
