import MainListSection from "./components/MainListSection";
import NavCard from "./components/NavCard";
import PostCard from "./components/PostCard";
import postsRequest from "./ExampleData/posts.json";
import newsRequest from "./ExampleData/news.json";
import latestCardsRequest from "./ExampleData/latestCards.json";
import Timer from "./components/Timer";
import Tournaments from "./models/Tournaments";
import dbConnect from "./utils/dbConnect";

const IMAGE_SERVER = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};
const news = (newsRequest as any[]).map((item) => {
  const date = new Date(1690899780111).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return {
    ...item,
    time: date,
  };
});
const latestCards = (latestCardsRequest as any[]).map((item) => {
  const date = new Date(1690899780111).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return {
    ...item,
    time: date,
  };
});
const posts = postsRequest.map((item: any) => item);
export default async () => {
  await dbConnect();
  const currentDate = new Date();
  const result = await Tournaments.find({ date: { $gt: currentDate } })
    .sort({ date: 1 })
    .lean();
  const tournaments = result.map((e: any) => {
    return {
      link: `https://${e.url}`,
      time: <Timer time={e.date} message="Tournament Started!" />,
      text: e.title,
      tag: e.tags[0],
    };
  });
  return (
    <>
      <div className="grid grid-flow-row xl:grid-flow-col grid-cols-4 gap-4 xl:gap-6 2xl:gap-12">
        <div className="col-span-4 p-4 xl:col-span-3">
          <div className="grid grid-cols-3">
            <div className="flex flex-col col-span-3 gap-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <NavCard title="Tier List" subText="Updated 2 hours ago" imgSrc={`/menu-icons/tier-list.png`} link="#" />
                <NavCard title="Articles" subText="Updated 2 hours ago" imgSrc={`/menu-icons/articles.png`} link="#" />
                <NavCard title="Database" subText="Updated 2 hours ago" imgSrc={`/menu-icons/database.png`} link="#" />
                <NavCard title="Tournaments/Events" subText="Updated 2 hours ago" imgSrc={`/menu-icons/tournaments.png`} link="#" />
                <NavCard title="Organize an Event" subText="Updated 2 hours ago" imgSrc={`/menu-icons/event-organize.png`} link="#" pc />
                <NavCard title="Meta Analysis" subText="Updated 2 hours ago" imgSrc={`/menu-icons/meta-analysis.png`} link="#" />
                <NavCard title="Extras" subText="Updated 2 hours ago" imgSrc={`/menu-icons/extras.png`} link="#" />
                <NavCard title="Settings" subText="Updated 2 hours ago" imgSrc={`/menu-icons/settings.png`} link="#" pc />
              </div>
              <div className="text-title text-responsive-1">Posts</div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div key={post.title}>
                    <PostCard title={post.title} time={post.time} imgSrc={post.imgSrc} link={post.link} tags={post.tags} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-span-4 p-4 xl:col-span-1">
          <div className="flex flex-col md:flex-row xl:flex-col gap-8">
            <MainListSection title="News" list={news} />
            <MainListSection title="Upcoming Tournaments" viewMoreLink="#" list={tournaments} />
            <MainListSection title="Latest Cards" viewMoreLink="#" list={latestCards} />
          </div>
        </div>
      </div>
    </>
  );
};
