import { GrMysql } from "react-icons/gr";
import {
  IoLogoCss3 as Css3Icon,
  IoLogoJavascript as JavascriptIcon,
  IoLogoFirebase as FirebaseIcon,
  IoLogoFigma as FigmaIcon,
} from "react-icons/io5";
import {
  FaHtml5 as HtmlIcon,
  FaReact as ReactIcon,
  FaGithub as GithubIcon,
} from "react-icons/fa";
import {
  SiTailwindcss as TailwindcssIcon,
  SiTypescript as TypescriptIcon,
  SiFlutter as FlutterIcon,
  SiVisualbasic as VisualbasicIcon,
  SiSupabase as SupabaseIcon,
  SiMongodb as MongodbIcon,
  SiNextdotjs as NextJsIcon,
} from "react-icons/si";

export const SkillsList: {
  name: string;
  color: string;
  icon: React.ComponentType;
}[] = [
  {
    name: "html",
    color: "#d98b73",
    icon: HtmlIcon,
  },
  {
    name: "css",
    color: "#87ceeb",
    icon: Css3Icon,
  },
  {
    name: "javascript",
    color: "#f2e8b0",
    icon: JavascriptIcon,
  },
  {
    name: "react",
    color: "#72a9d5",
    icon: ReactIcon,
  },
  {
    name: "nextjs",
    color: "#3a3b3c",
    icon: NextJsIcon,
  },

  {
    name: "typescript",
    color: "#91a7d5",
    icon: TypescriptIcon,
  },
  {
    name: "tailwind",
    color: "#a7d1f0",
    icon: TailwindcssIcon,
  },
  {
    name: "flutter",
    color: "#b2d7f5",
    icon: FlutterIcon,
  },
  {
    name: "firebase",
    color: "#f7e08b",
    icon: FirebaseIcon,
  },
  {
    name: "supabase",
    color: "#92d0a3",
    icon: SupabaseIcon,
  },
  {
    name: "mySQL",
    color: "#f7b955",
    icon: GrMysql,
  },
  {
    name: "vbnet",
    color: "#d3b3d7",
    icon: VisualbasicIcon,
  },
  {
    name: "mongodb",
    color: "#e7c2a3",
    icon: MongodbIcon,
  },
  {
    name: "dart",
    color: "#87ceeb",
    icon: FlutterIcon,
  },
  {
    name: "github",
    color: "#999",
    icon: GithubIcon,
  },
  {
    name: "figma",
    color: "#F2AA4C",
    icon: FigmaIcon,
  },
];
