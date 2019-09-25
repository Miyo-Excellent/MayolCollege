import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
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

const mapStateToProps = state => ({
  user: state.user.data,
  isLogin: state.user.isLogin,
});
const mapDispatchToProps = dispatch => ({});

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: {
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            maxWidth: 100,
          },
          {
            Header: 'ID',
            accessor: 'id',
            maxWidth: 100,
          },
          {
            Header: 'Average',
            accessor: 'average',
            maxWidth: 100,
          },
          {
            Header: '',
            accessor: 'actions',
            Cell: ({original}) => {
              const btnStyles = {
                background: '#cccccc',
                borderColor: 'none',
                borderWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                minWidth: 50,
                width: 50,
                minHeight: 50,
                height: 50,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 5,
                paddingRight: 5,
              };

              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    minWidth: 170,
                    paddingTop: 5,
                    paddingBottom: 20,
                  }}>
                  <div
                    style={{...btnStyles, marginRight: 5}}
                    onClick={async _event_ => await this.trash(_event_, original.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{color: '#00c9e6', fontSize: 14}}/>
                  </div>

                  <div style={{...btnStyles, marginRight: 5}} onClick={async _event_ => await this.edit(_event_)}>
                    <FontAwesomeIcon icon={faPen} style={{color: '#00c9e6', fontSize: 14}}/>
                  </div>

                  <div style={{...btnStyles, width: 'auto', minWidth: 120}}
                       onClick={async _event_ => await this.showReport(_event_)}>
                    Ver Reporte
                  </div>
                </div>
              )
            }
          },
        ],
        data: [
          {
            id: 2829183,
            name: 'Alberto',
            lastname: 'Boj Garcia',
            average: 4.1
          },
          {
            id: 2151213,
            name: 'Amparo',
            lastname: 'Ramos Torres',
            average: 4.2
          }, {
            id: 1238123,
            name: 'Amparo',
            lastname: 'Hermandez Ñiguez',
            average: 3.4
          },
          {
            id: 5621789,
            name: 'Ana Maria',
            lastname: 'Almira Rodriguez',
            average: 4.3
          },
          {
            id: 1359345,
            name: 'Angel Andreu',
            lastname: 'Serrano',
            average: 3.4
          },
          {
            id: 7862318,
            name: 'Antonio',
            lastname: 'Box Alanso',
            average: 4.2
          },
        ],
      },
      addStudent: {
        name: '',
        lastname: '',
        average: 0,
      },
      showAddModal: false
    };
  }

  onChangeTableValue = ({key = '', value}) => this.setState(state => ({
    ...state,
    table: {
      ...state.table,
      [key]: value,
    }
  }));

  onChangeAddStudentValue = ({key = '', value}) => this.setState(state => ({
    ...state,
    addStudent: {
      ...state.addStudent,
      [key]: value,
    }
  }));

  onCreateStudent = e => {
    const {table, addStudent, showAddModal} = this.state;
    e.preventDefault();

    if (addStudent.name && addStudent.lastname) {
      this.onChangeTableValue({
        key: 'data',
        value: table.data.concat({
          id: Math.random() * 1000,
          name: addStudent.name,
          lastname: addStudent.lastname,
          average: addStudent.average,
        })
      });

      this.setState(state => ({
        ...state,
        showAddModal: !showAddModal,
        addStudent: {
          ...state.addStudent,
          name: '',
          lastname: '',
          average: 0
        }
      }));
    }
  };


  trash = async (e, id) => {
    const {table} = this.state;

    e.preventDefault();

    this.onChangeTableValue({
      key: 'data',
      value: table.data.filter(el => el.id !== id)
    });
  };

  edit = async e => {
    e.preventDefault();
  };

  showReport = async e => {
    e.preventDefault();
  };

  render() {
    const {isLogin, user} = this.props;
    const {table, addStudent, showAddModal} = this.state;

    if (!isLogin) return <Redirect to='/login'/>;

    return (
      <Layout {...this.props}>
        <section className={styles.home}>
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

          <div className={styles.content}>
            <div className={styles.background}/>

            <div className={styles.actions}>
              <div className={styles.action}>
                <button className={styles.btn} onClick={_event_ => this.setState(state => ({
                  ...state,
                  showAddModal: !showAddModal
                }))}
                >Nuevo Estudiante
                </button>
              </div>
            </div>

            <div className={styles.students}>
              <ReactTable
                showPagination
                data={table.data}
                columns={table.columns}
              />
            </div>
          </div>

          {showAddModal && (
            <div className={styles.addStudentModal}>
              <div className={styles.wrapper}>
                <div
                  className={styles.close}
                  onClick={_event_ => this.setState(state => ({
                    ...state,
                    showAddModal: !showAddModal
                  }))}
                >
                  <FontAwesomeIcon icon={faTimes} className={styles.icon}/>
                </div>

                <form className={styles.form}>
                  <div className={styles.title}>
                    <h3 className={styles.text}>Nuevo Estudiante</h3>
                  </div>
                  <div className={styles.name}>
                    <label htmlFor="name" className={styles.label}>Nombre</label>
                    <input
                      type="text"
                      value={addStudent.name}
                      name="name"
                      className={styles.input}
                      onChange={_event_ => this.onChangeAddStudentValue({
                        key: 'name',
                        value: _event_.target.value
                      })}
                    />
                  </div>

                  <div className={styles.lastname}>
                    <label htmlFor="lastname" className={styles.label}>Apellido</label>
                    <input
                      type="text"
                      value={addStudent.lastname}
                      name="lastname"
                      className={styles.input}
                      onChange={_event_ => this.onChangeAddStudentValue({
                        key: 'lastname',
                        value: _event_.target.value
                      })}
                    />
                  </div>

                  <div className={styles.average}>
                    <label htmlFor="average" className={styles.label}>Promedio</label>
                    <input
                      type="number"
                      name="average"
                      className={styles.input}
                      value={addStudent.average}
                      onChange={_event_ => this.onChangeAddStudentValue({
                        key: 'average',
                        value: _event_.target.value
                      })}
                    />
                  </div>

                  <div className={styles.submit}>
                    <button
                      type="submit"
                      onClick={_event => this.onCreateStudent(_event)}
                    >Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
