import { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import seedDummyPlanMeal from "./utils/dummySeed";

function App() {
  useEffect(() => {
    seedDummyPlanMeal();
  }, []);

  return (
    <>
      <MainRoutes/>
    </>
  );
}

export default App;