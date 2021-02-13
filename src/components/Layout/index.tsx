import React from "react";
import Header from "../Header";
import Footer from "../Footer";

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <div className="App">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
