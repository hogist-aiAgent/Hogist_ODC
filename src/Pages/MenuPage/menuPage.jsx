import RestaurantMenu from '../../components/RestaurantMenu/MenuHero/MenuHero';
import Navbar from '../../components/Layout/Header/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import ChooseRestaurant from '../../components/RestaurantMenu/ChooseRestaurant/ChooseRestaurant'

function OdcPage() {
  return (
    <>
      <Navbar />
      <RestaurantMenu/>
      <ChooseRestaurant/>
      <Footer />
    </>
  );
}

export default OdcPage;