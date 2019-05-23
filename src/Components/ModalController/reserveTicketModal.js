import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from '../../Actions';
import ModalHeader from "./ModalHeader";

class reserveTicketModal extends Component {
    onButtonClick(e) {
        this.props.modal()
    }
    render() {
        return (
            <div>
                <ModalHeader />
                <div className="modal-body">
                    <p>Your Transaction Reference ID</p>
                    <p className="body-container"><code className="body-view-info">{this.props.info}</code></p>
                    <p className="body-tag text-info">
                        Please note that reservation cannot exceed <strong>two(2) hours</strong>,
                        after which the <strong>Transaction Reference ID</strong> becomed invalid
                    </p>
                </div>
                <div className="modal-footer">
                    <Button variant="contained" color="primary" onClick={(e) => this.onButtonClick(e)}>
                        Ok
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(reserveTicketModal);