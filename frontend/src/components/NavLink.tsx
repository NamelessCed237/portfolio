import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
  onClick?: () => void;
}

export const NavLink = ({ 
  to, 
  children, 
  className, 
  activeClassName,
  end,
  ...props 
}: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(className, isActive && activeClassName)
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};
