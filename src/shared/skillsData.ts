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
  FaJava as JavaIcon,
  FaAngular as AngularIcon,
  FaNodeJs as NodeJsIcon,
  FaBootstrap as BootstrapIcon,
} from "react-icons/fa";
import {
  SiTailwindcss as TailwindcssIcon,
  SiTypescript as TypescriptIcon,
  SiFlutter as FlutterIcon,
  SiVisualbasic as VisualbasicIcon,
  SiSupabase as SupabaseIcon,
  SiMongodb as MongodbIcon,
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
    name: "react",
    color: "#72a9d5",
    icon: ReactIcon,
  },
  {
    name: "javascript",
    color: "#f2e8b0",
    icon: JavascriptIcon,
  },
  {
    name: "typescript",
    color: "#91a7d5",
    icon: TypescriptIcon,
  },
  {
    name: "java",
    color: "#b07219",
    icon: JavaIcon,
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
    name: "sql",
    color: "#f7b955",
    icon: GrMysql,
  },
  {
    name: "angular",
    color: "#d9a3a8",
    icon: AngularIcon,
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
    name: "bootstrap",
    color: "#b3a2d5",
    icon: BootstrapIcon,
  },
  {
    name: "dart",
    color: "#87ceeb",
    icon: FlutterIcon,
  },
  {
    name: "figma",
    color: "#F2AA4C",
    icon: FigmaIcon,
  },
  {
    name: "nodejs",
    color: "#339933",
    icon: NodeJsIcon,
  },
  {
    name: "github",
    color: "#999",
    icon: GithubIcon,
  },
];
