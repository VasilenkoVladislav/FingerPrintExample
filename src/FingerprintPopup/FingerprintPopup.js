import React, { Component } from 'react';
import { Alert,
    Image,
    Text,
    TouchableOpacity,
    View } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from '../ShakingText';
import { styles } from './styles';

class FingerprintPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: null };
    }

    componentDidMount() {
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttempted })
            .then(() => {
                this.props.handlePopupDismissed();
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                this.setState({ errorMessage: error.message });
                this.description.shake();
            });
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }

    handleAuthenticationAttempted = (error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
    };

    render() {
        const { errorMessage } = this.state;
        const { style, handlePopupDismissed } = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.contentContainer, style]}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/finger_print.png')}/>
                    <Text style={styles.heading}>
                        Fingerprint{'\n'}Authentication
                    </Text>
                    <ShakingText
                        ref={(instance) => { this.description = instance; }}
                        style={[styles.description, {color: errorMessage ? '#ea3d13' : '#a5a5a5'}]}>
                        {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
                    </ShakingText>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handlePopupDismissed}>
                        <Text style={styles.buttonText}>
                            BACK TO MAIN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default FingerprintPopup;