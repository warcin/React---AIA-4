import React, { Component } from 'react'
import initialData from '../initialData.json'
import Game from './Game'
import AddGame from './AddGame'
import './Games.css'

class Games extends Component{
    constructor(){
        super()
        this.state = {
            games: initialData,
            search: "",
            display: initialData,
            nameAsc: false,
            ratingAsc: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSortByName = this.handleSortByName.bind(this)
        this.handleSortByRating = this.handleSortByRating.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.addGame = this.addGame.bind(this)
    }
    handleDelete(id){
        const filtered = this.state.games.filter(item => item.id !== id)
        this.setState({
            games: filtered,
            display: filtered
        })
    }
    handleSearch(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        const display =  this.state.games.filter(el =>{
            const searchValue = el.name.toLowerCase();
            return searchValue.indexOf(value.toLowerCase()) !== -1
        })
        this.setState({
            display: display
        })
    }
    handleSortByName(){
        if(!this.state.nameAsc){
            function compare(a, b){
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            }
            const sortedData = this.state.display.sort(compare)
            this.setState({
                display: sortedData,
                nameAsc: !this.state.nameAsc
            })
        }else{
            function compare(a, b){
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            }
            const sortedData = this.state.display.sort(compare)
            this.setState({
                display: sortedData,
                nameAsc: !this.state.nameAsc
            })
        }
        
    }
    handleSortByRating(){
        if(!this.state.ratingAsc){
            const sortedData = this.state.display.sort((a,b) => a.rating - b.rating)
            this.setState({
                display: sortedData,
                ratingAsc: !this.state.ratingAsc
            })
        }else{
            const sortedData = this.state.display.sort((a,b) => b.rating - a.rating)
            this.setState({
                display: sortedData,
                ratingAsc: !this.state.ratingAsc
            })
        }
    }
    handleUpdate(element){
        const updated = this.state.display.filter(item =>{
            if(item.id === element.id){
                item.name = element.title
                item.image = element.image
                item.rating = element.rating
                item.description = element.description
            }
            return item
        })
        console.log(updated);
        this.setState({
            games: updated,
            display: updated
        })
    }
    addGame(title, description, image, rating){
        const gameList = this.state.games
        var maxId = 0
        for(let i = 0; i < gameList.length; i++){
            if(maxId < gameList[i].id){
                maxId = gameList[i].id
            }
        }
        var newGame = {}
        newGame["id"] = maxId + 1
        newGame["name"] = title
        newGame["description"] = description
        newGame["image"] = image
        newGame["rating"] = rating

        const displayList = this.state.display
        displayList.push(newGame)  
        this.setState({
            games: displayList,
            display: displayList
        })
        console.log(this.state.display)
        
    }
    render() {
        const data = this.state.display.map(item => <Game 
            key={item.id} 
            id={item.id}
            title={item.name}
            description={item.description}
            image={item.image}
            rating={item.rating}
            onDelete={this.handleDelete}
            update={this.handleUpdate}/>)
        return(
            <div class="main">
                <div class="nav">
                    <div class="buttons">
                        <button onClick={this.handleSortByName}>Sortuj nazwą</button>
                        <button onClick={this.handleSortByRating}>Sortuj oceną</button>      
                        <input id="search" type="text" name="search" value={this.search} placeholder="Szukaj nazwą" onChange={this.handleSearch}/>
                        <AddGame add={this.addGame}/>
                    </div>
                </div>
                <div class="data">
                    {data}
                </div>
            </div>
            
        )
    }
}

export default Games;