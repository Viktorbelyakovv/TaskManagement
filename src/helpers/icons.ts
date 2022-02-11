import { ReactComponent as Family } from "../assets/img/Family.svg";
import { ReactComponent as Food } from "../assets/img/Food.svg";
import { ReactComponent as Shopping } from "../assets/img/Shopping.svg";
import { ReactComponent as Sport } from "../assets/img/Sport.svg";
import { ReactComponent as Work } from "../assets/img/Work.svg";

type Icon = {
  id: number;
  Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const icons: Icon[] = [
  {
    id: 1,
    Component: Family,
  },
  {
    id: 2,
    Component: Food,
  },
  {
    id: 3,
    Component: Shopping,
  },
  {
    id: 4,
    Component: Sport,
  },
  {
    id: 5,
    Component: Work,
  },
];
