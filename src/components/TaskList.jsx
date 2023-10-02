import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/modules/app.module.scss";
import TaskItem from "./TaskItem";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TaskList = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const filterStatus = useSelector((state) => state.task.filterStatus);

  const sortedTaskList = [...taskList]
    .filter((item) => item && item.time)
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTaskList = sortedTaskList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item && item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTaskList && filteredTaskList.length > 0 ? (
          filteredTaskList.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Tasks Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
