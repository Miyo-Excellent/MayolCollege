import React, {Component} from 'react';
import {connect} from 'react-redux';
//  import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//  import {faTrash} from "@fortawesome/free-solid-svg-icons";
//  import _ from "lodash";
//  import moment from "moment";

//  Layout
import {Layout} from "../../components";

//  API
import {} from "../../api";

//  Actions
import {} from "../../actions";

//  Assets
import logo from "../../assets/images/logo_colegio.png";

//  Styles
import styles from "./styles.scss";

const mapStateToProps = state => ({user: state.user.data});
const mapDispatchToProps = dispatch => ({});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {user} = this.props;

    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.img}/>
        </div>

        <div className={styles.user}>
          <div className={styles.meta}>
            <div className={styles.name}>
              <h3 className={styles.text}>
                {`${user.name} ${user.lastname}`}
              </h3>
            </div>

            <div className={styles.role}>
              <h3 className={styles.text}>
                {user.role}
              </h3>
            </div>
          </div>

          <div className={styles.picture}>
            <img src={user.photo} alt="User photo" className={styles.img}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
