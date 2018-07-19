import React from "react";
import Header from "./Header";
import Action from "./Action";
import AddOption from "./AddOption";
import Options from "./Options";

export default class IndecisionApp extends React.Component {
    state = {
        options: []
    };

    handleDeleteOptions = () => {
        // this.setState(()=> {
        //     return {
        //         options: []
        //     };
        // });

        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption = (option) => {
        //Validation
        if(!option){
            return "Enter valid value to add item"
        } else if(this.state.options.indexOf(option) > -1){
            return "This option already exists";
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    //Lifecycles
    componentDidMount(){
        try{
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);

            if(options){
                this.setState(() => ({ options }));
            }
        } catch(error) {
            //Do nothing
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }

    }

    render(){
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header 
                    subtitle={subtitle}
                />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    options={this.state.options}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}
Header.defaultProps = {
    title: "Indecision"
}