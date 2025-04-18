import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    a { 
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter .2s;
    }

    button:hover, a:hover {
        filter: opacity(0.7);
    }

    body, button, input, textarea{
        font-family: "Roboto Slab", serif;
        font-size: 16px
    }

    input, textarea {
        outline: none;
    }

    img{
        object-fit: cover;
    }
`