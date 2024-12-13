import Login from "../Pages/auth/Login";
import Dashboard from "../Pages/Dashboard";
import Upload from "../Pages/Upload";
import {
  Market,
  Match,
  Sports,
  Tournaments,
  Bookmaker,
  Fancy,
  ImportIndiaFancy,
  ImportRadheFancy,
  Line,
  OddEven,
} from "../Pages/Games";
import {
  OpenMarket,
  CancelMarket,
  CasinoMarket,
  SettledMarket,
} from "../Pages/Reports";
import { ManageUsers, ModuleAccess, Roles } from "../Pages/RoleManagement";
import {
  GameSettings,
  UserSettings,
  WhiteLabelSettings,
} from "../Pages/GlobalSettings";
import {
  ApiSettings,
  ChipsSettings,
  Import,
  ImportDream,
  LiveTv,
  MatchResult,
  Reactions,
  ReOpenCancelList,
  RulesSettings,
  WelcomeSettings,
} from "../Pages/configuration";
import PaymentGateway from "../Pages/PaymentGateway";

export const authRouter = [
  {
    path: "/",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/commentary/image-upload",
    component: Upload,
    exact: true,
  },
  {
    path: "/commentary/payment-gateway",
    component: PaymentGateway,
    exact: true,
  },
  {
    path: "/eventmaster/sports",
    component: Sports,
    exact: true,
  },
  {
    path: "/eventmaster/tournaments",
    component: Tournaments,
    exact: true,
  },
  {
    path: "/eventmaster/tournaments/:id",
    component: Tournaments,
    exact: true,
  },
  {
    path: "/eventmaster/matches",
    component: Match,
    exact: true,
  },
  {
    path: "/eventmaster/market",
    component: Market,
    exact: true,
  },
  {
    path: "/eventmaster/bookmaker",
    component: Bookmaker,
    exact: true,
  },
  {
    path: "/eventmaster/fancy",
    component: Fancy,
    exact: true,
  },
  {
    path: "/eventmaster/ImportIndiaFancy",
    component: ImportIndiaFancy,
    exact: true,
  },
  {
    path: "/eventmaster/ImportRadheFancy",
    component: ImportRadheFancy,
    exact: true,
  },
  {
    path: "/eventmaster/line",
    component: Line,
    exact: true,
  },
  {
    path: "/eventmaster/oddeven",
    component: OddEven,
    exact: true,
  },
  {
    path: "/reports/openmarket",
    component: OpenMarket,
    exact: true,
  },
  {
    path: "/reports/settledmarket",
    component: SettledMarket,
    exact: true,
  },
  {
    path: "/reports/cancelmarket",
    component: CancelMarket,
    exact: true,
  },
  {
    path: "/reports/casinomarket",
    component: CasinoMarket,
    exact: true,
  },
  {
    path: "/rolemanager/manageusers",
    component: ManageUsers,
    exact: true,
  },
  {
    path: "/rolemanager/roles",
    component: Roles,
    exact: true,
  },
  {
    path: "/rolemanager/moduleaccess",
    component: ModuleAccess,
    exact: true,
  },
  {
    path: "/globalsettings/gamesettings",
    component: GameSettings,
    exact: true,
  },
  {
    path: "/globalsettings/usersettings",
    component: UserSettings,
    exact: true,
  },
  {
    path: "/globalsettings/whitelabelsettings",
    component: WhiteLabelSettings,
    exact: true,
  },
  {
    path: "/config/reactions",
    component: Reactions,
    exact: true,
  },
  {
    path: "/config/reopencancellist",
    component: ReOpenCancelList,
    exact: true,
  },
  {
    path: "/config/matchresult",
    component: MatchResult,
    exact: true,
  },
  {
    path: "/config/livetv",
    component: LiveTv,
    exact: true,
  },
  {
    path: "/config/import",
    component: Import,
    exact: true,
  },
  {
    path: "/config/importdream",
    component: ImportDream,
    exact: true,
  },
  {
    path: "/config/apisettings",
    component: ApiSettings,
    exact: true,
  },
  {
    path: "/config/chipssettings",
    component: ChipsSettings,
    exact: true,
  },
  {
    path: "/config/rulessettings",
    component: RulesSettings,
    exact: true,
  },
  {
    path: "/config/welcomemsg",
    component: WelcomeSettings,
    exact: true,
  },
];

export const publicRouter = [
  {
    path: "/login",
    component: Login,
  },
];
