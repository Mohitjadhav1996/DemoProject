import styled from "styled-components";

export const ContainerWrapper = styled.div`
  & {
    max-width: 1500px;
    padding:15px;
    background-color:#dfe3f2;
    .title{
        display:flex;
        justify-content:space-between;
        max-height:80px;
        background-color:#7f9bf5;
        padding:5px 10px 5px 10px;

    }
    .search-class{
        display:flex;
        justify-content:flex-end;
        gap:10px;
        margin:80px 0px 10px 0; 
    }
  }
  `;
export const BroadcastLogTable = styled.div`
  & {
    .container {
        max-width: 1500px;
        min-height:500px;
        margin: 0 auto; 
        box-sizing: border-box; 
    }
    .table {
        width: 100%;
        min-width:100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        border:1px solid #f2f2f2;
    }

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    td .button{
        display:flex;
        gap:10px;
    }
    .table-head {
        background-color: #c0c1c4;
    }

    /* Responsive styles */
    @media (max-width: 600px) {
        th, td {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
        
        th, td {
            text-align: center;
        }
    }
  }
  `;
  export const ErrorComponent = styled.div`
  && {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      min-height: calc(100vh - 350px);
      overflow: auto;
      img {
          max-width: 100%;
          height: auto;
      }
      .error-container {
          width: 100 %;
          height: 100 %;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .err-content {
          gap: 1rem;
          display: flex;
          align-items: center;
          flex-direction: column;
      }
    }
`;

export const FormWrapper = styled.div`
&& {
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

form {
    display: grid;
    gap: 10px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .container {
        max-width: 100%;
        padding: 10px;
    }
}
}
`;
