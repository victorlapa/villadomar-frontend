interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  return <div className="w-screen h-screen flex bg-gray-300">{children}</div>;
};

export default Page;
