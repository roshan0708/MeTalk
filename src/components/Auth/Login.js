import React, { useState } from "react";
import firebase from "../../firebase";
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
const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: [],
    loading: false,
  });

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

  const resetForm = () => {
    setState({
      email: "",
      password: "",
      errors: [],
      loading: false,
    });
  };

  const isFormValid = ({ email, password }) => email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(state)) {
      setState({ ...state, errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((signedInUser) => {
          console.log("user logged in");
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
    }
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="cogs" color="violet" />
          Login to DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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
            <Button
              className={state.loading ? "loading" : ""}
              disabled={state.loading}
              color="violet"
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
          Dont' have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
