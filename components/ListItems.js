import React,{useState} from 'react';

//styled components
import{
    ListView,
    ListViewHidden,
    HiddenButton,
    SwipedTodoText,
    TodoText,
    TodoDate,
    colors
} from "../styles/appStyles";
import { SwipeListView } from "react-native-swipe-list-view";
import {Entypo} from "@expo/vector-icons";

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';



const ListItems = ({todos,setTodos,handleTriggerEdit}) =>{
    //şu anda kaydırılan todo satırını şekillendirmek için
    const [swipedRow, setSwipedRow]= useState(null);
    const handleDeleteTodo=(rowMap,rowKey)=>{
        const newTodos=[...todos];
        const todoIndex=todos.findIndex((todo)=> todo.key ===rowKey);
        newTodos.splice(todoIndex,1);
      
        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
        .then(() => {
            setTodos(newTodos);
          
        })
        .catch((error) => console.log(error));

    }
    return(
     <>  
      {todos.length == 0 && <TodoText>Bugün Neler Yapacaksın?</TodoText>}
        {todos.length != 0 && 
       <SwipeListView
       data={todos}
       renderItem={(data)=>{
           const RowText = data.item.key==swipedRow ? SwipedTodoText:TodoText;
           return(
               <ListView
               underlayColor={colors.primary}
               onPress={()=>{
                   handleTriggerEdit(data.item)

               }
            }
               >
                  
                   <>
                   <RowText>{data.item.title}</RowText>
                   <TodoDate>{data.item.date}</TodoDate>
                   </>

               </ListView>
           ) 
        }}
        renderHiddenItem={(data, rowMap)=>{
          return (
               <ListViewHidden>
                <HiddenButton
                onPress={()=>handleDeleteTodo(rowMap, data.item.key)}
                >

                <Entypo name ="trash"  size={25} color={colors.secondary}/>
                </HiddenButton>
            </ListViewHidden>)

        }
        }
        leftOpenValue={80}
        previewRowKey={"1"}
        previewOpenValue={80}
        previewOpenDelay={3800}
        disableLeftSwipe={true}
        showsVerticalScrollIndicator={false}
        style={
            {
                flex:1, paddingBottom:30, marginBottom: 40     
             }
        }
        onRowOpen={(rowKey)=>{
            setSwipedRow(rowKey);

        }}
        onRowClose={()=>{
            setSwipedRow(null);

        }}


       />}</>
    );
    }

export default ListItems;