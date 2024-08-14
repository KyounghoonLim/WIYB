import LoginFooter from "./(components)/LoginFooter";
import LoginNav from "./(components)/LoginNav";
import LoginSection_1 from "./(components)/LoginSection_1";
import LoginSection_2 from "./(components)/LoginSection_2";

export default function LoginPage() {
  return (
    <main className="CONTENT-CONTAINER">
      {/* <LoginNav /> */}
      <LoginSection_1 />
      <LoginSection_2 />
      <LoginFooter />
    </main>
  );
}
