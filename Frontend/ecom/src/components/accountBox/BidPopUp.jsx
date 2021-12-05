import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import  AddProductForm from "./AddProductF";
import { withStyles } from "@material-ui/core";
import { memo } from 'react';
import Bidform from "./BidForm";
import BidForm from "./BidForm";
const styles = (theme) => ({
 paper: {
  "borderRadius": 0
  },
});

class BidPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleClose= this.handleClose.bind(this)
  }

  handleClose() {
    console.log()
    // if (button !== "done") {
      this.props.onClose();
    // } else {
    //   this.formRef.current.submitForm();
    // }
  }

  createCourseFromCourseForm(values) {
    //todo: create Course from values
    console.log(values)
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
            <BidForm onclose={this.handleClose} productID= {this.props.productID}/>
          </DialogContent>
         
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(memo(BidPopUp));
