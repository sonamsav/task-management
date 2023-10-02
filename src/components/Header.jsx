import React, { useState } from "react";
import HeaderButton from "./HeaderButton";
import SelectButton from "./SelectButton";
import styles from "../styles/modules/app.module.scss";
import AddTaskForm from "./AddTaskForm";
import { updateFilterStatus } from "../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import FilterButton from "./FilterButton";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.task.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <HeaderButton variant="primary" onClick={() => setModalOpen(true)}>
        + Add New Task
      </HeaderButton>
      <FilterButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        {/* <option value="Active">Active</option> */}
        <option value="complete">Completed</option>
      </FilterButton>
      <AddTaskForm
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default Header;
