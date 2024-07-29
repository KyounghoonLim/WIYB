"use client";

import SignNav from "./(components)/SignNav";
import SignForm from "./(components)/SignForm";

export default function SignPage() {
  return (
    <main className="CONTENT-CONTAINER flex-col-start">
      <SignNav />
      <SignForm />
    </main>
  );
}
