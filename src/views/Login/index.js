//  Dependencies
import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Redirect} from "react-router";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import _ from "lodash";
//  import moment from "moment";

//  API
import {getUserData} from '../../api';

//  Validations
import validation from "../../validation";

//  Actions
import {onChangeUserIsLogin, onChangeUserData} from '../../actions';

//  Styles
import styles from './styles.scss';

//  Assets
import logo from '../../assets/images/logo_colegio.png'

const mapStateToProps = state => ({
  user: state.user.data,
  isLogin: state.user.isLogin
});
const mapDispatchToProps = dispatch => ({
  changeUserIsLogin(value) {
    onChangeUserIsLogin({dispatch, value})
  },
  changeUserData(data) {
    onChangeUserData({dispatch, data})
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      email: '',
      password: '',
      error: null,
      path: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  async onSubmit(_event_) {
    const {} = this.props;
    const {email, password} = this.state;

    const userData = await getUserData();

    _event_.preventDefault();

    if (!email) return this.setState(state => ({...state, error: 'Ingrese un correo valido'}));
    if (!password) return this.setState(state => ({...state, error: 'Ingrese una contraseña valida'}));

    const valide = await validation.validateAsync({email, password});

    if (!_.isEmpty(valide)) {
      this.setState(state => ({...state, error: null}));

      await localStorage.setItem('@user:data', JSON.stringify(userData));

      await this.props.changeUserData(userData);

      await this.props.changeUserIsLogin(true);

      this.setState(state => ({...state, redirect: true}));
    }
  }

  onChangeInput({key = '', value = ''}) {
    this.setState(state => ({...state, [key]: value}));
  }

  render() {
    const {history, isLogin} = this.props;
    const {redirect, path, error} = this.state;

    if (redirect || isLogin) {
      return <Redirect to="/"/>;
    }

    return (
      <main className={styles.login}>
        <div className={styles.banner}/>

        <form className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <img src={logo} alt="Logo" className={styles.img}/>
            </div>

            <div className={styles.inputs}>
              <div className={styles.email}>
                <label htmlFor="email" className={styles.label}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                </label>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  onChange={_event_ => this.onChangeInput({
                    key: 'email',
                    value: _event_.currentTarget.value
                  })}
                />
              </div>

              <div className={styles.password}>
                <label htmlFor="password" className={styles.label}>
                  <FontAwesomeIcon icon={faLock} className={styles.icon}/>
                </label>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  onChange={_event_ => this.onChangeInput({
                    key: 'password',
                    value: _event_.currentTarget.value
                  })}
                />
              </div>
            </div>

            <div className={styles.submit}>
              <button
                type="submit"
                className={styles.btn}
                onClick={this.onSubmit}
              >
                Ingresa
              </button>
            </div>

            <div className={styles.forgetPassword}>
              <span className={styles.text}>¿Olvidaste tu contraseña?</span>
            </div>

            {error && (
              <div className={styles.error}>
                <span className={styles.text}>{error}</span>
              </div>
            )}
          </div>
        </form>

        <footer className={styles.footer}>
          <div className={styles.title}>
            <h3 className={styles.text}>Colegio Mayol</h3>
          </div>

          <div className={styles.description}>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dicta enim est fuga in iure mollitia
              nisi, nulla omnis perspiciatis, praesentium quas quasi quisquam quos recusandae saepe, sint tempore
              voluptas.
            </p>
          </div>
        </footer>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
