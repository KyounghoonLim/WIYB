import Island_Profile from "./components/Island_Profile";
import Island_Search from "./components/Island_Search";
import Island_Equipments from "./components/Island_Equipments";
import Island_SimilarPlayers from "./components/Island_SimilarPlayers";
import Island_PopularEquipments from "./components/Island_PopularEquipments";
import Island_MyAgePlayers from "./components/Island_MyAgePlayers";
import Island_Community from "./components/Island_Community";
import MainNav from "./components/MainNav";

export default function MainPage() {
  return (
    <main className="SCROLLABLE-CONTAINER">
      <MainNav />
      <Island_Profile />
      <Island_Search />
      <Island_Equipments />
      <Island_SimilarPlayers />
      <Island_PopularEquipments />
      <Island_MyAgePlayers />
      <Island_Community />
    </main>
  );
}
