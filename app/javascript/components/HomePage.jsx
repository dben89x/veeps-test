import React from "react"
import PropTypes from "prop-types"
import $ from 'jquery'

import QuestionsStep from './QuestionsStep'
import FileStep from './FileStep'
import TermsStep from './TermsStep'

import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import Fab from '@material-ui/core/Fab'

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
      success: false,
      failure: false,
      formComplete: false,

      ticketFunding: true,
      attendees: "",
      revenue: "",
      file: "",
      agreed: false,
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

    var formData = new FormData()
    formData.append('event[ticket_funding]', ticketFunding)
    formData.append('event[expected_attendees]', attendees)
    formData.append('event[expected_revenue]', revenue)
    formData.append('event[file]', file)
    formData.append('event[accepted_tc]', agreed)

    $.ajax({
       url: '/api/v1/events',
       type: 'POST',
       data: formData,
       processData: false,
       contentType: false,
       success: (data) => {
         $(this.$stepContainer).fadeOut(300, () => {

           this.setState({success: true, formComplete: true}, () => {
             $(this.$stepContainer).fadeIn(300)
           })
         })
       },
       error: (data) => {
         $(this.$stepContainer).fadeOut(300, () => {
           this.setState({failure: true, formComplete: true}, () => {
             $(this.$stepContainer).fadeIn(300)
           })
         })
       }
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
    const {currentStep, success, failure, formComplete} = this.state


    return (
      <React.Fragment>
        <form action="/api/v1/events" id="mainform" ref={el => this.formRef = el}></form>
        <div id="step-container" className="iflex col center">
          {currentStep > 0 ? (
            <Fab variant="extended" className={`fabs ${formComplete ? 'hide' : 'show'}`} onClick={this.previousStep}>
              <ArrowBackIosIcon/>
              Go back
            </Fab>
          ) : null }
          <div className={`steps flex col center ${formComplete ? 'hide' : 'show'}`}>
            {this.stepComponents[currentStep]}
          </div>
          <div className={`success flex col center ${success ? 'show' : 'hide'}`}>
            <MoodIcon/>
            <p>Success!</p>
          </div>
          <div className={`failure flex col center ${failure ? 'show' : 'hide'}`}>
            <MoodBadIcon/>
            <p>Failure...</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default HomePage
