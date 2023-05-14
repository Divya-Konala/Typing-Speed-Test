import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
    min-width:320px;
}
.words{
    display: flex;
    flex-wrap:wrap;
    gap:1rem;
    font-size:30px;
}
.hidden-input{
    opacity:0;
}
.current{
    border-left: 1px solid;
    animation: blink 2s ease infinite;
    @keyframes blink{
        0% {border-left-color: white;}
        25% {border-left-color: black;}
        50% {border-left-color: white;}
        75% {border-left-color: black;}
        100% {border-left-color: white;}
    }
}
.current-right{
    border-right: 1px solid;
    animation: blink-right 2s ease infinite;
    @keyframes blink-right{
        0% {border-right-color:white}
        25% {border-right-color:black}
        50% {border-right-color:white}
        75% {border-right-color:black}
        100% {border-right-color:white}
    }
}
.correct{
    color:green;
}
.incorrect{
    color:red;
}
.UpperMenu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0rem;
    font-size: 1.2rem;
}
.UpperMenu .counter-modes{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}
.counter-mode: hover{
    cursor: pointer;
}
`;
