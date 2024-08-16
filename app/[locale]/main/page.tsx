import Island_Profile from 'comp/island/islandComponents/Island_Profile'
import Island_Search from 'comp/island/islandComponents/Island_Search'
import Island_MyEquipments from 'comp/island/islandComponents/Island_MyEquipments'
import Island_SimilarPlayers from 'comp/island/islandComponents/Island_SimilarPlayers'
import Island_PopularEquipments from 'comp/island/islandComponents/Island_PopularEquipments'
import Island_MyAgePlayers from 'comp/island/islandComponents/Island_MyAgePlayers'
import Island_Community from 'comp/island/islandComponents/Island_Community'
import MainNav from './(components)/MainNav'

export default function MainPage() {
  return (
    <main className="SCROLLABLE-CONTAINER">
      <MainNav />
      <Island_Profile />
      <Island_Search />
      <Island_MyEquipments />
      <Island_SimilarPlayers />
      <Island_PopularEquipments />
      <Island_MyAgePlayers />
      <Island_Community />
    </main>
  )
}
