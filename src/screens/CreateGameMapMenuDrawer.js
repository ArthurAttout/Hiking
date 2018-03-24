import React from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../utils/constants'
import Icon from 'react-native-vector-icons/Foundation';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    FlatList, TouchableNativeFeedback
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList:{
        backgroundColor:'#ffffff',
        width:'100%'
    },
    trackItem:{
        backgroundColor:COLORS.Secondary,
        marginBottom:20,
        paddingTop:15,
        paddingBottom:15,
    },
    text:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
});

export default class Menu extends React.Component{
    render(){
        return (
           <View style={styles.container}>
               <FlatList
                   style={styles.flatList}
                   data={this.props.userTracks}
                   keyExtractor={item => item.id.toString()}
                   renderItem={({ item }) => (
                       <View>
                           <TouchableNativeFeedback
                               background={TouchableNativeFeedback.Ripple('white')}
                               delayPressIn={0}>
                               <View style={styles.trackItem}>
                                   <Text style={styles.text}>
                                       Track (has {item.beacons.length} beacons)
                                   </Text>
                               </View>
                           </TouchableNativeFeedback>
                       </View>
                   )}>
               </FlatList>
               <Icon.Button
                    name="plus"
                    color={COLORS.Primary}
                    backgroundColor='transparent'
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}/>
           </View>
        );
    }
}
