import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import  AddProductStyle from "./AddProductStyle";
import { withStyles } from "@material-ui/core";
import { memo } from 'react';
const styles = (theme) => ({
 paper: {
  "borderRadius": 0
  },
});

class AddProductPopup extends React.Component {
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
      <div  >
        <Dialog

          style= {{
            "padding": "0px"
          }}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <AddProductStyle ref={this.formRef} onSubmit={this.onSubmit.bind(this)} />
          </DialogContent>
         
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(memo(AddProductPopup));
