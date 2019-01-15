import React from "react"
import PropTypes from "prop-types"
import $ from 'jquery'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'

import AWS from 'aws-sdk'
var s3 = new AWS.S3()

class FileStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: this.props.file,
      valid: false,
    }
  }

  componentDidMount() {
    this.checkValidity()
  }

  fileChanged = e => {
    var { target } = e
    var objectUrl = URL.createObjectURL(target.files[0])

    var file = target.files[0];
    this.setState({file: file}, () => {
      this.checkValidity()
    })
  }

  checkValidity = () => {
    this.setState({ valid: this.state.file !== "" })
  }

  onSubmit = e => {
    e.preventDefault()
    this.state.valid ? this.props.onSubmit(this.state) : null
  }


  render () {
    const FileButton = () => (
      <React.Fragment>
        <input accept=".pdf" id="outlined-button-file" multiple type="file" onChange={this.fileChanged} style={{display: 'none'}}/>
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" color="primary" component="span" className="buttons">
            <CloudUploadIcon className="icons"/>
            Upload
          </Button>
        </label>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Card raised={true} style={{textAlign: 'center'}}>
          <CardContent>
            <Typography color="textSecondary">Please upload copies of your contract(s)/permit(s) with your venue provider.</Typography>
            <Typography color="textSecondary">File must be PDF.</Typography>
            <FormControl margin="normal">
              <FileButton/>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
                className="buttons"
                disabled={!this.state.valid}
              >
                Next
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default FileStep
