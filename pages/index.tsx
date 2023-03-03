import dynamic from "next/dynamic";
import Head from "next/head";
import Portfolio from "../client/components/portfolio/Portfolio";

const HomeHead = () => {
  return (
    <>
      <Head>
        <title>{"Denys Nykoriak's Portfolio"}</title>
        <meta
          name="description"
          content="I'am Denys, junior front-end developer who adores to create various complex logics, and who likes neatness in the code"
        />
      </Head>
    </>
  );
};

function Home() {
  return (
    <>
      <HomeHead />
      <Portfolio />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
  loading: HomeHead,
});
