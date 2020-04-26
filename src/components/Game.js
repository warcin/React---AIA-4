import React, {Component} from 'react';

const imageStyle = {
    "height": "400px",
    "width": "400px"
}

class Game extends Component{
    constructor(){
        super()
        this.state = {
            id: "",
            title: "",
            image: "",
            description: "",
            rating: ""
        }        
        this.handleChange = this.handleChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }
    componentDidMount(){
        this.setState({
            id: this.props.id,
            title: this.props.title,
            image: this.props.image,
            description: this.props.description,
            rating: this.props.rating,
            isEdit: false
        })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }   
    handleEdit(){
        this.setState({
            isEdit: !this.state.isEdit
        })
        console.log(this.state.isEdit)
    }
    render(){
        const rating = this.state.rating === 0 ? "Oceń" : this.state.rating

        return(
            this.state.isEdit ?
            <div class="single-game">
                <div class="image">
                    <img src={this.state.image} style={imageStyle}/>
                </div>
                <div class="description">
                    <div class="element-input">
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <input type="text" name="image" placeholder="Wpisz nowy URL obrazka" onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <div>Rating: </div>{rating}
                    </div>
                    <div class="element-input">
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
                    <div class="element-input">
                        <button onClick={() => {this.props.update(this.state); this.handleEdit()}}>Save</button>
                    </div>
                </div>
            </div> 
			
            :
			
            <div class="single-game">
                <div class="title"><h2>{this.state.title}</h2></div>
                <div class="image">
                    <img src={this.state.image} style={imageStyle}/>
                </div>
                <div class="description">
                    <div class="element-text">
                        <div>Opis: </div> {this.state.description}
                    </div>
                    <div class="element-text">
                        <div>Ocena: </div> {rating}
                    </div>
                    <div class="element-text">
                        <select disabled
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
                    <div class="element-text">
                        <button onClick={this.handleEdit}>Edytuj</button>
                        <button onClick={() => this.props.onDelete(this.props.id)}>Usuń</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game