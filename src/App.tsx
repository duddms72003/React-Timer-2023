import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 100px 0;
`;

const H1 = styled.h1`
  text-align: center;
  width: 100%;
  margin-bottom: 80px;
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

function App() {
  const [mm, setMm] = useState(1); // 초기값 설정
  const [ss, setSs] = useState(0); // 초기값 설정

  // const toggleClicked = () => setClicked((prev) => !prev);

  // // 타이머 ID를 저장할 변수

  // // 타이머 시작 함수
  // const startTimer = () => {
  //   timerId = setInterval(() => {
  //     if (ss > 0) {
  //       setSs(ss - 1);
  //     } else if (mm > 0) {
  //       setMm(mm - 1);
  //       setSs(59);
  //     } else {
  //       // 타이머가 종료될 때 추가 작업을 수행할 수 있습니다.
  //       clearInterval(timerId);
  //       setClicked(false); // clicked를 false로 변경 (타이머 멈춤)
  //     }
  //   }, 1000);
  // };

  return (
    <Wrapper>
      <H1>Pomodoro</H1>
      <Timer mm={mm} ss={ss} />
    </Wrapper>
  );
}

export default App;
