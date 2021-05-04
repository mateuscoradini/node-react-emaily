// Survey form review para mostrar os resultados do formulario para o usuario

import React, { Component } from 'react';
import { connect } from 'react-redux';


const SurveyFormReview = ({ onCancel, formValues }) => {
    return (
        <div>
            <h5 className>Review your Survey!</h5>

            <button
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>

        </div>
    )
}

function mapStateToProps(state) {

    return {
        formValues: state.form.surveyForm.values
    };

}

export default connect(mapStateToProps)(SurveyFormReview);