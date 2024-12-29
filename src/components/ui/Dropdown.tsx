/* eslint-disable @typescript-eslint/no-explicit-any */

const Dropdown = ({ children, styles, active }: any) => {
    return (
        <div
            className={`${styles} ${active ? "block" : "hidden"
                } w-[300px] h-[400px] px-5 py-7 bg-slate-200 bg-opacity-85 bg-backdrop-blur-lg border-primary shadow-xl drop-shadow-xl mt-4`}
        >
            {children}
        </div>
    );
}

export default Dropdown;

