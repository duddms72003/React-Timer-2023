import styled from "styled-components";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";

interface TimerProps {
  mm: number;
  ss: number;
}

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 300px;
  margin-bottom: 100px;
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

const Circle = styled(motion.button)`
  width: 180px;
  height: 180px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  background-color: #b0a3a370;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
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
              key={minutes}
              variants={boxVariants}
              initial="invisible"
              animate="visible"
              exit="exit"
            >
              {minutes.toString().padStart(2, "0")}
            </Box>
          </motion.div>
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
        {clicked ? "stop" : "play"}
      </Circle>
    </div>
  );
};

export default Timer;
