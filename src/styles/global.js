import {createGlobalStyle} from "styled-components"

export const GlobalStyles=createGlobalStyle`
body{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: black;
    color: white;
    transform: all 0.2s linear;
}
.App{
    display: grid;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    height: 100vh;
    width: 100vw;
    justify-content:center;
    align-items: center;
    text-align: center;
}
.typingBox{
    max-width:1000px;
}
.words{
    display: flex;
    flex-wrap:wrap;
    gap:1rem;
    font-size:25px;
}
.hidden-input{
    opacity:0;
}
`

