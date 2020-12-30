import React, {Component} from 'react';
import {
 View, Text, StyleSheet
} from 'react-native';
import {Card} from 'native-base'


class Info extends Component{
      
    render(){
        const jsonContain = this.props.route.params.jsonData;
        return(
            <View style = {styles.Container}>
                <Card  style = {styles.Container} >
                    <Text>
                        {JSON.stringify(jsonContain)}
                    </Text>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container : {
        padding : 15,
    },

})

export default Info;
