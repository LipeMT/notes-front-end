import styled from "styled-components";
import backgroundImg from '../../assets/background.png';


export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`

export const Form = styled.form`
    padding: 40px 150px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > h1{
        font-size: 48px;

        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    > h2{
        font-size: 24px;
        margin-block: 48px;
    }

    > p{
        font-size: 14px;
        color: ${({theme}) => theme.COLORS.GRAY_100};
    }

    > a{
        margin-top: 124px;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }
`

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
    opacity: .5;
`