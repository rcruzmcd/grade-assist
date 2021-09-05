import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
  CardHeader,
  Snackbar,
} from '@material-ui/core';
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useContext, useRef } from 'react';
import { AuthContext } from '../context/auth-context';
import Loader from '../UI/Loader';

// const Alert = (props: AlertProps) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
    },
    title: {
      textAlign: 'center',
    },
  });
});

const Login = () => {
  const classes: any = useStyles();
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const loginHandler = () => {
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data: any) => {
        ctx.onLogin(data.token);
      })
      .catch((err) => {
        alert(err.message);
        // <Snackbar
        //   open={true}
        //   message={err.message}
        //   autoHideDuration={6000}
        //   anchorOrigin={{
        //     vertical: 'top',
        //     horizontal: 'right',
        //   }}
        // />;
      });
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Card>
            <CardHeader title="Grade Assist" className={classes.title} />
            <CardContent>
              <form autoComplete="off">
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      inputRef={emailInputRef}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      type="password"
                      variant="outlined"
                      inputRef={passwordInputRef}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={loginHandler}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
