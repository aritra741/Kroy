import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import  BidStyle from "./BidStyle";
import { withStyles } from "@material-ui/core";
import { memo } from 'react';
const styles = (theme) => ({
 paper: {
    width:400
  },
});

class BidPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleClose= this.handleClose.bind(this)
  }

  handleClose(button) {
    if (button !== "done") {
      this.props.onClose(null);
    } else {
      this.formRef.current.submitForm();
    }
  }

  createCourseFromCourseForm(values) {
    //todo: create Course from values
    return {
      title: values.courseTitle,
      start: new Date(values.startTime),
      end: new Date(values.endTime),
      
    };
  }

  onSubmit(values) {
    this.props.onClose(this.createCourseFromCourseForm(values));
  }

  render() {
    const { classes } = this.props;
    return (
      <div  className={classes.paper}>
        <Dialog
       
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <BidStyle ref={this.formRef} onSubmit={this.onSubmit.bind(this)} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose.bind(this, "cancel")}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleClose.bind(this, "done")}
              color="secondary"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(memo(BidPopUp));
