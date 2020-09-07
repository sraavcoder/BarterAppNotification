import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allNotifications: [],
            userID: firebase.auth().currentUser.email,
        }
        this.requestRef = null
    }



    renderItem = ({ data, index }) => {
        <ListItem
            key={index}
            leftElement={<Icon name="book" type="font-awesome" color='#696969' />}
            title={"YOOOO"}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={data.message}
            bottomDivider
        />

    }

    getNotifications = () => {
        this.requestRef = db.collection("AllNotifications").where("NotificationStatus", "==", "Unread").where("UserID", "==", this.state.userID)
            .onSnapshot((snapshot) => {
                var allNotifications = []
                snapshot.docs.map(doc => {
                    var notification = doc.data();
                    notification["doc_id"] = doc.id;
                    allNotifications.push(notification);
                });
                this.setState({
                    allNotifications: allNotifications,
                });
                console.log(this.state.allNotifications);
            })
    }

    componentDidMount() {
        this.getNotifications();

    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Your Notifications" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allNotifications}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
