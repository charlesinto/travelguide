import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import InnerModal from "./innerModal";
import ReserveTicket from "./reserveTicketModal";
class ModalController extends Component {
    renderModal() {
        switch (this.props.modal) {
            case 'Reserve Booking':
                return <div className="modal-container">
                    <InnerModal>
                        <ReserveTicket info={this.props.modalDetails} />
                    </InnerModal>
                </div>
            default:
                return null
        }
    }
    render() {
        return (
            ReactDOM.createPortal(this.renderModal(), document.querySelector('#modal'))
        );
    }
}

const mapStateToProps = state => {
    const { selectedRide: { modal, modalDetails } } = state
    return {
        modal,
        modalDetails
    }
}

export default connect(mapStateToProps)(ModalController);
