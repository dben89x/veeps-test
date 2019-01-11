import React from "react"
import PropTypes from "prop-types"

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import Rodal from 'rodal'

class TermsStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      modalContent: "",
      agreed: false
    }
  }

  modalClose = () => {
    this.setState({modalIsOpen: false})
  }

  modalOpen = () => {
    this.setState({modalIsOpen: true})
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.checked })
  }

  onSubmit = () => {
    this.state.agreed ? this.props.onSubmit(this.state) : null
  }

  render () {
    return (
      <React.Fragment>
        <Card raised={true} style={{textAlign: 'center'}}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Please note that Veeps enforces a ‘non-refundable, all sales final’ policy. You have the option to refund fans on an individual basis; however, per our Terms and Conditions, Veeps is not responsible for refunds issued and refunds are the sole responsibility of the artist.</Typography>
            <Button variant="outlined" color="primary" className="buttons" onClick={this.modalOpen}>
              View Full Terms and Conditions
            </Button>
            <FormControlLabel label="I agree to the terms and conditions" control={
              <Checkbox
                checked={this.state.agreed}
                onChange={this.handleChange('agreed')}
                value="agreed"
                color="primary"
              />
            }>

            </FormControlLabel>
            <Button variant="contained" color="primary" className="buttons" disabled={!this.state.agreed} onClick={this.onSubmit}>
              Continue
            </Button>
          </CardContent>
        </Card>
        <Rodal visible={this.state.modalIsOpen} onClose={this.modalClose} closeOnEsc={true} animation="flip">
          <div className="terms-modal flex col center">
            <p>{this.props.terms}</p>
          </div>
        </Rodal>
      </React.Fragment>
    )
  }
}

export default TermsStep
