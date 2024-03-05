import styled from "styled-components";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";

interface TimerProps {
  mm: number;
  ss: number;
}

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 300px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90px;
  font-weight: bold;
  color: #e84c3f;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Colon = styled.div`
  color: white;
  font-size: 180px;
  margin: 0 20px;
`;

const Circle = styled(motion.button)`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  background-color: #b0a3a345;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  svg {
    width: 100px;
  }
`;

const Timer: React.FC<TimerProps> = ({ mm, ss }) => {
  const [clicked, setClicked] = useState(false);
  const [minutes, setMinutes] = useState(mm);
  const [seconds, setSeconds] = useState(ss);
  const [visible, setVisible] = useState(1);
  let timerId: any = null;

  //   const toggleClicked = () => setClicked((prev) => !prev);

  //   const toggleClicked = () => { ===> 안되는 코드
  //     setClicked((prev) => {
  //       if (!prev) {
  //         clearInterval(timerId);
  //       } else {
  //         startTimer();
  //       }
  //       return !prev;
  //     });
  //   };

  const toggleClicked = () => {
    if (!clicked) {
      // 타이머가 이미 실행 중인 경우에는 중복 생성을 방지합니다. ====> 되는 코드
      if (!timerId) {
        startTimer();
      }
    } else {
      clearInterval(timerId);
    }
    setClicked((prev) => !prev);
  };

  const startTimer = () => {
    timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        //
        setVisible(1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerId);
          setClicked(false); // 타이머가 종료되면 자동으로 재생 상태를 해제합니다.
          // 타이머가 0초가 되었을 때, 다시 1분으로 설정
          setMinutes(1);
          setSeconds(0);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  };

  const boxVariants = {
    invisible: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  useEffect(() => {
    if (clicked) {
      startTimer();
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [minutes, seconds, clicked]);

  return (
    <div>
      <BoxContainer>
        <AnimatePresence>
          {/* <Box>{minutes.toString().padStart(2, "0")}</Box>
          <Box
            key={visible}
            variants={boxVariants}
            initial="invisible"
            animate="visible"
            exit="exit"
          >
            {seconds.toString().padStart(2, "0")}
          </Box> */}

          <motion.div>
            <Box
              key={visible}
              variants={boxVariants}
              initial="invisible"
              animate="visible"
              exit="exit"
            >
              {minutes.toString().padStart(2, "0")}
            </Box>
          </motion.div>
          <Colon>:</Colon>
          <motion.div>
            <Box
              key={seconds}
              variants={boxVariants}
              initial="invisible"
              animate="visible"
              exit="exit"
            >
              {seconds.toString().padStart(2, "0")}
            </Box>
          </motion.div>
        </AnimatePresence>
      </BoxContainer>
      <Circle whileHover={{ scale: 1.3 }} onClick={toggleClicked}>
        {clicked ? (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
          </svg>
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
          </svg>
        )}
      </Circle>
    </div>
  );
};

export default Timer;
