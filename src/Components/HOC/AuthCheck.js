import React, { Component } from 'react';
import { connect } from "react-redux";

export default function (ComposedClass, routeType, adminRoute = null) {
    class AuthCheck extends Component {
        state = {
            isLoading: false
        }
        componentDidMount() {
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                isLoading: false
            })

        }
        render() {
            if (this.state.isLoading) {
                return (
                    <div className="main_loader">
                        {/* <CircularProgress
                            style={{color:'#2196f3'}}
                            thickness={7}
                        /> */}

                    </div>
                )
            }
            return (
                <div>
                    <ComposedClass
                        {...this.props}
                        user={this.props.user}
                    />
                </div>
            );
        }
    }
    const mapStateToProps = state => {
        // const { userData } = state.auth
        return {
            user: {}
        }
    }
    return connect(mapStateToProps)(AuthCheck)
}