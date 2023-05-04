import styles from "./index.module.css";

interface Props {
  displayText: string;
  top?: number;
}

const BannerText: React.FC<Props> = ({ displayText, top }) => {
  const multiplyText = (displayText: string) => {
    let buf = [];
    for (let i = 0; i < 10; i++) {
      buf.push(
        <div key={`multiplyText-${i}`}>
          {`${displayText}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      );
    }
    return buf;
  };
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
