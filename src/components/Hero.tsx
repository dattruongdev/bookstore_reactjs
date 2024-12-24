function Hero() {
  return (
    <div className="h-[300px] mt-10 overflow-hidden rounded-xl relative">
      <img src="reading-bg.png" className="object-cover h-full w-full" />
      <div className="absolute  inset-0 flex ">
        <div className="flex-[1] text-[50px] flex flex-col justify-center">
          <div className="pl-20 text-left">Welcome to</div>
          <div className="pl-20 text-left">Booktopia</div>
          <div className="pl-20 text-lg text-left ">
            A house to millions of digital and non-digital books from around the
            world
          </div>
        </div>
        <div className="flex-[1]"></div>
      </div>
    </div>
  );
}

export default Hero;
