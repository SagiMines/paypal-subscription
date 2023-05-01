import { NextPage } from 'next';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cancelSubscription, changePlan } from '@/DAL/functions';
import { MainContext } from '@/DAL/mainContext';
import PaypalSubscription from './PaypalSubscription';
import styles from '../styles/GenericModal.module.css';

const GenericModal: NextPage<{ buttonType: string }> = ({ buttonType }) => {
  // Main context
  const {
    subscriptionPlanDetails,
    setIsSubscribed,
    setSubscriptionPlanDetails,
  } = useContext(MainContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cancel button handler
  const handleCancelClick = async () => {
    await cancelSubscription();
    setIsSubscribed(false);
    setSubscriptionPlanDetails(undefined);
    handleClose();
  };

  // Sets the possible upgrade/downgrade of a plan or cancel
  const changePlanStatus = () => {
    return buttonType === 'change' &&
      subscriptionPlanDetails &&
      subscriptionPlanDetails.planName.split(' ')[1] === 'Monthly'
      ? 'Upgrade'
      : buttonType === 'change' &&
        subscriptionPlanDetails &&
        subscriptionPlanDetails.planName.split(' ')[1] === 'Annually'
      ? 'Downgrade'
      : 'Cancel';
  };

  return (
    <>
      <Button
        className={styles.changeSubscriptionButton}
        variant={buttonType === 'change' ? 'warning' : 'danger'}
        onClick={handleShow}
      >
        {changePlanStatus()} Subscription
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {buttonType === 'change' ? 'Change' : 'Cancel'} Subscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {buttonType === 'change'
              ? `Click on the Paypal checkout button to ${changePlanStatus()} your plan to '${
                  subscriptionPlanDetails &&
                  subscriptionPlanDetails.planName.split(' ')[0]
                } ${
                  subscriptionPlanDetails &&
                  changePlan(subscriptionPlanDetails.planName.split(' ')[1])
                }'?`
              : 'Are you sure you want to cancel your subscription?'}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {buttonType === 'change' && (
            <PaypalSubscription action="change" closeModal={handleClose} />
          )}
          {buttonType === 'cancel' && (
            <Button onClick={handleCancelClick} variant="danger">
              Yes, I'm sure
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenericModal;
