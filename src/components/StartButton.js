import React, { Component } from 'react'
import './StartButton.css';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export class StartButton extends Component {

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.props.submitForm.bind()}>
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

// PropTypes
StartButton.propTypes = {
    submitForm: PropTypes.func.isRequired
}

export default StartButton
