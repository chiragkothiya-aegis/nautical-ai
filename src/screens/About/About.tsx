import Header from "../Header";

interface IAbout {}

const About: React.FC<IAbout> = (props: IAbout) => {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>Coming soon About</div>
    </>
  );
};

export default About;
