import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';

import ImagePreview from '../ImagePreview';

import {isAdminAuthenticated} from '../../auth/adminAuth';
import {getSignedUrl} from '../../service/s3';
import {postCostumeVote} from '../../service/costume'; 

class CostumeContestant extends Component {
    constructor(props){
        super(props);

        this.state = {
            imageUrl: "",
            loading: false,
            voteLoading: false,
            modalIsOpen: false
        };
    }

    toggleImagePreview = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    async componentWillMount(){
        this.setState({
            loading: true
        });
        let url = await getSignedUrl(this.props.s3key);
        this.setState({
            imageUrl: url,
            loading: false
        });
        console.log(url);
    }

    vote = async () => {
        this.setState({
            voteLoading: true
        });
        let result = await this.props.voteCostume(this.props.id);
        this.setState({
            voteLoading: false
        });
    }

    deleteCostume = async () => {
        this.setState({
            voteLoading: true
        });

        await this.props.deleteCostume(this.props.id);
        this.setState({
            voteLoading: false
        });
    }

    render() {
        return (
            <div className="costume-contestant center-text">
                <h3>{this.props.teamname}</h3>
                <div className="row ">
                    <div className="col">
                        {
                            this.state.loading ? <LoadingSpinner />
                            :
                            <img src={this.state.imageUrl} onClick={this.toggleImagePreview} />
                        }
                    </div>
                </div>

                {
                    this.state.voteLoading ? <LoadingSpinner />
                    :
                    <div className="row ">
                        <div className="col">
                            {
                                this.props.voted ?
                                <button disabled type="button" className="btn btn-success">Du har stemt på {this.props.teamname}</button>
                                :
                                <button onClick={this.vote} type="button" className="btn btn-primary">Stem på {this.props.teamname}</button>
                            }
                        </div>
                        {
                            isAdminAuthenticated() &&
                            <div className="col" >
                                <button onClick={this.deleteCostume} type="button" className="btn btn-danger">Slett {this.props.teamname}</button>
                            </div>
                        }
                    </div>
                }
                <hr/>

                <ImagePreview
                    toggleModal={this.toggleImagePreview}
                    modalIsOpen={this.state.modalIsOpen}
                    imageUrl={this.state.imageUrl}
                />
            </div>
        );
    }
}

export default withRouter(CostumeContestant);
