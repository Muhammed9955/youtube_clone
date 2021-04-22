export const getChipColor = (status) => {
  switch (status) {
    case "created":
      return { background: "blue", color: "white" };
    case "processing":
      return { background: "yellow", color: "black" };
    case "delivered":
      return { background: "green", color: "white" };
    case "returned":
      return { background: "red", color: "white" };

    default:
      break;
  }
};

//checkbox
// const toggle = (prevState) => console.log({ prevState });
export const toggle = (prevState, setCheckedList, checkedList) => {
  console.log({ prevState });
  return setCheckedList({
    ...checkedList,
    [prevState.target.name]: !checkedList[prevState.target.name],
    // [prevState.target.name]: !prevState.target.checked,
  });
};
