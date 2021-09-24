import React from 'react';

//styled components
import{
    HeaderView,
    HeaderTitle,
    HeaderButton,
    colors
} from "./../styles/appStyles";

//Icons
import {Entypo} from "@expo/vector-icons";


const Header = ({handleClearTodos}) =>{
    return(
        <HeaderView>
            <HeaderTitle> TaskManager </HeaderTitle>
            <HeaderButton
                onPress={handleClearTodos}
            >
            <Entypo name= "trash" size={25} colors={colors.tertiary}/>

            </HeaderButton>
        </HeaderView>
    );
}

export default Header;