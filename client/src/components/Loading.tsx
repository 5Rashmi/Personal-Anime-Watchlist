import styled from "styled-components";

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* mini loader component */
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.75em; /* 60px */
  }

  .loader-dot {
    height: 0.8125em; /* 13px */
    width: 1.25em; /* 20px */
    margin-right: 0.625em; /* 10px */
    border-radius: 0.625em; /* 10px */
    background-color: #319795;
    animation: loaderpulse 1.5s infinite ease-in-out;
  }

  .loader-dot:last-child {
    margin-right: 0;
  }

  .loader-dot:nth-child(1) {
    animation-delay: -0.1875s; /* -0.3s */
  }

  .loader-dot:nth-child(2) {
    animation-delay: -0.0625s; /* -0.1s */
  }

  .loader-dot:nth-child(3) {
    animation-delay: 0.0625s; /* 0.1s */
  }

  @keyframes loaderpulse {
    0% {
      transform: scale(0.8);
      background-color: #b2f5ea;
      box-shadow: 0 0 0 0 rgb(196 178 252 / 70%);
    }

    50% {
      transform: scale(1.2);
      background-color: #2c7a7b;
      box-shadow: 0 0 0 0.625em rgba(178, 212, 252, 0); /* 10px */
    }

    100% {
      transform: scale(0.8);
      background-color: #b2f5ea;
      box-shadow: 0 0 0 0 rgb(196 178 252 / 70%);
    }
  }
  /* mini loader component end */
`;

export default Loading;
