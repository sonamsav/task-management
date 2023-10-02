import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { addTask, updateTask } from "../slices/taskSlice";
import styles from "../styles/modules/modal.module.scss";
import HeaderButton from "./HeaderButton";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const AddTaskForm = ({ type, modalOpen, setModalOpen, task }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (type === "update" && task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "active",
      });
    }
  }, [type, task, modalOpen]);

  const handleInputChange = (e) => {
    // It will Update the form data when input values change
    const { name, value } = e.target;
    // console.log(`Input name: ${name}, Input value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });

    // It will Clear the validation error for the current input
    setValidationErrors({
      ...validationErrors,
      [name]: undefined,
    });
  };
  // console.log(validationErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Created an object to store validation errors
    const errors = {};

    // form validation
    if (formData.title.trim() === "") {
      errors.title = "Title is required";
    }

    // Check if the description is empty and store an error message if it is then
    if (formData.description.trim() === "") {
      errors.description = "Description is required";
    }

    // Checks if there are any validation errors
    if (Object.keys(errors).length > 0) {
      // If there are errors, it will set the validationErrors state and do not submit the form
      setValidationErrors(errors);
      return;
    }

    if (type === "add") {
      // It will Add a new task with a unique ID and the form data
      dispatch(
        addTask({
          id: uuid(),
          ...formData,
          time: new Date().toLocaleString(),
        })
      );
      toast.success("Task added successfully");
    } else if (type === "update") {
      // It will Update the existing task with the updated form data
      const updatedTask = { ...task, ...formData };
      if (
        task.title !== formData.title ||
        task.status !== formData.status ||
        task.description !== formData.description
      ) {
        dispatch(updateTask(updatedTask));
        toast.success("Task Updated successfully");
      } else {
        toast.error("No changes made");
        return;
      }
    }
    setModalOpen(false);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} TASK
              </h1>
              <label htmlFor="title">
                <input
                  placeholder="Title"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />

                {validationErrors.title && (
                  <span className={styles.error}>{validationErrors.title}</span>
                )}
              </label>
              <label htmlFor="description">
                <input
                  placeholder="Description"
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {validationErrors.description && (
                  <span className={styles.error}>
                    {validationErrors.description}
                  </span>
                )}
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <HeaderButton type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </HeaderButton>
                <HeaderButton
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </HeaderButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskForm;
