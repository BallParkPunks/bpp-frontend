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
import MintModal from "@/src/components/MintModal";
import { Contract } from "web3-eth-contract";

const PACK_GAP = 100;
const PACKS_IN_CAROUSEL = 7;

const DESCRIPTION_ARRAY = [
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
  [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ],
];

const getPackIndex = (index: number, offset: number) => {
  const max = PACKS_IN_CAROUSEL;
  console.log(`(index + offset) % max`, (index + offset) % max);
  if (index + offset >= max) {
    return (index + offset) % max;
  }
  return index + offset;
};

const Home: NextPage<IPageProps> = ({
  contract,
  connectedAddress,
  connectWallet,
  disconnect,
}) => {
  const { mouseX, mouseY } = useCursor();
  // const { windowWidth } = useWindow();
  // const { setDisabled } = useMouseWheel(); // TODO: This does nothing at the moment

  const [firstPos, setFirstPos] = useState<number[] | undefined>(undefined);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);

  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);
  // const [scrollCounter, setScrollCounter] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const [scrollLock, setScrollLock] = useState<boolean>(false);
  // const [lockTime, setLockTime] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [packType, setPackType] = useState<number>(0);

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

  // const firstPackRef = useRef<HTMLDivElement>(null);
  // const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollLock) {
  //     if (Date.now() - lockTime >= 1250) {
  //       setScrollLock(false);
  //       setDisabled(false);
  //     }
  //     return;
  //   }

  //   if (firstPackRef && firstPackRef.current) {
  //     const leftOfFirst = firstPackRef.current.getBoundingClientRect().x;

  //     const width = firstPackRef.current.getBoundingClientRect().width;

  //     if (leftOfFirst > 0) {
  //       setScrollIndex(0);
  //     } else {
  //       let index = Math.ceil((leftOfFirst / (width + PACK_GAP / 2)) * -1);
  //       if (index > PACKS_IN_CAROUSEL - 1) {
  //         index = PACKS_IN_CAROUSEL - 1;
  //       }
  //       setScrollIndex(index);
  //     }
  //   }
  // }, [scrollCounter, firstPackRef, windowWidth]);

  // const simulateScroll = (
  //   index: number,
  //   firstPackRef: RefObject<HTMLDivElement>,
  //   scrollRef: RefObject<HTMLDivElement>
  // ) => {
  //   if (
  //     firstPackRef &&
  //     firstPackRef.current &&
  //     scrollRef &&
  //     scrollRef.current
  //   ) {
  //     setScrollLock(true);
  //     setDisabled(true);
  //     setLockTime(Date.now());
  //     setScrollIndex(index);
  //     const width = firstPackRef.current.getBoundingClientRect().width;

  //     const targetScrollLeft = (width + PACK_GAP) * index;

  //     scrollRef.current.scrollTo({ left: targetScrollLeft });
  //   }
  // };

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
        <MintModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          packType={packType}
          connectedAddress={connectedAddress}
          contract={contract}
        />
        <div className={styles.bodyContainer}>
          <div className={styles.packContainer}>
            <svg
              stroke="#fff"
              fill="#fff"
              stroke-width="0"
              viewBox="0 0 32 32"
              height="48"
              width="48"
              className={styles.svgArrow}
              onClick={() => setActiveIndex((p) => (p === 0 ? p : p - 1))}
            >
              <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 13 12 L 9 16 L 13 20 L 13 17 L 23 17 L 23 15 L 13 15 Z"></path>
            </svg>
            <PackCard
              src={"/pack-sample.webp"}
              description={DESCRIPTION_ARRAY[getPackIndex(activeIndex, 0)]}
              mouseMoved={mouseMoved}
              packType={0}
              setPackType={setPackType}
              setModalOpen={setModalOpen}
            />
            <svg
              stroke="#fff"
              fill="#fff"
              stroke-width="0"
              viewBox="0 0 32 32"
              height="48"
              width="48"
              className={styles.svgArrow}
              onClick={() =>
                setActiveIndex((p) => (p === PACKS_IN_CAROUSEL - 1 ? p : p + 1))
              }
            >
              <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 19 12 L 19 15 L 9 15 L 9 17 L 19 17 L 19 20 L 23 16 Z"></path>
            </svg>
            {/* <PackCard
              src={"/pack-sample.webp"}
              description={DESCRIPTION_ARRAY[getPackIndex(activeIndex, 1)]}
              mouseMoved={mouseMoved}
              packType={1}
              setPackType={setPackType}
              setModalOpen={setModalOpen}
            />
            <PackCard
              src={"/pack-sample.webp"}
              description={DESCRIPTION_ARRAY[getPackIndex(activeIndex, 2)]}
              mouseMoved={mouseMoved}
              packType={2}
              setPackType={setPackType}
              setModalOpen={setModalOpen}
            /> */}
            {/* <div className={styles.containerPlaceholder} /> */}
          </div>
          <div className={styles.packProgress}>
            <div
              className={styles.progressButton}
              style={activeIndex === 0 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(0);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 1 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(1);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 2 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(2);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 3 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(3);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 4 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(4);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 5 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(5);
              }}
            />
            <div
              className={styles.progressButton}
              style={activeIndex === 6 ? { backgroundColor: "red" } : {}}
              onClick={() => {
                setActiveIndex(6);
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
