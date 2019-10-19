import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getAlerts(this.props.user.username);
    }



    handleRemoveSpecificRow = (alert) => {
        this.props.removeAlert(alert._id);
    };

    render() {
        const {user, alerts, alert} = this.props;
        return (
            <div  className="col" >
                <h2>שלום {user.firstName}!</h2>
                {alerts.loading && <em>טוען התראות...</em>}
                {alert.message && <span className="text-danger">שגיאה: אין אפשרות להציג התראות</span>}
                {alerts.alerts &&
                <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                >
                    <thead>
                    <tr>
                        <th className="text-center"> #</th>
                        <th className="text-center"> יצרן</th>
                        <th className="text-center"> דגם</th>
                        <th className="text-center"> מחיר</th>
                        <th className="text-center"> יד</th>
                        <th className="text-center"> קמ</th>
                        <th className="text-center"> מנוע</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {alerts.alerts.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                            <td>{idx}</td>
                            <td>
                                <input
                                    type="text"
                                    name="manufacturer"
                                    value={alerts.alerts[idx].manufacturer}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="model"
                                    value={alerts.alerts[idx].model}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="price"
                                    value={alerts.alerts[idx].price}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="hand"
                                    value={alerts.alerts[idx].hand}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="km"
                                    value={alerts.alerts[idx].km}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="engineval"
                                    value={alerts.alerts[idx].engineval}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => this.handleRemoveSpecificRow(item, idx)}
                                >
                                    הסר
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                }

                <Link to='/add'>
                    <button type="button" className="btn btn-info">הוסף התראה</button>
                </Link>
            </div>

        );

    }
}

function mapState(state) {
    const {alerts, authentication, alert} = state;
    const {user} = authentication;
    return {user, alerts, alert};
}

const actionCreators = {
    getAlerts: userActions.getAlerts,
    deleteUser: userActions.delete,
    removeAlert: userActions.removeAlert
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
