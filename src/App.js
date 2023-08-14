import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserStore from './stores/UserStore';
import Login from './Login';
import Registration from './Registration';
import { observer } from 'mobx-react';
import SubmitButtom from './SubmitButton';
import './App.css';

class App extends React.Component{

  async componentDidMound(){
    try{
      let res = await fetch('http://localhost:8080/api/v1/auth', {
        method: 'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = 'user';
      }
      else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e){
      console.log(e)
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout(){
    try{
      let res = await fetch('http://localhost:8080/api/v1/auth', {
        method: 'post',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if(result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
      else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e){
      console.log(e)
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  render(){
    if(UserStore.loading){
      return (
        <div className='app'>
          <div className='container'>
            Loading, please wait..
          </div>
        </div>
      )
    }

    else{
      if(UserStore.isLoggedIn){
        return (
          <div className='app'>
            <div className='container'>
              Welcome {UserStore.username}
              <SubmitButtom
                text={'Log out'}
                disabled={false}
                onClick={ () => this.doLogout()}
              />
            </div>
          </div>
        )
      }
      return (
          <div className='container'>
              <BrowserRouter>
                <Routes>
                  <Route index path = "/login" element ={<Login/>}/>
                  <Route path = "/registration" element={<Registration/>}/>
                </Routes>
              </BrowserRouter>
          </div>
      );
    }
  }
}

export default observer(App);
