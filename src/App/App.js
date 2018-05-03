import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from '../FingerprintPopup';
import { styles } from './styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            popupShowed: false
        };
    }

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    handleFingerprintShowed = () => {
        this.setState({ popupShowed: true });
    };

    handleFingerprintDismissed = () => {
        this.setState({ popupShowed: false });
    };

    render() {
        const { errorMessage, popupShowed } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    React Native Fingerprint Scanner
                </Text>
                <Text style={styles.subheading}>
                    https://github.com/VasilenkoVladislav
                </Text>
                <TouchableOpacity
                    style={styles.fingerprint}
                    onPress={this.handleFingerprintShowed}
                    disabled={!!errorMessage}>
                    <Image source={require('../assets/finger_print.png')} />
                </TouchableOpacity>

                {errorMessage && (
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>
                )}
                {popupShowed && (
                    <FingerprintPopup
                        style={styles.popup}
                        handlePopupDismissed={this.handleFingerprintDismissed}/>
                )}
            </View>
        );
    }
}

export default App;