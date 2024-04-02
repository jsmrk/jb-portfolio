import Logo from "/src/assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-black md:flex justify-between items-center py-5 px-11">
      <img src={Logo} alt="logo" className="w-[150px]" />
      <p className=" text-xs">
        &#169; 2023{" "}
        <span className="text-primary-100 font-bold">Jess Baguio</span> All
        Rights Reserved, Inc.
      </p>
    </div>
  );
};

export default Footer;
