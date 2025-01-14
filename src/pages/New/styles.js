import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
    "header"
    "content";

      
    > main{
        grid-area: content;
        overflow-y: auto;
    }
`

export const Form = styled.div`
    max-width: 550px;
    margin: 38px auto;

    > header{
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 36px;
    
        a {
            font-size: 20px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
        }
    }


    .tags {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
`