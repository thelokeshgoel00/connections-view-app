import peopleUpdatingReducer from './peopleUpdatingReducer'
import relationshipsUpdatingReducer from './relationshipsUpdatingReducer'
import {combineReducers} from 'redux'
const allReducers = combineReducers({
    people: peopleUpdatingReducer,
    relations: relationshipsUpdatingReducer
})
export default allReducers