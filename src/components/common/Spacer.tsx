interface Props {
  size: number;
}

const Spacer = ({ size }: Props) => {
  return <div style={{ height: `${size}px` }} aria-hidden />;
};

export default Spacer;
