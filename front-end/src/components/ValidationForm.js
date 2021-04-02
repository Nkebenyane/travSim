import React from "react";

const initialState = {
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: ""
};

export default class ValiationForm extends React.Component {
    state = initialState;

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";

        if (!this.state.name) {
            nameError = "name cannot be blank";
        }
        if (!this.state.password) {
            passwordError = "password can not be null";
        }

        if (!this.state.email.includes("@")) {
            emailError = "invalid email";
        }

        if (emailError || nameError || passwordError) {
            this.setState({ emailError, nameError, passwordError });
            return false;
        }

        return true;
    };

    

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState(initialState);

            const url = `https://api.github.com/users/${this.name}/repos`;
            fetch(url);
            console.log("fine me ");
        }
       
    };

    render() {
        return (
            <form className="Form-container" onSubmit={this.handleSubmit}>
                <h3>Form Validation</h3>
                <div >
                    <input
                        className="Form-Input"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 18, color: "red" }}>
                        {this.state.nameError}
                    </div>
                </div>
                <div >
                    <input
                        className="Form-Input"
                        name="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 18, color: "red" }}>
                        {this.state.emailError}
                    </div>
                </div>
                <div >
                    <input
                        className="Form-Input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 18, color: "red" }}>
                        {this.state.passwordError}
                    </div>
                </div>
                <button className="Form-Input" type="submit">submit</button>
            </form>
        );
    }
}