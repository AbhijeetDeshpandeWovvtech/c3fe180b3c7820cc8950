import React, {Component} from 'react';
import {
 View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput
} from 'react-native';
import {Button} from 'native-base'


class Home extends Component{

constructor(props){
    super(props);
    this.state = {
        page : 0,
        searchText : '',
        endReached : true,
        newsData : []
    }
}

componentDidMount(){
this.getData();
setInterval(()=>{
    this.getData();
}, 10000)

}

    getData(){
        console.log("getData>>>>>>>>>");
        return fetch(
            'https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+this.state.page
        )
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({newsData : [...this.state.newsData, ...responseJson.hits]})
        })
        .catch((error)=>{console.log(error);
        this.data()})
    }

    updateData=()=>{
      let pageUpdate = this.state.page + 1
        return fetch(
            'https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+pageUpdate
        )
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({newsData : [...this.state.newsData, ...responseJson.hits]})
        })
        .catch((error)=> console.log(error))
    }

    searchByDate(){
        var sorted = this.state.newsData;
        sorted.sort((a,b) => (a.created_at > b.created_at ? 1 : -1));
        this.setState({newsData : sorted})
    }

    searchByTitle(){
        var sorted = this.state.newsData;
        sorted.sort((a,b) => (a.title > b.title ? 1 : -1));
        this.setState({newsData : sorted})
    }

    changeText=(text)=>{
        this.setState({searchText : text})
    }
     
    data(){
        return (
            <Text>Data not found !!!</Text>
        )
    }

    

    searchFilter=(text)=>{
        this.setState({
            endReached : false
        })
        let searchData = this.state.newsData.filter((ele)=> {
            return(
                ele.author.toLowerCase().includes(text.toLowerCase()) ||
                ele.title.toLowerCase().includes(text.toLowerCase()) 
            )

        })
        this.setState({newsData : searchData})
        if(!text){
            alert("Data not found !!!")
        }
    }

    navigate(item){
        this.props.navigation.navigate('Info', {jsonData : item})
    }

    renderItem(data){
        //console.log("Hello>>>>>>",data);
        return(
            <TouchableOpacity style = {styles.container}
                onPress = {()=> this.navigate(data.item)}
            >
                <Text style = {styles.textStyle}>{data.item.title}</Text>
                <Text style = {styles.textStyle}><Text style = {{fontWeight : 'bold'}}>URL  : </Text>{data.item.url}</Text>
                <Text style = {styles.textStyle}><Text style = {{fontWeight : 'bold'}}>created_at : </Text> {data.item.created_at}</Text>
                <Text style = {styles.textStyle}><Text style = {{fontWeight : 'bold'}}>author  : </Text> {data.item.author }</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style = {styles.MainContainer}>
                <TextInput
                    placeholder = "Search by author or title"
                    value = {this.state.searchText}
                    onChangeText = {(text)=> this.changeText(text)}
                ></TextInput>
                <Button 
                    block
                    style = {styles.Button}
                    disabled = {this.state.searchText == '' ? true : false}
                    onPress = {()=>this.searchFilter(this.state.searchText)}
                >
                    <Text style = {styles.ButtonText}>Search</Text>
                </Button>
                <Button 
                    block
                    style = {styles.Button}
                    onPress = {()=>this.searchByDate()}
                >
                    <Text style = {styles.ButtonText}>Filter by Created_at</Text>
                </Button>
                <Button 
                    block
                    style = {styles.Button}
                    onPress = {()=>this.searchByTitle()}
                >
                    <Text style = {styles.ButtonText}>Filter by Title</Text>
                </Button>
                <FlatList
                    data = {this.state.newsData}
                    renderItem = {(item)=>this.renderItem(item)}
                    keyExtractor = {(index, id)=> id.toString()}
                    onEndReached = {this.state.endReached ? ()=> this.updateData() : null}
                    onEndReachedThreshold = {0.03}
                />
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      borderWidth : 1,
      borderColor : '#cccc',
      marginVertical : 10,
      padding : 10,
    },
    MainContainer : {
        padding : 20,
    }, 
    Button : {
        marginVertical : 5
    }, 
    ButtonText : {
        color : 'white'
    }, 
    textStyle : {
        marginVertical : 3,
    }
  });

export default Home;
