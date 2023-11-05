import "./styles.css";

const Dial = (props) => {
  const { selectedFloor = [], onFloorSelect, value } = props;
  const isSelected = selectedFloor.indexOf(value) !== -1;
  const onDialClick = () => {
    onFloorSelect(value);
  };
  return (
    <div onClick={onDialClick} className={`dial ${isSelected ? "active" : ""}`}>
      {value}
    </div>
  );
};

export default Dial;
