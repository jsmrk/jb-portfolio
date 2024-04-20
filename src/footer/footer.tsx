import Logo from "/src/assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-black md:flex md:justify-between items-center py-5 px-11 text-center ">
      <img src={Logo} alt="logo" className="w-[150px] m-auto md:m-0" />
      <p className=" text-xs py-3  ">
        &#169; 2023{" "}
        <span className="text-primary-100 font-bold">Jess Baguio</span> All
        Rights Reserved, Inc.
      </p>
    </div>
  );
};

export default Footer;
