import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';

import {formatDateToTime} from '../../utils';
import {isAdminAuthenticated} from '../../auth/adminAuth';
import LoadingSpinner from '../LoadingSpinner';

import {registerResult} from '../../service/match';

class MatchListItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            modal: false,
            registerLoading: false
        };
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    registerWinner = async (winnerId, loserId) => {
        console.log(this.props);
        this.setState({
            registerLoading: true
        });

        await registerResult(this.props.id, winnerId, loserId);

        this.setState({
            registerLoading: false,
            modal: false
        });
        this.props.onRegisterComplete();
    }

    render() {
        let homeTeamClassName = "col";
        let awayTeamClassName = "col";
        if (this.props.winner_id) {
            homeTeamClassName = "col";
            awayTeamClassName = "col bold-text";
            if (this.props.winner_id == this.props.team1_id) {
                homeTeamClassName = "col bold-text";
                awayTeamClassName = "col ";
            }
        }

        return (
            <div className="center-text">
                <div className="row ">
                    <div className={homeTeamClassName}>
                        {this.props.homeTeamName}
                    </div>
                    <div className={awayTeamClassName}>
                        {this.props.awayTeamName}
                    </div>
                </div>
                {
                    this.props.winner ? ""
                    :
                    <div className="row">
                        <div className="col">
                            {formatDateToTime(new Date(this.props.start_time))}
                        </div>

                        <div className="col">
                            Bord {this.props.table_number + 1}
                        </div>
                    </div>
                }
                {
                    isAdminAuthenticated() &&
                    <div className="row">
                        <div className="col">
                            <button onClick={this.toggleModal} type="button" className="btn btn-primary btn-sm">Registrer resultat</button>
                        </div>
                    </div>
                }
                <hr/>

                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Registrer vinner</ModalHeader>
                    <ModalBody>
                        {
                            this.state.registerLoading ?  <LoadingSpinner />
                            :
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <button onClick={e => this.registerWinner(this.props.team1_id, this.props.team2_id)} type="button" className="btn btn-primary">{this.props.homeTeamName}</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <button onClick={e => this.registerWinner(this.props.team2_id, this.props.team1_id)} type="button" className="btn btn-primary">{this.props.awayTeamName}</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(MatchListItem);
