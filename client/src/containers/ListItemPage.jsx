import React from 'react';
import Auth from '../modules/Auth';
import ListItemForm from '../components/ListItemForm.jsx';


class ListItemPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      optionSelected: 'option1',
      active: false,
      period: ""
    };

    this.handleSetPeriod = this.handleSetPeriod.bind(this);
    this.handleSelectedOption = this.handleSelectedOption.bind(this);

  }

  handleSelectedOption(evt,value){
    console.log("Target typeof evt handleSelectedOption : ", typeof evt);

    if(typeof evt === "string"){
      this.setState({
        optionSelected: evt,
        period: value
      }, (index, value) =>{
        console.log("index : ", index );
        console.log("value : ", value);
        console.log("this : ", this);
      });
    }else{
      if (evt.target.nodeName === "INPUT"){
        var spanValue = evt.target.parentNode.children[1].value;
        var inputRadioBtn = evt.target.parentNode.children[0].value;
        console.log("spanValue : ", spanValue);
        console.log("inputRadioBtn : ", inputRadioBtn);

        this.setState({
          optionSelected: evt.target.value,
          period: spanValue
        }, (index, value) =>{
          console.log("index : ", index );
          console.log("value : ", value);
          console.log("this : ", this);
        });
      }
    }
  }

  handleSetPeriod(evt){
    console.log("Target NodeName handleSetPeriod : ", evt.target.nodeName);

    if (evt.target.nodeName === "SPAN"){
      var inputRadioBtn = evt.target.parentNode.children[0].value;
      var spanValue = evt.target.value;
      console.log("inputRadioBtn : ", inputRadioBtn);
      this.handleSelectedOption(inputRadioBtn, spanValue);
    }

    console.log("Target Parent : ", evt.target.parentNode);
    console.log("Target Children : ", evt.target.children);
    console.log("Target : ", evt.target);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ListItemForm
        handleSelectedOption={this.handleSelectedOption}
        optionSelected={this.state.optionSelected}
        handleSetPeriod={this.handleSetPeriod}
        period={this.state.period}
        active={this.state.active}
      />
    );
  }

}

export default ListItemPage;
