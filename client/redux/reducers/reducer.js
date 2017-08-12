import config from '../../config';
/////////////////CONSTANTS/////////////////////

/////////////////ACTIONS//////////////


/////////////////REDUCER/////////////////////

//initiate your starting state
let initial = {

};

const reducer = (state = initial, action) => {

  switch (action.type) {
    default:
      return state;
  }

};

export default reducer;


/////////////// ACTION DISPATCHER FUNCTIONS///////////////////

const formatSlug = (title) => {
  return title.toLowerCase().split(" ").join("-");
};
