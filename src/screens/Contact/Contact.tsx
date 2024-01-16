import Header from "../Header";

interface IContact {}

const Contact: React.FC<IContact> = (props: IContact) => {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>Coming soon Contact</div>
    </>
  );
};

export default Contact;
