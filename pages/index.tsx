import { NextPage } from "next";
import Head from "next/head";
import styles from "../src/styles/pages/index.module.css";
import { IPageProps } from "./_app";
import Nav from "@/src/components/Nav";
import PackCard from "@/src/components/PackCard";
import BannerText from "@/src/components/BannerText";
import Footer from "@/src/components/Footer";
import useCursor from "@/src/hooks/useCursor";
import { useEffect, useRef, useState } from "react";
import useWindow from "@/src/hooks/useWindow";

const PACK_GAP = 100;

const Home: NextPage<IPageProps> = ({
  connectedAddress,
  connectWallet,
  disconnect,
}) => {
  const { mouseX, mouseY } = useCursor();
  const { windowWidth } = useWindow();

  const [firstPos, setFirstPos] = useState<number[] | undefined>(undefined);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);
  const [scrollCounter, setScrollCounter] = useState<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

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

  const firstPackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstPackRef && firstPackRef.current) {
      const rightOfFirst =
        firstPackRef.current.getBoundingClientRect().x +
        firstPackRef.current.getBoundingClientRect().width;

      const width = firstPackRef.current.getBoundingClientRect().width;
      console.log(`${rightOfFirst}:${windowWidth}`);

      const packsOnScreen = windowWidth / (width + PACK_GAP);

      const indexRaw = windowWidth / (rightOfFirst * packsOnScreen);

      console.log(indexRaw);
      if (indexRaw < -1 || indexRaw > 1) {
        setScrollIndex(1);
      } else if (indexRaw > 0) {
        setScrollIndex(0);
      } else {
        // setScrollIndex(Math.floor(indexRaw * -1));
      }
    }
  }, [scrollCounter, firstPackRef, windowWidth]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={styles.container}
        style={mobileNavActive ? { overflow: "hidden" } : {}}
      >
        <Nav
          connectedAddress={connectedAddress}
          connectWallet={connectWallet}
          disconnect={disconnect}
          setActive={setMobileNavActive}
          active={mobileNavActive}
        />
        <BannerText displayText={"Lorem ipsum dolor sit amet"} />
        <div className={styles.bodyContainer}>
          <div
            className={styles.packContainer}
            onScroll={() => setScrollCounter((p) => p + 1)}
            style={{ gap: PACK_GAP }}
          >
            <PackCard
              containerRef={firstPackRef}
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
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              ]}
              mouseMoved={mouseMoved}
            />
          </div>
          <div className={styles.packProgress}>
            <div
              className={styles.progressButton}
              style={scrollIndex === 0 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 1 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 2 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 3 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 4 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 5 ? { backgroundColor: "red" } : {}}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 6 ? { backgroundColor: "red" } : {}}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
