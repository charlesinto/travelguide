import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from "./HOC/Layout";
import Home from "./Home";
import AuthCheck from "./HOC/AuthCheck";
import BookTrip from "./BookTrip";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={AuthCheck(Home)} />
                    <Route path="/book/new_trip" exact component={AuthCheck(BookTrip)} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;