import { Audio, Circles, Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "32",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
      }}
    >
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="gray"
        secondaryColor="white"
      />
    </div>
  );
};

export default Loading;
