interface HeaderProps {
  title?: string;
  label: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  return (
    <div className="w-full">
      <h1 className="h1-bold">{title}</h1>
      <p className="text-base text-muted-foreground">to continue to {label}</p>
    </div>
  );
};
