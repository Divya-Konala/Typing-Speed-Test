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
.canvas{
    display: grid;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    height: 100vh;
    width: 100vw;
    justify-content:center;
    align-items: center;
    text-align: center;
}
.user-canvas{
    display: grid;
    grid-template-row: auto 1fr auto;
    gap: 2rem;
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
.account-icons{
    display: flex;
    align-items: center;
    justify-conter: center;
    gap: 1rem;
}
.MuiTabs-indicator{
    background-color: ${({theme})=>theme.textBoxColor}
}
fieldset{
    border-color: ${({theme})=>theme.textBoxColor}!important;
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
.userTable, .user-graph{
    width: 1000px;
}
.graph{
    width: 100%;
}
.user{
    width: 1000px;
    box-sizing: border-box;
    background-color: ${({theme})=>theme.background};
    margin-top: 2rem;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    border: 1px solid ${({theme})=>theme.textBoxColor};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.user-info{
    width:60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-right: 2px solid;
    font-size: 1rem;
}
.user-info b{
    font-weight: 600;
}
.user-details{
    text-align: left;
}
.test-details{
    width:40%;
    font-size: 1.5rem;
}
.user-img{
    border-radius: 50%;
    scale: 120%;
}
.centerOfPage{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;
