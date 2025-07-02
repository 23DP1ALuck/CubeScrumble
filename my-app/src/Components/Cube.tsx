
type CubeProps = {
    colors : string[]
}
const Cube = ({colors} : CubeProps) => {
    const COLORS : Record<string, string> = {
        yellow: "bg-yellow-400",
        red: "bg-red-600",
        green: "bg-green-500",
        blue: "bg-blue-400",
        orange: "bg-orange-400",
        white: "bg-white",
    }
    return(
        <div className="grid grid-cols-3 max-w-max">
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    className={`w-fit px-2 ${COLORS[colors[i]]} flex items-center justify-center font-bold text-xl border border-black`}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
}
export default Cube