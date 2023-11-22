import { SideMenu } from "@/components/SideMenu";
import { PostHandler } from "@/components/PostHandler";
import { ContainerS } from "@/components/ContainerS";

const Page = () => {
  return (
    <ContainerS>
      <SideMenu />
      <PostHandler />
    </ContainerS>
  );
}

export default Page;