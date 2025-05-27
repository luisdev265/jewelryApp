import LayoutSideBar from "./SideBar/LayoutSideBar";
import type { ReactNode } from "react";

interface LayoutAdminPrincipalProps {
  children: ReactNode;
  section: string;
  error?: string;
}

const LayoutAdminPrincipal = ({ ...props }: LayoutAdminPrincipalProps) => {
  return (
    <LayoutSideBar>
      <div className="ml-8">
        <h1 className="text-2xl font-bold mb-8">{props.section}</h1>
      </div>
      {props.error && <p className="text-red-600">{props.error}</p>}
      {props.children}
    </LayoutSideBar>
  );
};

export default LayoutAdminPrincipal;
