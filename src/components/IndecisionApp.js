import React from 'react';

import Action from './Action'
import Header from './Header';
import Options from './Options';
import { AddOption } from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: [],
      selectedOption: undefined
    }

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);

    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.handlePick = this.handlePick.bind(this)

    this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this)
  }

  handlePick () {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => {
      return {
        selectedOption: option
      }
    })
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    })
  }

  handleDeleteOption(optionToRemove) {
    console.log('The option to remove is ', optionToRemove)
    this.setState(() => {
      return {
        options: this.state.options.filter((option) => optionToRemove !== option)
      }
      
    })
  }

  handleAddOption(option) {
    this.setState(() => {
      return {
        options: [
          ...this.state.options,
          option
        ]
      }
    })
  }

  handleClearSelectedOption(){
    this.setState(() => ({ selectedOption: undefined }))
  }

  componentDidUpdate() {
    console.log(this.state)
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer.'
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options 
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption 
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption = {this.handleClearSelectedOption}
        />
      </div>
    )
  }

}