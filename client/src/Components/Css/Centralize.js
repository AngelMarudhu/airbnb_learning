import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const css = {
  Container: styled.div`
    max-width: 1328px;
    margin: auto;
    padding: 0;
    box-shadow: ${(props) =>
      props.login ? ' ' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'};
  `,
  Headers: styled.header`
    font-size: 30px;
    padding: 1rem;
    display: flex;
    justify-content: space-around;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
      svg {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        fill: darkgoldenrod;
      }
      span {
        font-size: 20px;
      }
    }
  `,
  SearchInput: styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    border: 1px solid;
    padding: 5px;
    border-radius: 50px;
    background-color: lightgray;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    div {
      font-size: 20px;
      font-weight: bold;
      margin: 5px;
    }
    button {
      padding: 5px;
      border: none;
      background-color: pink;
      border-radius: 10px;
      cursor: pointer;
      margin-right: 10px;
    }
    svg {
      width: 25px;
      height: 25px;
      color: red;
      & > :hover {
        fill: violet;
        stroke: violet;
        transition-duration: 0.5s;
      }
    }
  `,
  profile: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 20px;
      margin-right: 1rem;
      display: flex;
      justify-content: center;
      align-content: center;

      button {
        border: 1px solid goldenrod;
        background: none;
        padding: 5px;
        font-size: 15px;
        margin-left: 5px;
        border-radius: 20px;
        cursor: pointer;
      }
    }
    svg {
      width: 20px;
      height: 20px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid goldenrod;
      padding: 5px;
      border-radius: 20px;
      margin-left: 1rem;

      button {
        border: none;
        background: none;
      }

      svg:last-child {
        background-color: gray;
        padding: 5px;
        border-radius: 50px;
        margin-left: 10px;
      }
    }
  `,

  // ============================ LOGIN PAGE CSS ================================

  Login: styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: auto;
    border: 1px solid green;
    margin-top: 3rem;
    border-radius: 20px;

    button {
      width: 200px;
      padding: 5px;
      border-radius: 40px;
      border: 2px solid goldenrod;
      background-color: aliceblue;
      font-size: 20px;
      align-self: center;
      cursor: pointer;
    }

    h3 {
      text-align: center;
    }

    & > div:first-child {
      text-align: center;
    }

    & > div:last-child {
      display: flex;
      flex-direction: column;
      margin: 1rem;

      span {
        width: 100%;
        display: flex;
        margin-top: 1rem;
        justify-content: flex-end;

        a {
          text-decoration: none;
          margin-left: 8px;
          cursor: pointer;
          color: green;
        }
      }

      button {
        width: 200px;
        padding: 5px;
        border-radius: 40px;
        border: 2px solid goldenrod;
        background-color: aliceblue;
        font-size: 20px;
        align-self: center;
        cursor: pointer;
      }
    }
  `,
  InputUsername: styled.input`
    padding: 10px;
    border-radius: 50px;
    border: 2px solid goldenrod;
    font-size: 20px;
    margin-bottom: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -40px inset;

    &&::placeholder {
      font-size: 20px;
      text-align: center;
      transition: 0.5s;
    }

    &&:focus {
      outline: none;
    }
    &&:hover {
      &&::placeholder {
        font-size: 18px;
      }
    }
  `,

  InputEmail: styled.input`
    padding: 10px;
    border-radius: 50px;
    border: 2px solid goldenrod;
    font-size: 20px;
    margin-bottom: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -40px inset;

    &&::placeholder {
      font-size: 20px;
      text-align: center;
      transition: 0.5s;
    }

    &&:focus {
      outline: none;
    }
    &&:hover {
      &&::placeholder {
        font-size: 18px;
      }
    }
  `,

  InputPassword: styled.input`
    padding: 10px;
    border-radius: 50px;
    border: 2px solid goldenrod;
    font-size: 20px;
    margin-bottom: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -40px inset;

    &&::placeholder {
      font-size: 20px;
      text-align: center;
      transition: 0.5s;
    }

    &&:focus {
      outline: none;
    }
    &&:hover {
      &&::placeholder {
        font-size: 18px;
      }
    }
  `,

  // ============================ ACCOUNT PAGE CSS ================================
  Nav: styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    div {
      margin: 20px;
      background-color: gainsboro;
      padding: 10px;
      border-radius: 40px;
      transition-duration: 0.5s;

      :hover {
        background-color: pink;
      }
    }
  `,
  AccountProfile: styled.div`
    margin: auto;
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      button {
        width: 200px;
        margin: 0 auto;
        border: 1px solid goldenrod;
        padding: 10px;
        border-radius: 20px;
        margin-bottom: 1rem;
        background-color: ghostwhite;
        cursor: pointer;
        transition-duration: 0.5s;

        :hover {
          background-color: goldenrod;
          color: white;
          font-size: 15px;
        }
      }
    }
  `,

  Places: styled.div`
    form {
      display: flex;
      flex-direction: column;
    }
    p,
    h2 {
      margin: 0;
    }
  `,

  buttons: styled.button`
    border: 1px solid goldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    margin: auto;
    border-radius: 10px;

    svg {
      width: 28px;
      height: 28px;
      stroke: goldenrod;
    }
  `,

  cssForms: styled.div`
    width: 80%;
    margin: 1rem 0 0 1rem;

    form {
      input {
        margin: 10px 0 10px 0;
        padding: 10px;

        ::placeholder {
          font-size: 18px;
          color: goldenrod;
        }
      }
      textarea {
        margin: 10px 0 10px 0;
        height: 80px;

        ::placeholder {
          color: goldenrod;
          text-align: center;
          font-size: 20px;
        }
      }

      button {
        padding: 10px;
      }
      .photos_div {
        width: 100%;
        display: flex;
        align-items: center;
        button {
          width: 200px;
          border: 1px solid goldenrod;
          cursor: pointer;
          transition-duration: 0.5s;
          :hover {
            color: white;
            background: goldenrod;
          }
        }
        input {
          width: 100%;
        }
      }

      .checkboxPerks {
        display: flex;
        align-items: center;
        justify-content: center;

        label {
          border: 1px solid goldenrod;
          padding: 10px;
          border-radius: 10px;
          font-size: 20px;
          margin: 20px;

          span {
            margin-left: 10px;
          }
        }
      }
      button {
        border: 1px solid goldenrod;
        background: none;
        font-size: 20px;
        cursor: pointer;
        transition-duration: 500ms;
        :hover {
          background: goldenrod;
          color: white;
        }
      }
    }
    .image_upload_link {
      width: 200px;
      height: 150px;
      border-radius: 20px;
      background-position: center;
      background-repeat: repeat;
      background-size: contain;
    }
  `,

  yourPerks: styled.div``,

  yourPerksChildren: styled.div`
    margin-top: 1rem;
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;

    ul {
      position: relative;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      li {
        list-style: none;
        margin: 10px;
        border: 1px solid goldenrod;
        padding: 5px;
        border-radius: 10px;
      }
    }

    .yourPerksGrandChildren {
      width: 300px;
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 30px;
      border: 1px solid goldenrod;
      box-shadow: 12px 14px 13px -7px rgba(140, 140, 140, 1);
      position: relative;
      cursor: pointer;
      transition-duration: 500ms;

      :hover {
        background-color: #e5e5e5;
      }

      .yourPerksImageTitle {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        img {
          width: 200px;
          height: 200px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 30px;
          box-shadow: 12px 14px 13px -7px rgba(140, 140, 140, 1);
        }
      }
    }

    .yourPerksDescription {
      display: flex;
      flex-direction: column;
      align-items: center;

      h3 {
        width: 100%;
        text-align: center;
        position: relative;
        cursor: default;

        &::before {
          position: absolute;
          content: 'description';
          opacity: 0;
          top: -1.5em;
          left: 50%;
          text-transform: uppercase;
          color: goldenrod;
          transform: translateX(-50%);
          transition: opacity 0.2s ease-in-out;
        }

        &:hover::before {
          opacity: 1;
          text-align: center;
        }
      }
    }
  `,

  Home: styled.div`
    width: 100%;
    margin: auto;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    article {
      margin: 20px;
      width: 400px;
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border: 1px solid goldenrod;
      border-radius: 20px;
      box-shadow: 12px 14px 13px -7px rgba(140, 140, 140, 1);
      transition-duration: 500ms;
      :hover {
        background-color: #e5e5e5;
      }
    }

    .homeImage {
      position: relative;
      display: inline-block;
      img {
        display: block;
        width: 300px;
        height: 300px;
        height: auto;
        margin-top: 10px;
        border-radius: 20px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 12px 14px 13px -7px rgba(140, 140, 140, 1);
      }
    }
  `,
  //  ========================= HOME ===========================
  PlacesPage: styled.div`
    max-width: 1128px;
    margin-top: auto;

    article {
      border: 2px solid goldenrod;
      .homeItems {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
        margin-left: 1rem;
      }

      .homeLetters {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: space-between;
        text-align: left;
      }

      .extraInfo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;

        h3,
        h2,
        p {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        svg {
          width: 30px;
          display: flex;
          margin-right: 10px;
        }
      }

      .homeImage {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 3rem;
        flex-wrap: wrap;
        object-fit: cover;
        gap: 10px;
        flex: 1;

        img {
          width: 50%;
          border-radius: 40px;
          margin-bottom: 1rem;
          margin-top: 1rem;
        }
      }
    }
  `,
};

export default css;
