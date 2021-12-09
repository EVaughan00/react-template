export type Colors = "primary" | "error" | "warning" | "default" | "strong";
export type Areas = "account";

const colors: Record<Colors, string> = {
    primary: "rgb(98, 0, 238)",
    error: "#f73313",
    warning: "#ffcb0f",
    default: "#aaa",
    strong: "#333"
}

const areaColors: Record<Areas, string> = {
    account: "#EB5A5A",
}

export default {
    colors,
    areaColors,
    unit: 8
}