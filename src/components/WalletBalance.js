import React, { useState } from 'react';
import Modal from 'react-modal';

function WalletBalance({ walletBalance, setWalletBalance }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [income, setIncome] = useState('');

  const handleAddIncome = () => {
    if (income > 0) {
      setWalletBalance(walletBalance + parseInt(income));
      setIncome('');
    }
  };

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance: <span>${walletBalance}</span></h2>
      <button onClick={openModal}>+ Add Income</button>
      <Modal /* className="custom-modal-style" */
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="custom-modal-style"
        overlayClassName="custom-overlay-style"
      >
        <h2>Ad Balance</h2>
        <div className='input-div'>
          <input className='modal-input'
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Income Amount"
          />
          <button className='modal-add-button' onClick={handleAddIncome}>Add Balance</button>
          <button className='modal-cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default WalletBalance;
