import React from "react"
import PropTypes from "prop-types"


import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

class QuestionsStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formValid: false,

      ticketFunding: this.props.ticketFunding,
      attendees: this.props.attendees,
      revenue: this.props.revenue,
    }
  }

  componentDidMount() {
    this.setState({ formValid: this.formRef.checkValidity() })
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
    this.setState({ formValid: this.formRef.checkValidity() })
  }

  onSubmit = e => {
    e.preventDefault()
    this.state.formValid ? this.props.onSubmit(this.state) : null
  }

  render () {
    const ticketSalesOptions = [{
      value: true,
      label: "Yes",
    }, {
      value: false,
      label: "No"
    }]
    const {ticketFunding, attendees, revenue, formValid} = this.state

    return (
      <React.Fragment>
        <Card raised={true}>
          <CardContent>
            <form onSubmit={this.onSubmit} ref={el => this.formRef = el}>
              <FormControl>
                <TextField
                  onChange={this.handleChange("attendees")}
                  label="Expected attendees"
                  margin="normal"
                  type="number"
                  value={attendees}
                  required
                  helperText="How many people do you anticipate in attendance?"
                />
                <TextField
                  onChange={this.handleChange("revenue")}
                  label="Expected revenue"
                  margin="normal"
                  type="number"
                  value={revenue}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  helperText="How much revenue do you anticipate?"
                />
                <TextField
                  onChange={this.handleChange("ticketFunding")}
                  margin="normal"
                  select
                  required
                  value={ticketFunding}
                  helperText="Will you be relying exclusively on ticket sales to fund your tour/event?"
                  >
                    {ticketSalesOptions.map( option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={this.onSubmit}
                    disabled={!formValid}
                    className="buttons"
                    >
                      Next
                    </Button>
                  </FormControl>
                </form>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

export default QuestionsStep
