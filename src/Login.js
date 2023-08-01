import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import { useNavigate } from 'react-router-dom';


class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
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

  async doLogin(){
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try{
      let res = await fetch('http://localhost:8080/api/v1/auth', {
        method: 'post',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password
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
      <div className='login'>
        Log in 

        <InputField
          type='text'
          placeholder='Email'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
        />

        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />

        <SubmitButton
          text='Login'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
      </div>
    );
  }
}

export default Login;
 