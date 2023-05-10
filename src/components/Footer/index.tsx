import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { browserName } from "react-device-detect";

interface Props {}

const Footer: React.FC<Props> = () => {
  const [mobileSafari, setMobileSafari] = useState<boolean>(false);

  useEffect(() => {
    if (browserName === "Mobile Safari") {
      setMobileSafari(true);
    } else {
      setMobileSafari(false);
    }
  }, []);
  return (
    <>
      <div
        className={styles.container}
        style={mobileSafari ? { marginBottom: 80 } : {}}
      >
        <div className={styles.copyright}>{`© 2023, BallParkPunks`}</div>
      </div>
    </>
  );
};

export default Footer;
