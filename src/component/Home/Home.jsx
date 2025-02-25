
import style from "./Home.module.css"

import RecentProducts from './Components/RecentProducts/RecentProducts'
import PoplularCategory from './Components/PoplularCategory/PoplularCategory'
import StaticSlider from './Components/StaticSlider/StaticSlider'
export default function Home() {

  return (
    <> 
   
    <PoplularCategory/>
    <RecentProducts/>
    <StaticSlider/>
    </>
  )
}
