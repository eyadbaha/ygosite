import Navbar from "./components/Navbar";
import Sparks from "./components/Sparks";
import Footer from "./components/Footer";
import "./globals.css";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { ModalContextProvider } from "./context/modal";
import { Modal } from "./components/Modal";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});
const KafuTechnoStd = localFont({
  src: "./fonts/FOT-KafuTechnoStd-H.woff2",
  variable: "--font-KafuTechnoStd",
});
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const avatarProps = {
    avatar: "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
    link: "https://discord.com/api/oauth2/authorize?client_id=1156631683794219118&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify",
  };
  try {
    const token = cookies().get("ACCESS_TOKEN");
    const user = token && ACCESS_TOKEN_SECRET ? (jwt.verify(token.value, ACCESS_TOKEN_SECRET) as JwtPayload) : undefined;
    if (user?.id && user?.id) {
      avatarProps.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=1024`;
      avatarProps.link = "/api/auth/discord/logout";
    }
  } catch {}
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        {/* <script src="/lib/createjs.min.js" async />
        <script src="/lib/particlejs.min.js" async /> */}
      </head>
      <ModalContextProvider>
        <body className={`min-h-[100vh] ${roboto.variable} ${KafuTechnoStd.variable}`}>
          <div className="fixed inset-0 bg-gradient-to-b from-[#000305] via-[#000305] to-[#130316] z-0" />
          <Sparks />
          <div className="fixed inset-0 master-duel-screen-texture z-0" />
          <Navbar avatar={avatarProps} />
          <Modal />
          <div className="relative px-2 z-1 lg:px-8 py-16 lg:py-24 min-h-[calc(100vh-70px)] max-w-[1800px] mx-auto text-slate-200">
            <main>{children}</main>
          </div>
          <Footer />
        </body>
      </ModalContextProvider>
    </html>
  );
}
