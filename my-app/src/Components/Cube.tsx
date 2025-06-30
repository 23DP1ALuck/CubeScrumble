
type CubeProps = {
    color : string
}
const Cube = ({color} : CubeProps) => {
    const colors : Record<string, string> = {
        yellow: "bg-yellow-400",
        red: "bg-red-600",
        green: "bg-green-500",
        blue: "bg-blue-400",
        orange: "bg-orange-400",
        white: "bg-white",
    }
    const chosenColor : string = colors[color]
    return(
        <div className="grid grid-cols-3 max-w-max">
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    className={`w-fit px-2 ${chosenColor} flex items-center justify-center font-bold text-xl border border-black`}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
}
export default Cube