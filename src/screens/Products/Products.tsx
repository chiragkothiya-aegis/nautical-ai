import Header from "../Header";

interface IProducts {}

const Products: React.FC<IProducts> = (props: IProducts) => {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>Coming soon Products</div>
    </>
  );
};

export default Products;
