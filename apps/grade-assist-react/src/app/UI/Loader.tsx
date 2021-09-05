import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    overlay: {
      zIndex: 90,
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      opacity: '46%',
    },
  });
});
const Loader = () => {
  const classes: any = useStyles();

  return (
    <div className={classes.overlay}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
