import React from "react";
import { GlobalContext } from "../Context/GlobalContext";
import styles from "./Storage.module.css";
import badIcon from "../img/badIcon.png";
import Modal from "../Hooks/Modal";
import loadingGif from "../img/loadingGif.gif";
import VerifyLocalStorage from "../Hooks/VerifyLocalStorage";

const Storage = () => {
  const { verify } = VerifyLocalStorage();
  const {
    storage,
    setStorage,
    totalPay,
    setTotalPay,
    totalAmount,
    setTotalAmount,
  } = React.useContext(GlobalContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);

  React.useEffect(() => {
    verify();
  }, [verify]);

  const deleteItem = React.useCallback(
    (item) => {
      const newStorage = storage.filter((obj) => obj !== item);
      localStorage.setItem("storage", JSON.stringify(newStorage));
      setStorage(newStorage);
    },
    [storage, setStorage]
  );

  React.useEffect(() => {
    function sum() {
      const totalToAmount = storage.reduce(
        (a, o) => a + Number(o.quantidade),
        0
      );
      const totalToPay = storage.reduce((a, o) => a + o.total, 0);
      setTotalAmount(totalToAmount);
      setTotalPay(totalToPay);
    }

    sum();
  }, [storage, totalPay, totalAmount, setTotalAmount, setTotalPay]);

  React.useEffect(() => {
    if (openModal || openModalDelete) {
      setTimeout(() => {
        setStorage([]);
        setOpenModal(false);
        setOpenModalDelete(false);
        localStorage.clear();
      }, 2000);
    }
  }, [openModal, setStorage, openModalDelete]);

  return (
    <div>
      {totalPay > 0 ? (
        <div className={styles.container}>
          <h1 className={styles.titulo}>Carrinho de compras:</h1>
          {storage.map((item) => (
            <div
              key={Math.random() * 10000}
              className={styles.containerStorage}
            >
              <div className={styles.containerStorageImg}>
                <div className={styles.img}>
                  <img src={item.image} alt="Imagem Produto" />
                </div>
              </div>
              <div className={styles.containerInfo}>
                <h2>{item.produto}</h2>
                <p>Preço: R$ {item.preço}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p>
                  {console.log(item.total)}
                  Total: R$ {item.total.toLocaleString("pt-BR")}
                </p>
                <button
                  onClick={() => deleteItem(item)}
                  className={styles.button}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
          <div className={styles.finishBuy}>
            {
              <h2>
                Subtotal ({totalAmount} itens):{" "}
                <span>R$ {totalPay.toLocaleString("pt-BR")}</span>
              </h2>
            }
            <button onClick={() => setOpenModal(!openModal)}>Finalizar</button>
            <button
              onClick={() => setOpenModalDelete(!openModalDelete)}
              className={styles.deleteButton}
            >
              Excluir Carrinho
            </button>

            <Modal
              text="Seu carrinho está sendo excluido"
              isOpen={openModalDelete}
              src={loadingGif}
            ></Modal>

            <Modal
              text="Obrigado pela preferência, seu pedido está sendo finalizado"
              className={styles.modal}
              isOpen={openModal}
              src={loadingGif}
            />
          </div>
        </div>
      ) : (
        <div className={styles.storageZero}>
          <img src={badIcon} alt="Icone de um rosto triste" />
          <p>Seu carrinho ainda está vazio.</p>
        </div>
      )}
    </div>
  );
};

export default Storage;
