import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allNotifications: [],
            userID: firebase.auth().currentUser.email,
            message: '',
            itemName: '',
        }
        this.requestRef = null
    }

    getNotifications = () => {
        db.collection("AllNotification").where("NotificationStatus", "==", "Unread").where("UserID", "==", this.state.userID).get()
            .then(
                snapshot => {
                    snapshot.forEach((doc) => {
                        var a = doc.data().message;
                        var b = doc.data().itemName;
                        var allNotifications = []
                        allNotifications.push({ "itemName": a, "message": b });
                        this.setState({
                            allNotifications: allNotifications,
                            message: allNotifications[0],
                            itemName: allNotifications[1]
                        })
                    })
                }
            )
    }



    componentDidMount() {
        this.getNotifications();
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
                        renderItem={({ item, index }) => (
                            <View style={{ borderBottomWidth: 2, borderColor: '#a5a5a5', }}>
                                <View style={{ marginLeft: 10 }} >
                                    <Text style={{ paddingTop: 10, fontSize: 15, paddingBottom: 3 }}>{<b>{item.itemName}</b>}</Text>
                                    <Text style={{ paddingBottom: 3, fontSize: 15 }}>{item.message}</Text>
                                </View>

                            </View>
                        )}
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
