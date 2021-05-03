// Survey form mostra um formulario para o usuario
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validEmails from '../../utils/validateEmails';

const FIELDS = [
    { name: "title", label: "Survey Title:" },
    { name: "subject", label: "Subject Line:" },
    { name: "body", label: "Email Body:" },
    { name: "emails", label: "Email`s List:" },

];


class SurveyForm extends Component {

    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }



    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        <i className="material-icons right">cancel</i>
                        Cancel</Link>

                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }

}


function validate(values) {

    const errors = {};

    errors.emails = validEmails(values.emails || '');

    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value.';
        }
    });



    return errors;
};


export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);