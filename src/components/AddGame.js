import React, {Component} from 'react'
import './AddGame.css'

const imageStyle = {
    "height": "400px",
    "width": "400px"
}
const background = {
    "background-color": "Cyan"
}

class AddGame extends Component{
    constructor(){
        super()
        this.state = {    
            id: 0,
            name: "",
            description: "",
            image: "",
            rating: 0,
            addElement: false
        }
        this.showAddGame = this.showAddGame.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    showAddGame(){
        this.setState({
            name: "",
            description: "",
            image: "",
            rating: 0,
            addElement: !this.state.addElement
        })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }  
    render(){
        const rating = this.state.rating === 0 ? "Oceń" : this.state.rating
        return(
            this.state.addElement ? 
            <div class="add-new-game">
                <div class="content">
                    <div class="element">
                        <div>Tytuł</div>
                        <input placeholder="Tytuł" name="name" onChange={this.handleChange}/>
                    </div>
                    <div class="element">
                        <div>Opis</div>
                        <input placeholder="Opis" name="description" onChange={this.handleChange}/>
                    </div>
                    <div class="element">
                        <div>Obrazek</div>
                        <input placeholder="URL Obrazka" name="image" onChange={this.handleChange}/>
                    </div>
                    <div class="element">
                        <div>Ocena</div>
                        <select 
                            value={rating}
                            onChange={this.handleChange}
                            name="rating">
                            <option value="Oceń">Oceń</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
							<option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    {this.state.name !== "" && this.state.image !== "" && this.state.description !== "" ?
                    <button onClick={() => {this.props.add(this.state.name, this.state.description, this.state.image, this.state.rating); this.showAddGame()}}>Add</button>
                    :
                    <button disabled style={background}>Dodaj</button>
                    }

                </div>
                <img src={this.state.image} style={imageStyle}/>
            </div>
            :
            <button onClick={this.showAddGame}>Dodaj grę</button>
        )
    }
}

export default AddGame