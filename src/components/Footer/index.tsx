import styles from './index.module.css';

interface Props {

}

const Footer: React.FC<Props> = () => {
  return (
    <>
      <div className={styles.container}><div className={styles.copyright}>{`© 2023, BallParkPunks`}</div></div>
    </>
  );
};

export default Footer;
