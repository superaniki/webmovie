type DropDownListItemProps = {
  index: number;
  title: string;
  onClick: (e: React.MouseEvent, index: number) => void;
  onHover: (index: number) => void;
  selected: boolean;
};

function DropDownListItem({ index, title, onClick, onHover, selected }: DropDownListItemProps) {
  const handleOnHover = () => onHover(index);
  const handleOnClick = (e: React.MouseEvent) => onClick(e, index);

  return (
    <li
      onClick={handleOnClick}
      onMouseEnter={handleOnHover}
      className={`inline-block rounded-md p-1 select-none float-left ${selected && 'bg-slate-200'}
			 w-full text-left text-ellipsis whitespace-nowrap [content-visibility:auto]`}
    >
      {title}
    </li>
  );
}

export { DropDownListItem }
