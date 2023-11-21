import { PostHandler } from "@/components/PostHandler";

const Page = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Posts atuais:</h1>
      <PostHandler />
    </div>
  );
}

export default Page;