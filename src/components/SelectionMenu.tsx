import { Card } from "./ui/card";

interface Props {
  items: {
    title: string;
    onClick: () => void;
  }[];
}

export const SelectionMenu: React.FC<Props> = ({ items }) => {
  return (
    <div className="w-full max-w-md space-y-6">
      {items.map((item) => (
        <Card
          key={item.title}
          className="cursor-pointer p-6 shadow-md transition-shadow hover:shadow-lg"
          onClick={item.onClick}
        >
          <h2 className="font-normal text-xl">{item.title}</h2>
        </Card>
      ))}
    </div>
  );
};
