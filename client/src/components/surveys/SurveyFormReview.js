// Survey form review para mostrar os resultados do formulario para o usuario
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions  from '../../actions/index';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>

        );
    });

    return (
        <div>
            <h5>Review your Survey!</h5>
            {reviewFields}

            <button
                className="yellow darken-3 btn-flat white-text"
                onClick={onCancel}
            >
                Back
            </button>

            <button 
            onClick={() => submitSurvey(formValues, history)}
            className="green darken-2 btn-flat right white-text" type="submit">
                Send Survey!
                        <i className="material-icons right">email</i>
            </button>

        </div>
    )
}

function mapStateToProps(state) {

    return {
        formValues: state.form.surveyForm.values
    };

}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));