"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./App.css");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            users: [],
            user: null
        };
        _this.handleClick = function (id) {
            fetch("/users/" + id)
                .then(function (res) { return res.json(); })
                .then(function (user) { return user[0]; })
                .then(function (user) { return _this.setState({ user: user }); });
        };
        _this.makeDetails = function (user) {
            return <ul><li key={user.index + user.name}>{user.name}</li>
        <li key={user.index + user.gender}>{user.gender}</li>
        <li key={user.index + user.guid}>{user.guid}</li></ul>;
        };
        _this.makeList = function () {
            return _this.state.users.map(function (user) { return <li key={user.index.toString()}><a href="#" onClick={function () { return _this.handleClick(user.index); }}>{user.name}</a></li>; });
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        fetch('/users')
            .then(function (res) { return res.json(); })
            .then(function (users) {
            _this.setState({ users: users });
        })
            .catch(console.error);
    };
    App.prototype.render = function () {
        return (<div className="App">
                <h1>Users</h1>
                {(this.state.users.length > 0) && this.makeList()}
                {this.state.user !== null && <div>{this.makeDetails(this.state.user)}</div>}
            </div>);
    };
    return App;
}(React.Component));
exports.default = App;
