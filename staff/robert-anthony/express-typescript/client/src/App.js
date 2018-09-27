"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./App.css");
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            users: [],
            user: null
        };
        this.handleClick = (id) => {
            fetch(`/users/${id}`)
                .then(res => res.json())
                .then(user => user[0])
                .then(user => this.setState({ user }));
        };
        this.makeDetails = (user) => {
            return React.createElement("ul", null,
                React.createElement("li", { key: user.index + user.name }, user.name),
                React.createElement("li", { key: user.index + user.gender }, user.gender),
                React.createElement("li", { key: user.index + user.guid }, user.guid));
        };
        this.makeList = () => {
            return this.state.users.map((user) => React.createElement("li", { key: user.index.toString() },
                React.createElement("a", { href: "#", onClick: () => this.handleClick(user.index) }, user.name)));
        };
    }
    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => {
            this.setState({ users });
        })
            .catch(console.error);
    }
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement("h1", null, "Users"),
            (this.state.users.length > 0) && this.makeList(),
            this.state.user !== null && React.createElement("div", null, this.makeDetails(this.state.user))));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map