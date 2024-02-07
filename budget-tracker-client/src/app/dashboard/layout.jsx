
import React from 'react';
import SideNav from 'ui/components/nav/SideBar';


const Layout = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col p-6">
    <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
      {/* <AcmeLogo /> */}
    </div>
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-2 w-75">
      <SideNav />
      </div>
      <div className="md:py-12">
      { children }
      </div>
    </div>
  </main>
  );
}

export default Layout;   