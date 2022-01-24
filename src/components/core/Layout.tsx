import React, { ReactNode } from "react";
import Menu from "./Menu";
import "../../styles.css";

interface LayoutProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}: LayoutProps) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
