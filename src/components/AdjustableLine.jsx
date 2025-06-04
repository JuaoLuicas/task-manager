function AdjustableLine(props) {
  return (
    <div
      className={`rounded-lg bg-${props.bg}`}
      style={{
        marginLeft: props.margin,
        marginRight: props.margin,
        width: `calc(100% - (${props.margin} * 2))`,
        height: props.h
      }}
    ></div>
  );
}

export default AdjustableLine;