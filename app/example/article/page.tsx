import MarkdownClient from "@/app/components/Markdown/Markdown";

export default function App() {
  return (
    <MarkdownClient
      text={`## Welcome to the content editor of this site!
{tabs:Duel Links,Master Duel}

This is an example of getting a user: {@user:502367750207832066}\\
This is an example of getting a card as inline text {@inline-card:13082}\\
Getting a skill is the same: {@skill:Storm Access}\\
You can insert a list of full cards like this:{@cards:15150,15164}\\
You can import full decks too, like this: {@deck:662c298a62c91a12a0761b60}
{tabs-split}
Now we are in another tab, let's try getting another card, this time the legendary {@inline-card:4007}.
{tabs-end}`}
    ></MarkdownClient>
  );
}
