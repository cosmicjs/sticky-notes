import styled from 'styled-components';

export const NoteListWrapper = styled.ul`
  body{
    margin-top:20px;
  }
`;


export const NoteWrapper = styled.li`
  margin: 40px;
  float: left;
  list-style: none;
`;


export const Note = styled.div`
  text-decoration: none;
  display: block;
  height: 210px;
  width: 210px;
  padding: 1em;
  -moz-box-shadow: 5px 5px 7px #212121;
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  -moz-transition: -moz-transform 0.15s linear;
  -o-transition: -o-transform 0.15s linear;
  -webkit-transition: -webkit-transform 0.15s linear;


  background-color: ${props => props.backgroundColor};
  color: ${props => props.color|| '#000'};

  -o-transform: rotate(${props => props.rotate}deg);
  -webkit-transform: rotate(${props => props.rotate}deg);
  -moz-transform: rotate(${props => props.rotate}deg);

  a, h4 {
    cursor: pointer;
  }
  a {
    color: white;
  }
  small {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 10px;
  }
  .buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;
