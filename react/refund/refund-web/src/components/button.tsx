import cx from "classnames";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "iconSmall";
};

const variants = {
  button: {
    base: "h-12",
    icon: "size-12",
    iconSmall: "size-8",
  },
};

export function Button({
  children,
  isLoading,
  className,
  variant = "base",
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={cx(
        "flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed",
        variants.button[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
