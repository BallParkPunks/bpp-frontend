import styles from "./index.module.css";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MintModal: React.FC<Props> = ({ modalOpen }) => {
  return (
    <>
      <div className={styles.container}></div>
    </>
  );
};

export default MintModal;
