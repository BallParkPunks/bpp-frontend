import styles from "./index.module.css";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: number;
}

const MintModal: React.FC<Props> = ({ modalOpen, setModalOpen, type }) => {
  return modalOpen ? (
    <>
      <div className={styles.container} onClick={() => setModalOpen(false)}>
        <div className={styles.modalFrame}>
          <div
            className={styles.modalContainer}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {type}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default MintModal;
