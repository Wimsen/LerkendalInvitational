import React, {Component} from 'react'
import {userFetch, getFetch, getUserInfo, isAuthenticated} from '../auth/userAuth';
import {isAdminAuthenticated} from '../auth/adminAuth';
import {
    getCostumeContestants,
    postCostumeContestant,
    postCostumeVote,
    getCostumeVote,
    deleteCostumeContestant
} from '../service/costume';

import CostumeContestant from '../components/costume/CostumeContestant';
import ImageUploader from '../components/ImageUploader';
import LoadingSpinner from '../components/LoadingSpinner';

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            costumeContestants: [],
            votedCostume: -1
        }
    }

    async componentWillMount(){
        this.setState({
            loading: true
        });
        await Promise.all([this.getCostumeContestants(), this.getCostumeVote()]);
        this.setState({
            loading: false
        });
    }

    getCostumeVote = async () => {
        let votedCostume = await getCostumeVote();
        this.setState({
            votedCostume: votedCostume
        });
    }

    getCostumeContestants = async () => {
        let costumeContestants = await getCostumeContestants();
        this.setState({
            costumeContestants: costumeContestants
        });
    }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    uploadImage = async (data) => {
        console.log(data);
        let response = await postCostumeContestant(data.imageText, data.s3key);
        await this.getCostumeContestants();
    }

    voteCostume = async (costumeId) => {
        let result = await postCostumeVote(costumeId);
        await this.getCostumeVote();
    }

    deleteCostume = async (costumeId) => {
        let result = await deleteCostumeContestant(costumeId);
        await this.getCostumeContestants();
    }

    render() {
        return (
            <div>
                <h2>
                    Kostymeavstemning
                </h2>

                {
                    this.state.loading ? <LoadingSpinner />
                    : this.state.costumeContestants.map(contestant =>
                        <CostumeContestant
                            voted={this.state.votedCostume == contestant.id}
                            key={contestant.id}
                            voteCostume={this.voteCostume}
                            deleteCostume={this.deleteCostume}
                            {...contestant}
                        />
                    )
                }
                {
                    isAdminAuthenticated() &&
                    <div>
                        <button onClick={this.toggleModal} type="button" className="btn btn-primary">Last opp ny kandidat</button>
                    </div>
                }
                <ImageUploader
                    modalIsOpen={this.state.modalIsOpen}
                    toggleModal={this.toggleModal}
                    onSendPress={this.uploadImage}
                    headerText="Last opp kostyme kandidat"
                    bodyText="Skriv inn lagnavn"
                    s3path="costumes/"
                />
            </div>
        )
    }
}

export default Vote
