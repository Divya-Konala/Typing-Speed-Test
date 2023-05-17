import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
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
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
}
.logo{
    display: flex;
    align-items: center;
    gap:2rem;
    font-size: 2rem;
}
.MuiTabs-indicator{
    background-color: ${({theme})=>theme.color}
}
.MuiFormLabel-root{
    color: ${({theme})=>theme.color}
}
fieldset, fieldset legend, legend span{
    border-color: ${({theme})=>theme.color}!important;
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
    color: ${({ theme }) => theme.textBoxColor};
}
.hidden-input{
    opacity:0;
}
.current{
    border-left: 1px solid;
    animation: blink 2s ease infinite;
    @keyframes blink{
        0% {border-left-color: ${({ theme }) => theme.background}}
        25% {border-left-color: ${({ theme }) => theme.color}}
        50% {border-left-color: ${({ theme }) => theme.background}}
        75% {border-left-color: ${({ theme }) => theme.color}}
        100% {border-left-color: ${({ theme }) => theme.background}}
    }
}
.current-right{
    border-right: 1px solid;
    animation: blink-right 2s ease infinite;
    @keyframes blink-right{
        0% {border-left-color: ${({ theme }) => theme.background}}
        25% {border-left-color: ${({ theme }) => theme.color}}
        50% {border-left-color: ${({ theme }) => theme.background}}
        75% {border-left-color: ${({ theme }) => theme.color}}
        100% {border-left-color: ${({ theme }) => theme.background}}
    }
}
.correct{
    color:${({ theme }) => theme.color};
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
.footer{
    display: flex;
    justify-content: space-between;
    width: 1000px;
}
.select-theme{
    display: flex;
    align-items: center;
    gap: 1rem;
}
.css-1dimb5e-singleValue{
    color: ${({theme})=>theme.color};
    width: 200px;
}
.css-1xc3v61-indicatorContainer{
    color: ${({theme})=>theme.color};
}
.footer .links{
    display: flex;
    gap:1.5rem;
}
.footer .links a{
    color: ${({theme})=>theme.textBoxColor}
}
.Stats{
    width: 1000px;
    display: flex;
    align-items: center;
}
.left-stats{
    width: 30%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap:0.4rem;
}
.left-stats .title{
    font-size: 1.2rem;
    color: ${({theme})=>theme.textBoxColor};
    font-weight: 600;
}
.left-stats .sub-title{
    font-size: 1.8rem;
    color: ${({theme})=>theme.color}
}
.right-stats{
    width: 70%;
    padding: 0.5rem;
}
`;
