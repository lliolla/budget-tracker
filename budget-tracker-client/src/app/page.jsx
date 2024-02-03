

import Link from "next/link"

export default function Home() {
  return (
    <main data-theme="mytheme">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


  <h3>Budget Tracker</h3>
<p>Mon appli pour gérer mes comptes et mes depenses </p>
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <Link className="btn m-5" href="/login">
  Commencer
  </Link>
  <Link className="btn" href="/register">
  S'inscrire
  </Link>
            </div>

  </div>
    
  

    </main>
  );
}