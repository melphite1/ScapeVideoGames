import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import Category from "../components/Category";
import auxActions from '../redux/actions/auxActions'
import gamesActions from '../redux/actions/gamesActions'



const Categories = (props) => {

  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [favConsole, setFavConsole] = useState('')



  useEffect(() => {
    getCategories()
    setCategories([...props.categories])
    setFilteredCategories([...props.categories])
  }, [props.categories])

  const getCategories = async () => {
    await props.getCategories()
  }

  const stateModificator = specificCategory => {
    setCategory(specificCategory)
  }
  
  const consoles = [
    'Not defined yet',
    'Pc',
    'PlayStation, Sony',
    'PlayStation2, Sony',
    'PlayStation3, Sony',
    'PlayStation4, Sony',
    'PSP, Sony',
    'GameBoy, Nintendo',
    'GameBoyColor, Nintendo',
    'GameBoyAdvance, Nintendo',
    'Nintendo, Nintendo',
    'Nintendo64, Nintendo',
    'Nintendo3DS, Nintendo',
    'NintendoSwitch, Nintendo',
    'NintendoDS, Nintendo',
    'SuperNintendo, Nintendo',
    'GameCube, Nintendo',
    'NintendoSwitch, Nintendo',
    'Wii, Nintendo',
    'Xbox360, Microsoft',
    'XboxOne, Microsoft',
    'Xbox, Microsoft',
    'SegaGameGear, Sega',
    'Dreamcast, Sega',
    'Atari2600, Atari',
    'Atari5200, Atari'
  ]

  const readInput = e => {
    const value = e.target.value
    setFavConsole(
      value
    )
  }

  const captureValue = (e) => {
    const valueCategory = e.target.value
    setFilteredCategories({
      filteredCategories: categories.filter(
        (category) => valueCategory
      )
    });
  };

  const sendConsole = () => {
    props.sendConsole(favConsole, props.username)
  }

  const categoryNotFound = require("../images/404notFound.png");

  const filteredSameZero = () => {
    if (filteredCategories.length === 0) {
      return (
        <div
          id="categoryNotFound"
          style={{
            backgroundImage: `url(${categoryNotFound})`,
          }}
        >
          <p id='notFoundText'
            style={{
              fontSize: "3vh",
              fontWeight: "bold",
              color: "whitesmoke",
              backgroundColor: "#32a08859",
              textShadow: "2px 2px 2px black",
              padding: "1vh 0vw",
              textAlign: 'center',
            }}
          >
            Categoy not found.. Try Again!
              </p>
        </div>
      )
    };
  };

  
  return (
    <>
      <Header />
      <h1 className="text-center text-light">Games</h1>
      {
        props.firstTime && props.token ?
          <>
            <select name='favConsole' id='favConsole' onChange={readInput} className="text-center col-6">
              <option value={-1} className="text-center">Choose your favourite console.</option>
              {
                consoles.map((console, i) => {
                  return <option key={'console' + [i]} value={console} className="text-center">{console}</option>
                })
              }
            </select>
            <button htmlFor='favConsole' onClick={sendConsole} className="text-center col-6">Send your favorite console</button>
          </>
          : ''
      }
      <div id="mainCategories">
      {/* <select name='favConsole' id='favConsole' onChange={readInput} className="text-center col-6">
              <option value={-1} className="text-center">Choose your favourite console.</option>
              {
                consoles.map((console, i) => {
                  return <option key={'console' + [i]} value={console} className="text-center">{console}</option>
                })
              }
      </select> */}
      <select name='categoriesFilter' onChange={captureValue}>
          <option value={-1}>
            Select a category
          </option>
          {
            props.categories.map((category, i) => {
              return <option key={'category' + [i]} value={category.name}>
                {category.name}
              </option>
            })
          }

      </select>
        
              <ul className="Container">
          {filteredSameZero()}
          {filteredCategories.map((category) => {
            return <>
              <NavLink to={`/games/${category._id}`}>
                <Category category={category} />
              </NavLink>
            </>
          })}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.usersReducer.username,
    firstTime: state.usersReducer.firstTime,
    token: state.usersReducer.token,
    categories: state.gamesReducer.categories
  }
}

const mapDispatchToProps = {
  sendConsole: auxActions.sendConsole,
  getCategories: gamesActions.getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
