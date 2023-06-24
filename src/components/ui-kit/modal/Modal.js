import styles from "./Modal.module.css";
import { Button } from "..";

const Modal = ({ setIsOpen, title='title', message='', confirm='Ok', handleConfirm, children }) => {

    const onConfirm = () => {
        if(typeof handleConfirm === 'function')
        {
            handleConfirm();
        }
    };

    return (
      <>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>{title}</h5>
            </div>
            <Button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              X
            </Button>
            { message ? (
              <div className={styles.modalContent}>
                {message}
              </div>
            ) : null}
            {children}
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <Button className={styles.deleteBtn} onClick={onConfirm}>
                  {confirm}
                </Button>
                <Button
                  className={styles.cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

Modal.displayName = 'Modal'
export default Modal;