import React, { Component } from 'react'
import './Tabs.css'
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import classnames from 'classnames';

export default class Tabs extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Nav tabs id="summary-nav-bar">
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        id={this.state.activeTab === '1' ? "summary-nav-item-1-active" : "summary-nav-item-1"}
                    >
                        Summary
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        id={this.state.activeTab === '2' ? "summary-nav-item-2-active" : "summary-nav-item-2"}
                    >
                        League
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }} id="summary-nav-item-3"
                        id={this.state.activeTab === '3' ? "summary-nav-item-3-active" : "summary-nav-item-3"}
                    >
                        Live Game
            </NavLink>
                </NavItem>

            </Nav>
        )
    }
}
