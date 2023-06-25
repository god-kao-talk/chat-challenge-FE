const useRandomImgColor = () => {
  const defaultImgColorList = ['#5865F2', '#43B581', '#FAA61A', '#EB459E', '#ED4245', '#000000'];

  const randomImgColor =
    defaultImgColorList[Math.floor(Math.random() * defaultImgColorList.length)];

  return randomImgColor;
};

export default useRandomImgColor;
