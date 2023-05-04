import { CSSProperties } from "react";
import styles from "./index.module.css";

interface Props {
  src: string;
  description: string[];
  style?: CSSProperties;
}

const PackCard: React.FC<Props> = ({ src, description, style }) => {
  return (
    <>
      <div className={styles.packContainer} style={style}>
        <img className={styles.pack} src={src} />
        <div className={styles.buyButton}>
          <div className={styles.buyText}>{`Mint`}</div>
        </div>
        <div className={styles.packDescription}>
          {description.map((p, index) => (
            <div className={styles.indent} key={`#${index}`}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PackCard;
