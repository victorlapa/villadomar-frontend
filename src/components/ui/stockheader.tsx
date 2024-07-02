import React from "react";
import { Button } from "./button";
import { UserIcon } from "..";

export type StockHeaderProps = {
  title: string;
  buttonLabel?: string;
  onClick?: () => void;
};

const StockHeader: React.FC<StockHeaderProps> = ({
  title,
  buttonLabel,
  onClick,
}) => {
  return (
    <header className="flex items-center mx-4 my-4">
      <label className="font-bold text-xl mr-10 text-black bg-darkest">
        {title}
      </label>
      {buttonLabel && 
        <Button onClick={onClick}>{buttonLabel}</Button>
      }
      <div className="flex-grow"></div>
      <UserIcon />
    </header>
  );
};

export default StockHeader;
