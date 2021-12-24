import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";

const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <>
      <ParallaxBG url="images/download.png">MYAPP</ParallaxBG>
    </>
  );
};

export default Home;
