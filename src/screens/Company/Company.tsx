import Header from "../Header";

interface ICompany {}

const Company: React.FC<ICompany> = (props: ICompany) => {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>Coming soon Company</div>
    </>
  );
};

export default Company;
