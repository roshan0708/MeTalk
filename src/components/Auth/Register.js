import React, { useState } from "react";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const Register = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  });

  const isFormValid = () => {
    let errors = [];
    let error;
    if (isFormEmpty(state)) {
      error = { message: "Fill in all fields" };
      setState({ errors: errors.concat(error) });
      return false;
    } else if (!isPasswordValid(state)) {
      error = { message: "Passwords is invalid" };
      setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false;
    } else {
      return password === passwordConfirmation;
    }
  };

  const isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  const saveUser = (createdUser) => {
    return state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const resetForm = () => {
    setState({
      ...state,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      loading: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setState({ ...state, errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser)
                .then(() => {
                  console.log("user saved");
                  setState({ ...state, loading: false });
                  resetForm();
                })
                .catch((err) => {
                  console.log(err);
                  setState({
                    ...state,
                    errors: state.errors.concat(err),
                    loading: false,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              setState({
                ...state,
                errors: state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          setState({
            ...state,
            errors: state.errors.concat(err),
            loading: false,
          });
        });
    }
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="cogs" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={state.username}
              type="text"
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              className={handleInputError(state.errors, "email")}
              value={state.email}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={state.password}
              className={handleInputError(state.errors, "password")}
              type="password"
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={state.passwordConfirmation}
              className={handleInputError(state.errors, "password")}
              type="password"
            />
            <Button
              className={state.loading ? "loading" : ""}
              disabled={state.loading}
              color="orange"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {state.errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(state.errors)}
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
