import { NextPage } from "next";
import Head from "next/head";
import styles from "../src/styles/pages/index.module.css";
import { IPageProps } from "./_app";
import Nav from "@/src/components/Nav";
import PackCard from "@/src/components/PackCard";
import BannerText from "@/src/components/BannerText";
import Footer from "@/src/components/Footer";
import useCursor from "@/src/hooks/useCursor";
import { RefObject, useEffect, useRef, useState } from "react";
import useWindow from "@/src/hooks/useWindow";
import useMouseWheel from "@/src/hooks/useMouseWheel";

const PACK_GAP = 100;
const PACKS_IN_CAROUSEL = 7;

const Home: NextPage<IPageProps> = ({
  connectedAddress,
  connectWallet,
  disconnect,
}) => {
  const { mouseX, mouseY } = useCursor();
  const { windowWidth } = useWindow();
  const { setDisabled } = useMouseWheel(); // TODO: This does nothing at the moment

  const [firstPos, setFirstPos] = useState<number[] | undefined>(undefined);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);
  const [scrollCounter, setScrollCounter] = useState<number>(0);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [scrollLock, setScrollLock] = useState<boolean>(false);
  const [lockTime, setLockTime] = useState<number>(0);

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollLock) {
      if (Date.now() - lockTime >= 1250) {
        setScrollLock(false);
        setDisabled(false);
      }
      return;
    }

    if (firstPackRef && firstPackRef.current) {
      const leftOfFirst = firstPackRef.current.getBoundingClientRect().x;

      const width = firstPackRef.current.getBoundingClientRect().width;

      if (leftOfFirst > 0) {
        setScrollIndex(0);
      } else {
        let index = Math.ceil((leftOfFirst / (width + PACK_GAP / 2)) * -1);
        if (index > PACKS_IN_CAROUSEL - 1) {
          index = PACKS_IN_CAROUSEL - 1;
        }
        setScrollIndex(index);
      }
    }
  }, [scrollCounter, firstPackRef, windowWidth]);

  const simulateScroll = (
    index: number,
    firstPackRef: RefObject<HTMLDivElement>,
    scrollRef: RefObject<HTMLDivElement>
  ) => {
    if (
      firstPackRef &&
      firstPackRef.current &&
      scrollRef &&
      scrollRef.current
    ) {
      setScrollLock(true);
      setDisabled(true);
      setLockTime(Date.now());
      setScrollIndex(index);
      const width = firstPackRef.current.getBoundingClientRect().width;

      const targetScrollLeft = (width + PACK_GAP) * index;

      scrollRef.current.scrollTo({ left: targetScrollLeft });
    }
  };

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
            ref={scrollRef}
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
            <div className={styles.containerPlaceholder} />
          </div>
          <div className={styles.packProgress}>
            <div
              className={styles.progressButton}
              style={scrollIndex === 0 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(0, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 1 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(1, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 2 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(2, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 3 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(3, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 4 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(4, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 5 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(5, firstPackRef, scrollRef);
              }}
            />
            <div
              className={styles.progressButton}
              style={scrollIndex === 6 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                simulateScroll(6, firstPackRef, scrollRef);
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
