import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from '../../Actions';
import ModalHeader from "./ModalHeader";
import warning from '../../Resources/images/warning.svg'

class Alert extends Component {
    onButtonClick(e) {
        this.props.modal()
    }
    render() {
        return (
            <div>
                <ModalHeader />
                <div className="modal-body">
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <div
                            style={{
                                background: `url(${warning})`,
                                height: '48px',
                                backgroundSize: 'cover',
                                width: '48px',
                                margin: '5px auto'
                            }}

                        />
                    </div>
                    <p style={{ width: '100%', textAlign: 'center' }}>{this.props.info}</p>
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

export default connect(null, actions)(Alert);