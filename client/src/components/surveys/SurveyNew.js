//SurveyNew Mostra SurveyForm e SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    state = { showSurveyFormReview: false };

    renderContent() {
        if (this.state.showSurveyFormReview) {
            return <SurveyFormReview
                onCancel={() => this.setState({ showSurveyFormReview: false })}

            />;
        }

        return <SurveyForm
            onSurveySubmit={() => this.setState({ showSurveyFormReview: true })}
        />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }

}


export default SurveyNew;