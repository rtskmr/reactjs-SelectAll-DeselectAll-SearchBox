import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Modal,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Toolbar } from 'react-native-material-ui';
import styles from './styles';
import Color from '../../styles/Color';
import { screenHeight } from '../../utilities/ScreenSize';
import districts from '../../utilities/districts';
import Fonts from '../../styles/Fonts';
const {
    container,
    searchTextInputStyle,
    dividerStyle
} = styles;
export class LocationSelector extends Component {
    constructor(props) {
        super(props);
        let copyListForProfile = [...districts];
        if (props.isFromUserProfile) {
            copyListForProfile.shift();//remove the first item
        }
        this.state = {
            fullListData: copyListForProfile,
            filteredList: copyListForProfile
        }
    }
    _keyExtractor = (item, index) => String(item.id);
    _renderItem = ({ item }) => {
        const isSelected = this.props.selectedLocation === item.name;
        const selectedStyle = { flexDirection: 'column', justifyContent: 'space-around', backgroundColor: Color.lightDark }
        const normalStyle = { flexDirection: 'column', justifyContent: 'space-around' }
        return (
            <TouchableOpacity
                onPress={() => this.props.updateSelectedLocations(item.name.trim())}
                style={normalStyle}
            >
                <CheckBox
                    containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                    title={item.name}
                    checkedColor={Color.dark}
                    iconType="ionicon"
                    checkedIcon="ios-checkmark-circle"
                    textStyle={{ color: Color.dark, fontFamily: Fonts.CharterBT, fontWeight: 'normal' }}
                    uncheckedIcon="ios-radio-button-off-outline"
                    checked={isSelected ? true : false}
                    onPress={() => this.props.updateSelectedLocations(item.name)}
                    size={35}
                />
            </TouchableOpacity>
        );
    }
    renderSeparator = () => {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                height: StyleSheet.hairlineWidth,
                backgroundColor: Color.placeholderWhite,
                // marginVertical: 5
            }}
            />
        );
    }
    renderHeader = () => {
        const { selectedLocation } = this.props;
        return (
            <Toolbar
                leftElement="close"
                centerElement={"Search..."}
                isSearchActive={false}
                style={{ container: { backgroundColor: Color.dark }, titleText: searchTextInputStyle }}
                searchable={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    autoFocus: true,
                    placeholder: "Search...",
                    returnKeyType: 'search',
                    maxLength: 20,
                    spellCheck: false,
                    onChangeText: this.searchText,
                    textStyle: searchTextInputStyle,
                    backgroundColor: 'white',
                }}
                onLeftElementPress={() => this.props.updateSelectedLocations(selectedLocation)}
            />
        );
    }
    searchText = (e) => {
        try {
            let trimmedText = e ? e.trim() : '';
            let text = trimmedText.toLowerCase();
            let fullList = this.state.fullListData;
            let filteredList = fullList.filter((item) => {
                if (item.name.toLowerCase().match(text))
                    return item;
            });
            if (!text || text === '') {
                this.setState({
                    filteredList: fullList
                });
            } else if (!filteredList.length) {
                this.setState({
                    filteredList: []
                });
            }
            else if (Array.isArray(filteredList)) {
                this.setState({
                    filteredList
                });
            }
        } catch (error) {
            this.setState({
                filteredList: this.state.fullListData
            });
        }
    }
    render() {
        const {
            isSelectLocationModalViewVisible
        } = this.props;
        return (
            <Modal
                visible={isSelectLocationModalViewVisible}
                transparent={true}
                style={container}
                animationType="slide"
                onRequestClose={() => null}
            >
                <View style={{ height: screenHeight, padding: 25, backgroundColor: Color.semiTransparentDarkOverlay }}>
                    {this.renderHeader()}
                    <View style={dividerStyle} />
                    <FlatList
                        contentContainerStyle={{ backgroundColor: Color.white }}
                        data={this.state.filteredList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        enableEmptySections={true}
                        bounces={false}
                    />
                </View>
            </Modal>
        );
    }
}
LocationSelector.propTypes = {
    isSelectLocationModalViewVisible: PropTypes.bool,
    selectedLocation: PropTypes.string,
    updateSelectedLocations: PropTypes.func,
    onPressBackButton: PropTypes.func,
    isFromUserProfile: PropTypes.bool
};