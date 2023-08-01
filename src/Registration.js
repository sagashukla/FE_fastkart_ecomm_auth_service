import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import UserType from './UserType';

class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      usertype: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    console.log("inside setInputValue")
    console.log(val)
    //val = val.trim();
    if(val.length > 30){
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doRegistration(){
    console.log("entered registration")
    if(!this.state.firstname){
      return;
    }
    if(!this.state.lastname){
      return;
    }
    if(!this.state.email){
        return;
    }
    if(!this.state.password){
        return;
    }
    if(!this.state.usertype){
        return;
    }

    console.log("entered registration 2")

    this.setState({
      buttonDisabled: true
    })

    try{
      let res = await fetch('http://localhost:8080/api/v1/register', {
        method: 'post',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          roleType: this.state.usertype
        })
      });

      let result = await res.json();

      if(res.status == 200){
        UserStore.isLoggedIn = true;
        UserStore.username = '';
      }
      else if(result && result.success == false){
        this.resetForm();
        alert(result.msg);
      }
      console.log(UserStore.isLoggedIn)
    }
    catch(e){
      console.log(e);
      this.resetForm();
    }
  }

  render(){
    return (
      <div className='Registration'>
        Registration

        <InputField
          type='text'
          placeholder='First name'
          value={this.state.firstname ? this.state.firstname : ''}
          onChange={(val) => this.setInputValue('firstname', val)}
        />

        <InputField
          type='text'
          placeholder='Last name'
          value={this.state.lastname ? this.state.lastname : ''}
          onChange={(val) => this.setInputValue('lastname', val)}
        />  

        <InputField
          type='text'
          placeholder='Email'
          value={this.state.email ? this.state.email : ''}
          onChange={(val) => this.setInputValue('email', val)}
        />  
        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />

        <UserType
            value={this.state.usertype ? this.state.usertype : ''}
            onChange={(val) => this.setInputValue('usertype', val)}
        />
        <SubmitButton
          text='Registration'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doRegistration()}
        />
      </div>
    );
  }
}

export default Registration;
 