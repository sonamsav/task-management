import { format } from "date-fns";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../slices/taskSlice";
import { getClasses } from "../utils/getClasses";
import CheckBoxButton from "./CheckBoxButton";
import AddTaskForm from "./AddTaskForm";
import styles from "../styles/modules/item.module.scss";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TaskItem({ task, index }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (task.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [task.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTask({ ...task, status: checked ? "active" : "complete" }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child} key={index}>
        <div className={styles.taskDetails}>
          <CheckBoxButton
            checked={checked}
            handleCheck={handleCheck}
            key={index}
          />

          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.taskText,
                task.status === "complete" && styles["taskText--completed"],
              ])}
            >
              <span className={styles.title}> {task.title} </span>
            </p>

            <p
              className={getClasses([
                styles.taskText,
                task.status === "complete" && styles["taskText--completed"],
              ])}
            >
              {/* <span> Description: </span> */}
              {task.description}
            </p>
            <p className={styles.time}>
              {format(new Date(task.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.taskActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <AddTaskForm
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        task={task}
      />
    </>
  );
}

export default TaskItem;
