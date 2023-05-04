import { NextPage } from "next";
import Head from "next/head";
import styles from "../src/styles/pages/index.module.css";
import { IPageProps } from "./_app";
import Nav from "@/src/components/Nav";
import PackCard from "@/src/components/PackCard";
import BannerText from "@/src/components/BannerText";
import Footer from "@/src/components/Footer";
import useCursor from "@/src/hooks/useCursor";
import { useEffect, useState } from "react";

const Home: NextPage<IPageProps> = ({
  connectedAddress,
  connectWallet,
  disconnect,
}) => {
  const { mouseX, mouseY } = useCursor();

  const [firstPos, setFirstPos] = useState<number[] | undefined>(undefined);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  useEffect(() => {
    if (mouseMoved) {
      return;
    }
    if (mouseX && mouseY) {
      if (firstPos === undefined) {
        setFirstPos([mouseX, mouseY]);
      } else {
        if (mouseX !== firstPos[0] || mouseY !== firstPos[1]) {
          setMouseMoved(true);
        }
      }
    }
  }, [mouseX, mouseY]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Nav
          connectedAddress={connectedAddress}
          connectWallet={connectWallet}
          disconnect={disconnect}
        />
        <BannerText displayText={"Lorem ipsum dolor sit amet"} />
        <div className={styles.bodyContainer}>
          <div className={styles.packContainer}>
            <PackCard
              src={"/pack-sample.webp"}
              description={[
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
            <PackCard
              src={"/pack-sample.webp"}
              description={[
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
            <PackCard
              src={"/pack-sample.webp"}
              description={[
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
            <PackCard
              src={"/pack-sample.webp"}
              description={[
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
            <PackCard
              src={"/pack-sample.webp"}
              description={[
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
