/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo } from "react";

const Dropdown = ({ children, styles, active }: any) => {
    return (
        <div
            className={`${styles} ${active ? "block" : "hidden"
                } w-[300px] h-[400px] px-5 py-7 bg-slate-200 bg-opacity-85 backdrop-blur-xl border-primary shadow-xl drop-shadow-xl mt-4`}
        >
            {children}
        </div>
    );
}

export default memo(Dropdown);

