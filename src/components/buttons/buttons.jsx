import "./styles.css";

const buttons = (props) => {
  const btnClick = () => {
    props.onFloorSelect(props.floor, props.label);
  };

  return (
    <button className="fluidButton active" onClick={btnClick}>
      {props.label}
    </button>
  );
};

export default buttons;
