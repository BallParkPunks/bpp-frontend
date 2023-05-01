import styles from "./index.module.css";

interface Props {
  connectedAddress?: string;
  connectWallet: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const Nav: React.FC<Props> = ({
  connectedAddress,
  connectWallet,
  disconnect,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.navContainer}>
            <img
              className={styles.navLogo}
              src={"/placeholder.png"}
              alt="nav-logo"
              onClick={() =>
                window.open(`https://www.ballparkpunks.com/`, `_self`)
              }
            />
            <div
              className={styles.navItem}
              onClick={() =>
                window.open(`https://www.ballparkpunks.com/`, `_self`)
              }
            >
              {`HOME`}
            </div>
            <div
              className={styles.navItem}
              onClick={() => {
                connectedAddress ? disconnect() : connectWallet();
              }}
            >
              {connectedAddress !== undefined
                ? `${connectedAddress.slice(0, 4)}...${connectedAddress.slice(
                    connectedAddress.length - 4,
                    connectedAddress.length
                  )}`
                : `CONNECT WALLET`}
            </div>
          </div>
          <div className={styles.socialsContainer}>
            <img
              src={`/socials/instagram.svg`}
              alt="instagram"
              className={styles.socialsIcon}
              onClick={() =>
                window.open(
                  `https://www.instagram.com/ballparkpunks/`,
                  `_blank`
                )
              }
            />
            <img
              src={`/socials/twitter.svg`}
              alt="twitter"
              className={styles.socialsIcon}
              onClick={() =>
                window.open(`https://twitter.com/BallParkPunks`, `_blank`)
              }
            />
            <img
              src={`/socials/discord.svg`}
              alt="discord"
              className={styles.socialsIcon}
              onClick={() =>
                window.open(
                  `https://discord.com/invite/ballparkpunks`,
                  `_blank`
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
