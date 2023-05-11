import { CSSProperties, RefObject, useEffect, useRef } from "react";
import styles from "./index.module.css";

interface Props {
  src: string;
  description: string[];
  mouseMoved: boolean;
  containerRef?: RefObject<HTMLDivElement>;
  style?: CSSProperties;
}

const PackCard: React.FC<Props> = ({
  src,
  description,
  containerRef,
  style,
  mouseMoved,
}) => {
  const packRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (packRef.current) {
      if (!mouseMoved) {
        packRef.current.classList.add(styles.syntheticHover);
      } else {
        packRef.current.classList.remove(styles.syntheticHover);
      }
    }
  }, [mouseMoved, packRef.current]);

  return (
    <>
      <div className={styles.packContainer} style={style} ref={containerRef}>
        <img className={styles.pack} src={src} ref={packRef} />
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
