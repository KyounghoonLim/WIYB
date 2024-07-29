import React from "react";
import ProfileNav from "./(components)/ProfileNav";
import ProfileForm from "./(components)/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="CONTENT-CONTAINER">
      <ProfileNav />
      <ProfileForm user={{}} />
    </main>
  );
}
