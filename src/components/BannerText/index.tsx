import styles from "./index.module.css";

interface Props {
  displayText: string;
  top?: number;
}

const BannerText: React.FC<Props> = ({ displayText, top }) => {
  return (
    <>
      <div className={styles.container} style={{ top: top }}>
        <div className={styles.bannerText}>
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
          &nbsp;&nbsp;&nbsp;&nbsp;{`${displayText}`}
        </div>
      </div>
    </>
  );
};

export default BannerText;
