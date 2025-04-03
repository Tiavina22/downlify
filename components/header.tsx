import { Theme } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

export function Header({}: HeaderProps) {
  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-background to-primary/10 border-b border-border/50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Downlify
        </h1>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

type HeaderProps = {
  theme?: Theme;
};
