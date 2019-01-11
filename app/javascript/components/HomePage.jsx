import React from "react"
import PropTypes from "prop-types"
import $ from 'jquery'

import QuestionsStep from './QuestionsStep'
import FileStep from './FileStep'
import TermsStep from './TermsStep'

import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Fab from '@material-ui/core/Fab'

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,

      ticketFunding: true,
      attendees: "",
      revenue: "",
      file: "",
      agreed: false
    }
  }

  componentWillMount() {
    this.instantiateSteps()
  }

  componentDidMount() {
    this.$stepContainer = $('#step-container')
  }

  nextStep = (state) => {
    const {currentStep} = this.state
    $.each(state, (key, value) => {
      this.setState({[key]: state[key] })
    })
    var step = currentStep < this.stepComponents.length ? currentStep + 1 : this.props.steps.length

    step < this.stepComponents.length ? this.changeStep(step) : this.formComplete()
  }

  previousStep = () => {
    const {currentStep} = this.state
    var step = currentStep > 0 ? currentStep - 1 : 0
    this.instantiateSteps()

    this.changeStep(step)
  }

  changeStep = step => {
    $(this.$stepContainer).fadeOut(300, () => {
      this.setState({currentStep: step}, () => {
        $(this.$stepContainer).fadeIn(300)
      })
    })
  }

  formComplete = () => {
    const { ticketFunding, attendees, revenue, file, agreed} = this.state

    var event = {
      ticket_funding: ticketFunding,
      expected_attendees: attendees,
      expected_revenue: revenue,
      file: file,
      accepted_tc: agreed
    }
    $.post('/api/v1/events', {
      event: event
    }).done( data => {
      console.log(data)
    })
  }

  instantiateSteps = () => {
    const { ticketFunding, attendees, revenue, file, formValid } = this.state

    this.stepComponents = [
      <QuestionsStep onSubmit={this.nextStep} ticketFunding={ticketFunding} attendees={attendees} revenue={revenue} formValid={formValid}/>,
      <FileStep onSubmit={this.nextStep} file={file}/>,
      <TermsStep onSubmit={this.nextStep} terms={this.props.terms}/>,
    ]
  }

  render () {
    const {currentStep} = this.state



    return (
      <React.Fragment>
        <div id="step-container" className="iflex col center">
          {currentStep > 0 ? (
            <Fab variant="extended" className="fabs" onClick={this.previousStep}>
              <ArrowBackIosIcon/>
              Go back
            </Fab>
          ) : null }
          <div className="steps flex col center">
            {this.stepComponents[currentStep]}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default HomePage
