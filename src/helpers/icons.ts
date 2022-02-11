import { ReactComponent as Family } from "../assets/img/Family.svg";
import { ReactComponent as Food } from "../assets/img/Food.svg";
import { ReactComponent as Shopping } from "../assets/img/Shopping.svg";
import { ReactComponent as Sport } from "../assets/img/Sport.svg";
import { ReactComponent as Work } from "../assets/img/Work.svg";

type Icon = {
  id: number;
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const icons: Icon[] = [
  {
    id: 1,
    component: Family,
  },
  {
    id: 2,
    component: Food,
  },
  {
    id: 3,
    component: Shopping,
  },
  {
    id: 4,
    component: Sport,
  },
  {
    id: 5,
    component: Work,
  },
];
